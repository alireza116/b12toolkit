import contentful from 'contentful-management';
import path from "path";
import dotenv from "dotenv";

const baseDir = path.resolve('./src/data/'); // Replace with your desired directory path

// Replace 'content-links.mjs' with the path to your actual generateCsvs file, relative to the baseDir
const dataFilePath = path.join(baseDir, 'content-links.mjs');

// Dynamically import all exported variables from the generateCsvs file
const data = await import(`file://${dataFilePath}`);

try {
    dotenv.config();
} catch (error) {
    console.log(error)
}

// Initialize the Contentful client
const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
});

async function createContentCard(environment, content) {
    const card = await environment.createEntry('contentCard', {
        fields: {
            title: {'en-US': content.title},
            body: {'en-US': content.body},
            examples: {'en-US': content.examples || []},
            links: {'en-US': content.links || []},
        },
    });
    console.log(`ContentCard created: ${card.sys.id}`);
    return card;
}

async function createSection(environment, section) {
    const contentCards = await Promise.all(
        section.content.map(content => createContentCard(environment, content))
    );

    const sectionEntry = await environment.createEntry('section', {
        fields: {
            title: {'en-US': section.title},
            content: {'en-US': contentCards.map(card => ({sys: {type: 'Link', linkType: 'Entry', id: card.sys.id}}))},
        },
    });
    console.log(`Section created: ${sectionEntry.sys.id}`);
    return sectionEntry;
}

async function createPage(environment, pageData, pageName) {
    const sections = await Promise.all(
        pageData.map(section => createSection(environment, section))
    );

    const pageEntry = await environment.createEntry('page', {
        fields: {
            title: {'en-US': pageName},
            sections: {
                'en-US': sections.map(section => ({
                    sys: {
                        type: 'Link',
                        linkType: 'Entry',
                        id: section.sys.id
                    }
                }))
            },
        },
    });
    console.log(`Page created: ${pageEntry.sys.id}`);
}

async function importData() {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');
    for (const [key, exportedData] of Object.entries(data)) {
        console.log(`Processing ${key}...`);
        await createPage(environment, data[key], key);
    }

    console.log(`data was loaded into contentful`);
}

// Export the importData function as the default export
importData().catch(console.error);