const fs = require('fs');
const path = require('path');

// Define the directory where images are stored in the exported Contentful assets
const ASSET_SOURCE_DIR = path.resolve(__dirname, '../cms-content/images.ctfassets.net');
// Define the directory where images should be copied to
const IMAGE_DIR = '';

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
      const credits = fields.credits?.['en-US']?.credits?.map((credit) => ({
        name: credit.name,
        contribution: credit.credit,
      })) || [];

      return {
        title: fields.title['en-US'],
        type: fields.type['en-US'],
        description: fields.description ? fields.description['en-US'] : '',
        release_date: fields.releaseDate ? fields.releaseDate['en-US'] : '',
        image: imageId ? findAssetPathById(imageId) : null,
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
function copyAssetsToLocal(contentfulData, exportDir) {
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
      const sourcePath = findFileRecursively(ASSET_SOURCE_DIR, fileName); // Find file recursively
      const targetPath = path.join(exportDir, fileName); // Path in target folder

      if (sourcePath) {
        try {
          fs.copyFileSync(sourcePath, targetPath);
          // console.log(`Copied ${fileName} from ${sourcePath} to ${targetPath}`);
        } catch (err) {
          console.warn(`Failed to copy ${fileName} from ${sourcePath}:`, err.message);
        }
      } else {
        console.warn(`File ${fileName} not found in ${ASSET_SOURCE_DIR}`);
      }
    }
  });
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node transformContentful.js <inputFile> <outputPath>');
    process.exit(1);
  }

  const [inputFile, outputPath] = args;
  const outputFile = outputPath + 'export.json';

  try {
    const inputData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const imageOutputPath = outputPath + 'images';

    // Copy assets to local image directory
    copyAssetsToLocal(inputData, imageOutputPath);

    // Transform content and write output file
    const transformedData = transformContentful(inputData);
    fs.writeFileSync(outputFile, JSON.stringify(transformedData, null, 2));
    console.log(`Transformed data written to ${outputFile}`);
  } catch (error) {
    console.error('Error processing data:', error);
    process.exit(1);
  }
}

// Export for module usage
module.exports = { transformContentful, copyAssetsToLocal };