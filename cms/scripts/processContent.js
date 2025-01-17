require('dotenv').config(); // Load environment variables from .env

const fs = require('fs');
const path = require('path');

const { transformProductions } = require('./transformProductions');
const { transformMembers } = require('./transformMembers');
const { transformGraphics } = require('./transformGraphics');
const { transformImages } = require('./transformImages');

// Resolve paths dynamically
const jsonSource = path.resolve(__dirname, '../export/content.json');
const assetsSource = path.resolve(__dirname, '../export/images.ctfassets.net');
const jsonDest = path.resolve(__dirname, '../data');
const assetsDest = path.resolve(__dirname, '../images');

// CLI Execution
if (require.main === module) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonSource, 'utf8'));
    
    // Copy assets to local image directory
    transformImages(jsonData, assetsDest, assetsSource);
    console.log(`Image assets written to ${assetsDest}`);

    // Ensure the target directory exists
    if (!fs.existsSync(jsonDest)) {
      fs.mkdirSync(jsonDest, { recursive: true });
    }

    // Transform productions content and write to file
    const productionsDest = path.resolve(jsonDest, 'productions.json');
    const productionsData = transformProductions(jsonData);
    fs.writeFileSync(productionsDest, JSON.stringify(productionsData, null, 2));
    console.log(`Productions data written to productions.json`);

    // Transform members content and write to file
    const membersDest = path.resolve(jsonDest, 'members.json');
    const membersData = transformMembers(jsonData);
    fs.writeFileSync(membersDest, JSON.stringify(membersData, null, 2));
    console.log(`Members data written to members.json`);

    // Transform members content and write to file
    const graphicsDest = path.resolve(jsonDest, 'graphics.json');
    const graphicsData = transformGraphics(jsonData);
    fs.writeFileSync(graphicsDest, JSON.stringify(graphicsData, null, 2));
    console.log(`Graphics data written to graphics.json`);

  } catch (error) {
    console.error('Error processing data:', error);
    process.exit(1);
  }
}
