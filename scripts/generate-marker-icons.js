const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create the leaflet directory in public if it doesn't exist
const leafletDir = path.join(process.cwd(), 'public', 'leaflet');
if (!fs.existsSync(leafletDir)) {
  fs.mkdirSync(leafletDir, { recursive: true });
}

// Copy shadow image
const shadowSource = path.join(process.cwd(), 'node_modules', 'leaflet', 'dist', 'images', 'marker-shadow.png');
const shadowDest = path.join(leafletDir, 'marker-shadow.png');
fs.copyFileSync(shadowSource, shadowDest);

// Colors for markers
const colors = {
  blue: { r: 41, g: 98, b: 255 },   // External locations
  red: { r: 255, g: 59, b: 48 }     // Internal locations
};

// Source marker image
const markerSource = path.join(process.cwd(), 'node_modules', 'leaflet', 'dist', 'images', 'marker-icon.png');
const markerSource2x = path.join(process.cwd(), 'node_modules', 'leaflet', 'dist', 'images', 'marker-icon-2x.png');

// Generate colored markers
Object.entries(colors).forEach(([color, rgb]) => {
  // Regular size
  sharp(markerSource)
    .tint(rgb)
    .toFile(path.join(leafletDir, `marker-icon-${color}.png`))
    .then(() => console.log(`Generated ${color} marker icon`))
    .catch(console.error);

  // Retina size
  sharp(markerSource2x)
    .tint(rgb)
    .toFile(path.join(leafletDir, `marker-icon-2x-${color}.png`))
    .then(() => console.log(`Generated ${color} retina marker icon`))
    .catch(console.error);
}); 