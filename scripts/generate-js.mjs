import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

// Set a custom base directory
const baseDir = path.resolve('./src/data/'); // Replace with your desired directory path

// Define paths for CSV files within the specified folder
const pagesFilePath = path.join(baseDir, 'output', 'pages.csv');
const sectionsFilePath = path.join(baseDir, 'output', 'sections.csv');
const insightsFilePath = path.join(baseDir, 'output', 'insights.csv');
const examplesFilePath = path.join(baseDir, 'output', 'examples.csv');
const linksFilePath = path.join(baseDir, 'output', 'links.csv');

// Define the output file path
const outputFilePath = path.join(baseDir, 'output', 'content-links.js');

// Utility function to read CSV files
const readCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
};

// Main function to generate the content-links.js file
const generateContentLinks = async () => {
    try {
        // Read all the CSV files
        const pages = await readCsv(pagesFilePath);
        const sections = await readCsv(sectionsFilePath);
        const insights = await readCsv(insightsFilePath);
        const examples = await readCsv(examplesFilePath);
        const links = await readCsv(linksFilePath);

        const dataStructure = {};

        // Rebuild the data structure
        pages.forEach(page => {
            // Check if pageName exists
            if (!page.pageName) {
                console.error(`Missing pageName for page with ID ${page.pageId}`);
                return;
            }

            const pageKey = page.pageName.trim(); // Ensure the key is clean
            dataStructure[pageKey] = []; // Initialize as an array of sections

            sections
                .filter(section => section.pageId === page.pageId)
                .forEach(section => {
                    const sectionObj = {
                        id: section.sectionId,
                        title: section.title,
                        content: []
                    };

                    insights
                        .filter(insight => insight.sectionId === section.sectionId)
                        .forEach(insight => {
                            const insightObj = {
                                id: insight.insightId,
                                title: insight.title,
                                body: insight.body,
                            };

                            // Conditionally add examples if they exist
                            const insightExamples = examples
                                .filter(example => example.insightId === insight.insightId)
                                .map(example => example.example);

                            if (insightExamples.length > 0) {
                                insightObj.examples = insightExamples;
                            }

                            // Conditionally add links if they exist
                            const insightLinks = links
                                .filter(link => link.insightId === insight.insightId)
                                .map(link => link.link);

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
