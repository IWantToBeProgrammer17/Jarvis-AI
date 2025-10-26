const fs = require('fs');
const path = require('path');

function generateModelfileContent(knowledge) {
    return `
FROM gemma3:1b

SYSTEM """
You are a Q&A assistant for English, Math And Natural Science.
Always answer based on the provided knowledge base.
If the question is not related to the knowledge base, say "I cannot find the answer in the provided information."
Knowledge Base:
${knowledge}
"""

PARAMETER temperature 0.2
PARAMETER top_p 0.9
PARAMETER num_ctx 4096`
}

function buildModelfile() {
    try {
        console.log('Building modelfile ...');
        const pathToKnowledge = path.join(__dirname, './knowledge-base.txt');

        const knowledgeContent = fs.readFileSync(pathToKnowledge, 'utf-8');

        if (!knowledgeContent) {
            throw Error('Knowledge.txt is empty or not found.');
        }   

        console.log('Starting building modelfile ...');
        
        const modelfileContent = generateModelfileContent(knowledgeContent);
        

        const pathToModelfile = path.join(__dirname, './Modelfile');

        fs.writeFileSync(pathToModelfile, modelfileContent, {encoding:'utf-8'});
    } catch (error) {
        console.error('Error building modelfile', error.message);
        process.exit(1);
    }
};

buildModelfile();
