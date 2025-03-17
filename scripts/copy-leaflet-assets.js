const fs = require('fs');
const path = require('path');

// Create the leaflet directory in public if it doesn't exist
const leafletDir = path.join(process.cwd(), 'public', 'leaflet');
if (!fs.existsSync(leafletDir)) {
  fs.mkdirSync(leafletDir, { recursive: true });
}

// Copy marker icons from node_modules to public
const files = [
  'marker-icon.png',
  'marker-icon-2x.png',
  'marker-shadow.png'
];

files.forEach(file => {
  const source = path.join(process.cwd(), 'node_modules', 'leaflet', 'dist', 'images', file);
  const dest = path.join(leafletDir, file);
  
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`Copied ${file} to public/leaflet/`);
  } else {
    console.error(`Source file ${file} not found in node_modules`);
  }
}); 