require('dotenv').config(); // Load environment variables from .env

const { exec } = require('child_process');
const path = require('path');

// Assumes that '/scripts' is base path
const configPath = path.resolve(__dirname, 'config.json');
const exportDir = path.resolve(__dirname, 'export');

// Load tokens from environment variables
const DELIVERY_TOKEN = process.env.DELIVERY_TOKEN;
const MANAGEMENT_TOKEN = process.env.MANAGEMENT_TOKEN;

if (!DELIVERY_TOKEN || !MANAGEMENT_TOKEN) {
  console.error('Error: DELIVERY_TOKEN and MANAGEMENT_TOKEN must be set in the .env file.');
  process.exit(1);
}

const command = `contentful space export --config ${configPath} --export-dir ${exportDir} --management-token ${MANAGEMENT_TOKEN} --delivery-token ${DELIVERY_TOKEN} --use-verbose-renderer`;

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