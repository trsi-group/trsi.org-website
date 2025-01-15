const { exec } = require('child_process');
const path = require('path');

// Assumes that '/scripts' is base path
const configPath = path.resolve(__dirname, '../cms-content/config.json');
const exportDir = path.resolve(__dirname, '../cms-content/export');

const command = `contentful space export --config ${configPath} --export-dir ${exportDir}`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Contentful export: ${error.message}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`Contentful export stderr: ${stderr}`);
  }
  console.log(`Contentful export stdout:\n${stdout}`);
});