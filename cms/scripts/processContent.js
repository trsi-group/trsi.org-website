import 'dotenv/config'; // Load environment variables from .env
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { transformProductions } from './transformProductions.js';
import { transformMembers } from './transformMembers.js';
import { transformGraphics } from './transformGraphics.js';
import { transformMusic } from './transformMusic.js';
import { transformImages } from './transformImages.js';

// Resolve paths dynamically
const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonSource = resolve(__dirname, '../export/content.json');
const assetsSource = resolve(__dirname, '../export/images.ctfassets.net');
const jsonDest = resolve(__dirname, '../data');
const assetsDest = resolve(__dirname, '../images');

// CLI Execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const jsonData = JSON.parse(readFileSync(jsonSource, 'utf8'));

    // Copy assets to local image directory
    transformImages(jsonData, assetsDest, assetsSource);
    console.log(`Image assets written to ${assetsDest}`);

    // Ensure the target directory exists
    if (!existsSync(jsonDest)) {
      mkdirSync(jsonDest, { recursive: true });
    }

    // Transform productions content and write to file
    const productionsDest = resolve(jsonDest, 'productions.json');
    const productionsData = transformProductions(jsonData);
    writeFileSync(productionsDest, JSON.stringify(productionsData, null, 2));
    console.log(`Productions data written to productions.json`);

    // Transform members content and write to file
    const membersDest = resolve(jsonDest, 'members.json');
    const membersData = transformMembers(jsonData);
    writeFileSync(membersDest, JSON.stringify(membersData, null, 2));
    console.log(`Members data written to members.json`);

    // Transform graphics content and write to file
    const graphicsDest = resolve(jsonDest, 'graphics.json');
    const graphicsData = transformGraphics(jsonData);
    writeFileSync(graphicsDest, JSON.stringify(graphicsData, null, 2));
    console.log(`Graphics data written to graphics.json`);

    // Transform music content and write to file
    const musicDest = resolve(jsonDest, 'music.json');
    const musicData = transformMusic(jsonData);
    writeFileSync(musicDest, JSON.stringify(musicData, null, 2));
    console.log(`Music data written to music.json`);

  } catch (error) {
    console.error('Error processing data:', error);
    process.exit(1);
  }
}