const { exec } = require('child_process');
const path = require('path');

// Resolve paths dynamically
// Assumes that '/scripts' is base path
const contentJsonSource = path.resolve(__dirname, 'export/export.json');
const contentJsonDestination = path.resolve(__dirname, 'data/productions.json');
const imagesSource = path.resolve(__dirname, 'export/images.ctfassets.net/*');
const imagesDestination = path.resolve(__dirname, 'images/');

// Commands with resolved paths
const commands = [
  `cp ${contentJsonSource} ${contentJsonDestination}`,
  `cp ${imagesSource} ${imagesDestination}`
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