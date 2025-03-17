const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 144, 192, 512];
const sourceImage = path.join(__dirname, '../public/cslogo.jpg');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
sizes.forEach(size => {
  sharp(sourceImage)
    .resize(size, size)
    .png()
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    .then(() => console.log(`Generated ${size}x${size} icon`))
    .catch(err => console.error(`Error generating ${size}x${size} icon:`, err));
});

// Generate apple touch icon
sharp(sourceImage)
  .resize(180, 180)
  .png()
  .toFile(path.join(outputDir, 'apple-touch-icon.png'))
  .then(() => console.log('Generated apple touch icon'))
  .catch(err => console.error('Error generating apple touch icon:', err));

// Generate social media images
const socialImages = [
  { name: 'og-image', width: 1200, height: 630 },
  { name: 'twitter-image', width: 1200, height: 600 }
];

socialImages.forEach(({ name, width, height }) => {
  sharp(sourceImage)
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .png()
    .toFile(path.join(__dirname, '../public/images', `${name}.png`))
    .then(() => console.log(`Generated ${name}`))
    .catch(err => console.error(`Error generating ${name}:`, err));
}); 