import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * Copies image assets from the Contentful export to the local image directory.
 * @param {Object} contentfulData - The raw JSON data exported from Contentful.
 */
export function transformImages(contentfulData, exportDir, assetDir) {
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

  // Resize for Card display
  assets.forEach((asset) => {
    if (asset.fields.file && asset.fields.file['en-US']) {
      const fileName = asset.fields.file['en-US'].fileName;
      const sourcePath = findFileRecursively(assetDir, fileName); // Find file recursively
      if (!sourcePath) {
        console.log('Source images not available!');
        console.log(`asset dir: ${assetDir}, filename: ${fileName}`);
        return null;
      }

      // Transform originial file to WebP
      const targetOrigDir = path.join(exportDir, 'orig'); // Path in target folder
      if (!fs.existsSync(targetOrigDir)) {
        fs.mkdirSync(targetOrigDir, { recursive: true });
      }

      const origFilename = fileName.replace(/\.[^/.]+$/, ".webp");
      const targetOrigPath = path.join(exportDir, 'orig', origFilename); // Path in target folder
      sharp(sourcePath)
      .webp()
      .toFile(targetOrigPath)
      .catch(err => { 
        console.log(`Error transforming ${sourcePath}}:`, err.message);
      });
      
      // Resize for Card display
      const targetCardDir = path.join(exportDir, 'card'); // Path in target folder
      if (!fs.existsSync(targetCardDir)) {
        fs.mkdirSync(targetCardDir, { recursive: true });
      }

      const cardFilename = fileName.replace(/\.[^/.]+$/, ".webp");
      const targetCardPath = path.join(exportDir, 'card', cardFilename); // Path in target folder
      sharp(sourcePath)
        .resize(300)
        .webp()
        .toFile(targetCardPath)
        .catch(err => { 
          console.log(`Error transforming ${sourcePath}}:`, err.message);
        });

      // Resize for Thumb display
      const targetThumbDir = path.join(exportDir, 'thumb'); // Path in target folder
      if (!fs.existsSync(targetThumbDir)) {
        fs.mkdirSync(targetThumbDir, { recursive: true });
      }

      const thumbFilename = fileName.replace(/\.[^/.]+$/, ".webp");
      const targetThumbPath = path.join(exportDir, 'thumb', thumbFilename); // Path in target folder
      sharp(sourcePath)
        .resize(50)
        .webp()
        .toFile(targetThumbPath)
        .catch(err => { 
          console.log(`Error transforming ${sourcePath}}:`, err.message);
        });
    }

  });
}

// Export for module usage
export const name = 'transformImages';