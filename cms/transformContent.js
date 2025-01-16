const fs = require('fs');
const path = require('path');
const { transformProductions } = require('./transformProductions');
const { transformMembers } = require('./transformMembers');

// Resolve paths dynamically
// Assumes that '/scripts' is base path
const contentJsonSource = path.resolve(__dirname, 'export/content.json');
const contentImageSource = path.resolve(__dirname, 'export/images.ctfassets.net');
const contentJsonDestination = path.resolve(__dirname, 'data/productions.json');
const contentDestination = path.resolve(__dirname, 'data');
const contentImageDestination = path.resolve(__dirname, 'images');

/**
 * Transforms Contentful JSON export to the target simplified format.
 * @param {Object} contentfulData - The raw JSON data exported from Contentful.
 * @returns {Object} The transformed JSON.
 */
function transformContentful(contentfulData) {
  const { entries, assets } = contentfulData;

  // Helper to find asset by ID and resolve the local path
  const findAssetPathById = (assetId) => {
    const asset = assets.find((a) => a.sys.id === assetId);
    if (asset && asset.fields.file && asset.fields.file['en-US']) {
      const fileName = asset.fields.file['en-US'].fileName;
      return path.join(IMAGE_DIR, fileName);
    }
    return null;
  };

  const productions = entries
    .filter((entry) => entry.sys.contentType.sys.id === 'productions')
    .map((entry) => {
      const fields = entry.fields;
      const imageId = fields.image?.['en-US']?.sys.id;

      // Extract credits from the new structure
      const credits = fields.credits?.['en-US']?.map((credit) => ({
        name: credit.name,
        contribution: credit.contribution,
      })) || [];

      return {
        title: fields.title['en-US'],
        type: fields.type['en-US'],
        description: fields.description ? fields.description?.['en-US']?.content?.[0]?.content?.[0]?.value : '',
        release_date: fields.releaseDate ? fields.releaseDate['en-US'] : '',
        image: imageId ? path.resolve('/cms/images/', findAssetPathById(imageId)) : null,
        platform: fields.platform ? fields.platform['en-US'] : '',
        youtube_url: fields.youTubeUrl ? fields.youTubeUrl['en-US'] : null,
        pouet_url: fields.pouetUrl ? fields.pouetUrl['en-US'] : null,
        demozoo_url: fields.demozooUrl ? fields.demozooUrl['en-US'] : null,
        credits: credits,
      };
    });

  return { productions };
}

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