import contentful from 'contentful-management';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Contentful client
const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
});

async function fetchContent(environment, contentType) {
    const entries = await environment.getEntries({content_type: contentType});
    return entries.items;
}

function formatContentCard(content) {
    const card = {
        title: content.fields.title['en-US'],
        body: content.fields.body['en-US'],
    };

    if (content.fields.examples && content.fields.examples['en-US'].length > 0) {
        card.examples = content.fields.examples['en-US'];
    }

    if (content.fields.links && content.fields.links['en-US'].length > 0) {
        card.links = content.fields.links['en-US'];
    }

    return card;
}

async function generateContentLinks() {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Fetch data from Contentful
    const pages = await fetchContent(environment, 'page');

    const contentLinks = {};

    for (const page of pages) {
        const pageTitle = page.fields.title['en-US'].replace(/\s+/g, '');
        const sections = [];

        for (const sectionRef of page.fields.sections['en-US']) {
            const section = await environment.getEntry(sectionRef.sys.id);
            const contentCards = [];

            for (const contentRef of section.fields.content['en-US']) {
                const content = await environment.getEntry(contentRef.sys.id);
                contentCards.push(formatContentCard(content));
            }

            sections.push({
                title: section.fields.title['en-US'],
                content: contentCards,
            });
        }

        contentLinks[pageTitle] = sections;
    }

    // Generate the content-links.js file
    const contentLinksPath = path.join('./src/data/', 'content-links.js');

    const contentLinksJs = Object.keys(contentLinks)
        .map(key => `export const ${key} = ${JSON.stringify(contentLinks[key], null, 2)};`)
        .join('\n\n');

    fs.writeFileSync(contentLinksPath, contentLinksJs);
    console.log(`Content written to ${contentLinksPath}`);
}

// Run the script
generateContentLinks().catch(console.error);
