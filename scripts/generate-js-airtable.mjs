import Airtable from 'airtable';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

console.log("getting data from airtable")
// Load environment variables from .env file
try {
    dotenv.config();
} catch (error) {
    console.log(error)
}


// Airtable configuration using environment variables
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = new Airtable({apiKey}).base(baseId);

// Define table names
const pagesTable = 'Pages';
const sectionsTable = 'Sections';
const insightsTable = 'Insights';
const examplesTable = 'Examples';
const linksTable = 'Links';

// Define the output file path
const baseDir = path.resolve('./src/data/');
const outputFilePath = path.join(baseDir, 'content-links.js');

// Utility function to fetch all records from a table, preserving order
const fetchRecords = async (table) => {
    const records = [];
    await base(table).select({
        view: "Grid view" // Use the default view or specify a custom view to maintain order
    }).eachPage((recordsPage, fetchNextPage) => {
        records.push(...recordsPage);
        fetchNextPage();
    });
    return records;
};

// Main function to fetch data and construct the JavaScript file
const generateContentLinks = async () => {
    try {
        // Fetch records from Airtable
        const pages = await fetchRecords(pagesTable);
        const sections = await fetchRecords(sectionsTable);
        const insights = await fetchRecords(insightsTable);
        const examples = await fetchRecords(examplesTable);
        const links = await fetchRecords(linksTable);

        const dataStructure = {};

        // Rebuild the data structure
        pages.forEach(page => {
            const pageKey = page.fields.pageName?.trim(); // Ensure the key is clean and exists
            if (!pageKey) {
                console.error(`Page with ID ${page.id} is missing a pageName.`);
                return;
            }
            dataStructure[pageKey] = []; // Initialize as an array of sections

            sections
                .filter(section => section.fields.pageId?.[0] === page.id)
                .forEach(section => {
                    const sectionObj = {
                        id: section.id,
                        title: section.fields.title,
                        content: []
                    };

                    insights
                        .filter(insight => insight.fields.sectionId?.[0] === section.id)
                        .forEach(insight => {
                            const insightObj = {
                                id: insight.id,
                                title: insight.fields.title,
                                body: insight.fields.body,
                            };

                            // Conditionally add examples if they exist
                            const insightExamples = examples
                                .filter(example => example.fields.insightId?.[0] === insight.id)
                                .map(example => example.fields.example);

                            if (insightExamples.length > 0) {
                                insightObj.examples = insightExamples;
                            }

                            // Conditionally add links if they exist
                            const insightLinks = links
                                .filter(link => link.fields.insightId?.[0] === insight.id)
                                .map(link => link.fields.link);

                            if (insightLinks.length > 0) {
                                insightObj.links = insightLinks;
                            }

                            sectionObj.content.push(insightObj);
                        });

                    dataStructure[pageKey].push(sectionObj);
                });
        });

        // Convert the data structure to a JavaScript file
        const jsContent = Object.keys(dataStructure).map(pageKey => {
            return `export const ${pageKey} = ${JSON.stringify(dataStructure[pageKey], null, 4)};`;
        }).join('\n\n');

        // Write the content to the content-links.js file
        fs.writeFileSync(outputFilePath, jsContent, 'utf-8');
        console.log(`File ${outputFilePath} has been created successfully.`);
    } catch (error) {
        console.error('Error generating content-links.js:', error);
    }
};

// Run the main function
generateContentLinks();
