const contentful = require('contentful');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

try {
    dotenv.config();
} catch (error) {
    console.log(error)
}
// dotenv.config();

// Initialize the Contentful Delivery client
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN,
});

function getFieldValue(field, locale = 'en-US') {
    // Check if the field is localized
    return field && (field[locale] || field);
}

async function generateContentLinks() {
    // Fetch all entries of type 'page'
    const entries = await client.getEntries({
        content_type: 'page',
        include: 3, // Adjust the level of depth if needed (3 levels deep)
    });

    const contentLinks = {};

    for (const page of entries.items) {
        const pageTitle = getFieldValue(page.fields.title)
            ? getFieldValue(page.fields.title).replace(/\s+/g, '')
            : `UntitledPage_${page.sys.id}`;

        const sections = [];

        const pageSections = getFieldValue(page.fields.sections);
        if (pageSections && Array.isArray(pageSections)) {
            for (const sectionRef of pageSections) {
                // Fetch the section entry explicitly
                const section = await client.getEntry(sectionRef.sys.id);
                const contentCards = [];

                const sectionContent = getFieldValue(section.fields.content);
                if (sectionContent && Array.isArray(sectionContent)) {
                    for (const contentRef of sectionContent) {
                        // Fetch the content entry explicitly
                        const content = await client.getEntry(contentRef.sys.id);
                        contentCards.push({
                            title: getFieldValue(content.fields.title),
                            body: getFieldValue(content.fields.body),
                            ...(getFieldValue(content.fields.examples) &&
                                getFieldValue(content.fields.examples).length > 0 && {examples: getFieldValue(content.fields.examples)}),
                            ...(getFieldValue(content.fields.links) &&
                                getFieldValue(content.fields.links).length > 0 && {links: getFieldValue(content.fields.links)}),
                        });
                    }
                }

                sections.push({
                    title: getFieldValue(section.fields.title),
                    content: contentCards,
                });
            }
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

