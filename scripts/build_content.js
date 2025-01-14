const { exec } = require('child_process');

// Define the commands to execute
const commands = [
  'contentful space export --config ./cms-content/config.json --export-dir ./cms-content/export/',
  'node cms-content/transform-content.js cms-content/export/export.json ./cms-content/export/',
  'cp cms-content/export/content.json ./data/productions.json',
  'cp cms-content/export/images/* ./images/productions/'
];

/**
 * Execute a shell command and return a promise.
 * @param {string} cmd - The shell command to execute.
 * @returns {Promise<void>}
 */
function executeCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { shell: true }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${cmd}`);
        console.error(stderr);
        return reject(error);
      }
      console.log(`Command: ${cmd}`);
      console.log(stdout);
      resolve();
    });
  });
}

/**
 * Run all commands in sequence.
 */
async function runCommands() {
  try {
    for (const cmd of commands) {
      await executeCommand(cmd);
    }
    console.log('All commands executed successfully.');
  } catch (error) {
    console.error('Error during command execution:', error);
  }
}

// Execute the commands
runCommands();