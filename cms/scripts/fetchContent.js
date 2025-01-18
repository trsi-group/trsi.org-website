import 'dotenv/config'; // Load environment variables from .env
import { exec } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Assumes that '/scripts' is the base path
const configPath = resolve(__dirname, '../config.json');
const exportDir = resolve(__dirname, '../export');

// Load tokens from environment variables
const { DELIVERY_TOKEN, MANAGEMENT_TOKEN } = process.env;

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