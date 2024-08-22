import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('./src/data/'); // Replace with your desired directory path

// Replace 'content-links.mjs' with the path to your actual generateCsvs file, relative to the baseDir
const dataFilePath = path.join(baseDir, 'content-links.mjs');

const pageData = await import(`file://${dataFilePath}`);

const pageOrder = ["foundations", "aiRisks", "studentCoach", "ongoing", "onboarding"]
const pageTitleMap = {
    "foundations": "Foundations",
    "aiRisks": "AI Risks",
    "studentCoach": "Student Coach Interactions",
    "ongoing": "Interactions",
    "onboarding": "Reassessment"
}

function formatSection(title, content) {
    let markdown = `# ${title}\n\n`;

    content.forEach(section => {
        markdown += `## ${section.title}\n\n`;
        section.content.forEach(subsection => {
            markdown += `### ${subsection.title}\n\n`;
            markdown += `### Why?\n\n${subsection.body}\n\n`;

            if (subsection.examples && subsection.examples.length > 0) {
                markdown += `#### Examples:\n\n`;
                subsection.examples.forEach(example => {
                    markdown += `- ${example}\n`;
                });
                markdown += `\n`;
            }

            if (subsection.links && subsection.links.length > 0) {
                markdown += `#### Learn More:\n\n`;
                subsection.links.forEach(link => {
                    markdown += `- [${link}](${link})\n`;
                });
                markdown += `\n`;
            }
            markdown += `---\n\n`;
        });
    });
    markdown += `---\n\n`;

    return markdown;
}

function generateMarkdown() {
    let markdownContent = '';
    pageOrder.forEach((key) => {
        let pageSections = pageData[key];
        markdownContent += formatSection(pageTitleMap[key], pageSections);
    });

    return markdownContent;
}

function saveMarkdownFile(filename, content) {
    const filePath = path.join(baseDir, filename);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`File ${filename} has been saved at ${filePath}!`);
}

// Generate and save the markdown file
const markdownContent = generateMarkdown();
saveMarkdownFile('ai_coaching_markdown.md', markdownContent);
