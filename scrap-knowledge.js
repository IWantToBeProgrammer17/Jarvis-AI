const fs = require('fs');
const path = require('path');

const scrapKnowledge = () => {
  const knowledgeDir = path.join(__dirname, 'knowledge');

  const isDirExist = fs.existsSync(knowledgeDir);

  if (!isDirExist) {
    console.error('Knowledge directory does not exist.');
    return;
  }

  console.log('Scraping knowledge from directory:', knowledgeDir);

  // read all files in knowledge directory
  const files = fs.readdirSync(knowledgeDir);

  console.log('Found files:', files);

  let knowledgeString = '';

  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(knowledgeDir, files[i])
    const content = fs.readFileSync(filePath, 'utf-8');

    if (content.length <= 400) {
        throw new Error(`File ${files[i]} is too short for knowledge lesson.`);
    }

    knowledgeString += `File: ${files[i]}\nContent: ${content}\n\n`;

    if(i < files.length - 1) {
        knowledgeString += '----------------------------\n';
    }
  }

  const outputPath = path.join(__dirname, 'knowledge-base.txt');

  fs.writeFileSync(outputPath, knowledgeString, 'utf-8');  

};

scrapKnowledge();