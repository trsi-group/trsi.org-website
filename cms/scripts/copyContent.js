import { exec } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Resolve paths dynamically
// Assumes that '/scripts' is base path
const __dirname = dirname(fileURLToPath(import.meta.url));
const contentJsonSource = resolve(__dirname, '../data');
const contentJsonDestination = resolve(__dirname, '../../dist/');
const imagesSource = resolve(__dirname, '../images');
const imagesDestination = resolve(__dirname, '../../dist/');

// Commands with resolved paths
const commands = [
  `cp -r ${contentJsonSource} ${contentJsonDestination}`,
  `cp -r ${imagesSource} ${imagesDestination}`
];

function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(error.message);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Command stderr: ${stderr}`);
      }
      console.log(`Command stdout:\n${stdout}`);
      resolve();
    });
  });
}

(async function build() {
  try {
    for (const command of commands) {
      console.log(`Executing: ${command}`);
      await runCommand(command);
    }
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
})();