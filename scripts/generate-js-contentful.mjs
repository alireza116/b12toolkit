import contentful from 'contentful-management';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Contentful Management client
const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
});

async function generateContentLinks() {
    // Fetch the space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Fetch all pages
    const entries = await environment.getEntries({
        content_type: 'page',
        include: 3, // Adjust the level of depth if needed (3 levels deep)
    });

    const contentLinks = {};

    for (const page of entries.items) {
        const pageTitle = page.fields.title['en-US'].replace(/\s+/g, '');
        const sections = [];

        for (const sectionRef of page.fields.sections['en-US']) {
            // Fetch the section entry explicitly
            const section = await environment.getEntry(sectionRef.sys.id);
            const contentCards = [];

            for (const contentRef of section.fields.content['en-US']) {
                // Fetch the content entry explicitly
                const content = await environment.getEntry(contentRef.sys.id);
                contentCards.push({
                    title: content.fields.title['en-US'],
                    body: content.fields.body['en-US'],
                    ...(content.fields.examples &&
                        content.fields.examples['en-US'].length > 0 && {examples: content.fields.examples['en-US']}),
                    ...(content.fields.links &&
                        content.fields.links['en-US'].length > 0 && {links: content.fields.links['en-US']}),
                });
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
        .map(
            (key) =>
                `export const ${key} = ${JSON.stringify(contentLinks[key], null, 2)};`
        )
        .join('\n\n');

    fs.writeFileSync(contentLinksPath, contentLinksJs);
    console.log(`Content written to ${contentLinksPath}`);
}

// Run the script
generateContentLinks().catch(console.error);
