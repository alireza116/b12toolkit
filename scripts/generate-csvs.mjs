import fs from 'fs';
import path from 'path';
import {createObjectCsvWriter as csvWriter} from 'csv-writer';

// Set a custom base directory
const baseDir = path.resolve('./src/data/'); // Replace with your desired directory path

// Replace 'content-links.js' with the path to your actual generateCsvs file, relative to the baseDir
const dataFilePath = path.join(baseDir, 'content-links.js');

// Dynamically import all exported variables from the generateCsvs file
const generateCsvs = await import(`file://${dataFilePath}`);

// Specify your desired output folder path relative to the baseDir
const outputFolder = path.join(baseDir, 'output');

// Ensure the output directory exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, {recursive: true});
}

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Define paths for CSV files within the specified folder
const pagesFilePath = path.join(outputFolder, 'pages.csv');
const sectionsFilePath = path.join(outputFolder, 'sections.csv');
const insightsFilePath = path.join(outputFolder, 'insights.csv');
const examplesFilePath = path.join(outputFolder, 'examples.csv');
const linksFilePath = path.join(outputFolder, 'links.csv');

// Define CSV writers
const pagesWriter = csvWriter({
    path: pagesFilePath,
    header: [
        {id: 'pageId', title: 'pageId'},
        {id: 'pageName', title: 'pageName'}
    ]
});

const sectionsWriter = csvWriter({
    path: sectionsFilePath,
    header: [
        {id: 'sectionId', title: 'sectionId'},
        {id: 'pageId', title: 'pageId'},
        {id: 'title', title: 'title'}
    ]
});

const insightsWriter = csvWriter({
    path: insightsFilePath,
    header: [
        {id: 'insightId', title: 'insightId'},
        {id: 'sectionId', title: 'sectionId'},
        {id: 'title', title: 'title'},
        {id: 'body', title: 'body'}
    ]
});

const examplesWriter = csvWriter({
    path: examplesFilePath,
    header: [
        {id: 'exampleId', title: 'exampleId'},
        {id: 'insightId', title: 'insightId'},
        {id: 'example', title: 'example'}
    ]
});

const linksWriter = csvWriter({
    path: linksFilePath,
    header: [
        {id: 'linkId', title: 'linkId'},
        {id: 'insightId', title: 'insightId'},
        {id: 'link', title: 'link'}
    ]
});

// Function to process each exported variable
const processExportedData = async (exportedData, pageKey) => {
    const pagesData = [];
    const sectionsData = [];
    const insightsData = [];
    const examplesData = [];
    const linksData = [];

    const pageId = generateId();
    pagesData.push({
        pageId: pageId,
        pageName: pageKey
    });

    exportedData.forEach(section => {
        const sectionId = generateId();
        sectionsData.push({
            sectionId: sectionId,
            pageId: pageId,
            title: section.title
        });

        section.content.forEach(insight => {
            const insightId = generateId();
            insightsData.push({
                insightId: insightId,
                sectionId: sectionId,
                title: insight.title,
                body: insight.body
            });

            if (insight.examples) {
                insight.examples.forEach(example => {
                    examplesData.push({
                        exampleId: generateId(),
                        insightId: insightId,
                        example: example
                    });
                });
            }

            if (insight.links) {
                insight.links.forEach(link => {
                    linksData.push({
                        linkId: generateId(),
                        insightId: insightId,
                        link: link
                    });
                });
            }
        });
    });

    await Promise.all([
        pagesWriter.writeRecords(pagesData),
        sectionsWriter.writeRecords(sectionsData),
        insightsWriter.writeRecords(insightsData),
        examplesWriter.writeRecords(examplesData),
        linksWriter.writeRecords(linksData)
    ]);
};

// Loop through all exported variables in the generateCsvs file
(async () => {
    for (const [key, exportedData] of Object.entries(generateCsvs)) {
        console.log(`Processing ${key}...`);
        await processExportedData(exportedData, key);
    }

    console.log(`All CSV files have been created successfully in the folder: ${outputFolder}`);
})().catch(error => {
    console.error('Error processing generateCsvs:', error);
});
