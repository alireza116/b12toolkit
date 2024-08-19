import contentful from 'contentful';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Contentful client using the Content Delivery API
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
});

async function generateContentLinks() {
    // Fetch all pages along with their linked sections and content cards in one call
    const response = await client.getEntries({
        content_type: 'page',
        include: 3, // Adjust the level of depth if needed (3 levels deep)
    });

    const contentLinks = {};

    for (const page of response.items) {
        const pageTitle = page.fields.title.replace(/\s+/g, '');
        const sections = [];

        for (const sectionRef of page.fields.sections) {
            const section = response.includes.Entry.find(
                (entry) => entry.sys.id === sectionRef.sys.id
            );
            const contentCards = [];

            for (const contentRef of section.fields.content) {
                const content = response.includes.Entry.find(
                    (entry) => entry.sys.id === contentRef.sys.id
                );
                contentCards.push({
                    title: content.fields.title,
                    body: content.fields.body,
                    ...(content.fields.examples &&
                        content.fields.examples.length > 0 && {examples: content.fields.examples}),
                    ...(content.fields.links &&
                        content.fields.links.length > 0 && {links: content.fields.links}),
                });
            }

            sections.push({
                title: section.fields.title,
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
generateContentLinks()
