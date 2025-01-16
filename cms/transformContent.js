const fs = require('fs');
const path = require('path');
const { transformProductions } = require('./transformProductions');
const { transformMembers } = require('./transformMembers');

// Resolve paths dynamically
const contentJsonSource = path.resolve(__dirname, 'export/content.json');
const contentImageSource = path.resolve(__dirname, 'export/images.ctfassets.net');
const contentJsonDestination = path.resolve(__dirname, 'data/productions.json');
const contentDestination = path.resolve(__dirname, 'data');
const contentImageDestination = path.resolve(__dirname, 'images');

/**
 * Copies image assets from the Contentful export to the local image directory.
 * @param {Object} contentfulData - The raw JSON data exported from Contentful.
 */
function copyAssetsToLocal(contentfulData, exportDir, assetDir) {
  const { assets } = contentfulData;

  // Ensure the target directory exists
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  /**
   * Recursively searches for a file in a directory and its subdirectories.
   * @param {String} dir - The directory to search.
   * @param {String} fileName - The name of the file to find.
   * @returns {String|null} - The full path to the file if found, otherwise null.
   */
  function findFileRecursively(dir, fileName) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        const result = findFileRecursively(fullPath, fileName);
        if (result) return result;
      } else if (file.isFile() && file.name === fileName) {
        return fullPath;
      }
    }

    return null;
  }

  assets.forEach((asset) => {
    if (asset.fields.file && asset.fields.file['en-US']) {
      const fileName = asset.fields.file['en-US'].fileName;
      const sourcePath = findFileRecursively(assetDir, fileName); // Find file recursively
      const targetPath = path.join(exportDir, fileName); // Path in target folder

      if (sourcePath) {
        try {
          fs.copyFileSync(sourcePath, targetPath);
          // console.log(`Copied ${fileName} from ${sourcePath} to ${targetPath}`);
        } catch (err) {
          console.warn(`Failed to copy ${fileName} from ${sourcePath}:`, err.message);
        }
      } else {
        console.warn(`File ${fileName} not found in ${assetDir}`);
      }
    }
  });
}

// CLI Execution
if (require.main === module) {
  // const args = process.argv.slice(2);
  // if (args.length < 2) {
  //   console.error('Usage: node transformContentful.js <inputFile> <outputPath>');
  //   process.exit(1);
  // }

  try {
    const contentJsonData = JSON.parse(fs.readFileSync(contentJsonSource, 'utf8'));
    
    // Copy assets to local image directory
    copyAssetsToLocal(contentJsonData, contentImageDestination, contentImageSource);
    console.log(`Image assets written to ${contentImageDestination}`);

    // Ensure the target directory exists
    if (!fs.existsSync(contentDestination)) {
      fs.mkdirSync(contentDestination, { recursive: true });
    }

    // Transform productions content and write output file
    const productionsTarget = path.resolve(contentDestination, 'productions.json');
    const productionsData = transformProductions(contentJsonData);
    fs.writeFileSync(productionsTarget, JSON.stringify(productionsData, null, 2));
    console.log(`Productions data written to productions.json`);

    // Transform productions content and write output file
    const membersTarget = path.resolve(contentDestination, 'members.json');
    const membersData = transformMembers(contentJsonData);
    fs.writeFileSync(membersTarget, JSON.stringify(membersData, null, 2));
    console.log(`Members data written to members.json`);

  } catch (error) {
    console.error('Error processing data:', error);
    process.exit(1);
  }
}

// Export for module usage
module.exports = { copyAssetsToLocal };