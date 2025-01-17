const fs = require('fs');
const path = require('path');
const { transformProductions } = require('./transformProductions');
const { transformMembers } = require('./transformMembers');
const { transformGraphics } = require('./transformGraphics');
const { transformImages } = require('./transformImages');

// Resolve paths dynamically
const contentJsonSource = path.resolve(__dirname, 'export/content.json');
const contentImageSource = path.resolve(__dirname, 'export/images.ctfassets.net');
const contentDestination = path.resolve(__dirname, 'data');
const contentImageDestination = path.resolve(__dirname, 'images');

// CLI Execution
if (require.main === module) {
  try {
    const contentJsonData = JSON.parse(fs.readFileSync(contentJsonSource, 'utf8'));
    
    // Copy assets to local image directory
    transformImages(contentJsonData, contentImageDestination, contentImageSource);
    console.log(`Image assets written to ${contentImageDestination}`);

    // Ensure the target directory exists
    if (!fs.existsSync(contentDestination)) {
      fs.mkdirSync(contentDestination, { recursive: true });
    }

    // Transform productions content and write to file
    const productionsTarget = path.resolve(contentDestination, 'productions.json');
    const productionsData = transformProductions(contentJsonData);
    fs.writeFileSync(productionsTarget, JSON.stringify(productionsData, null, 2));
    console.log(`Productions data written to productions.json`);

    // Transform members content and write to file
    const membersTarget = path.resolve(contentDestination, 'members.json');
    const membersData = transformMembers(contentJsonData);
    fs.writeFileSync(membersTarget, JSON.stringify(membersData, null, 2));
    console.log(`Members data written to members.json`);

    // Transform members content and write to file
    const graphicsTarget = path.resolve(contentDestination, 'graphics.json');
    const graphicsData = transformGraphics(contentJsonData);
    fs.writeFileSync(graphicsTarget, JSON.stringify(graphicsData, null, 2));
    console.log(`Graphics data written to graphics.json`);

  } catch (error) {
    console.error('Error processing data:', error);
    process.exit(1);
  }
}
