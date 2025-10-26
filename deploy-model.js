const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function deployModel() {

    const pathToModelfile = path.join(__dirname, './Modelfile');

    if (!fs.existsSync(pathToModelfile)) {
        throw Error('Modelfile not found. Please build the model first.');
    }

    exec('ollama create Jarvis -f Modelfile', (error, stdout, stderr) => 
        {
        if (error) {
            console.error(`Error deploying model: ${error.message}`);
            return;
        }
        console.log(`Model deployed successfully: ${stdout}`);
    });
}

deployModel();