import fs from 'fs';
import path from 'path';

const appDir = path.join(process.cwd(), 'app');

function findMetadataFiles(dir: string): string[] {
  const files: string[] = [];
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findMetadataFiles(fullPath));
    } else if (item === 'metadata.ts') {
      files.push(fullPath);
    }
  }
  
  return files;
}

function fixMetadataFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if themeColor exists in metadata
  if (content.includes('themeColor') && content.includes('export const metadata')) {
    // Remove themeColor from metadata
    content = content.replace(/themeColor:\s*\[[\s\S]*?\],\s*/, '');
    
    // Ensure viewport export exists with themeColor
    if (!content.includes('export const viewport')) {
      content += `\n\nexport const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
  width: 'device-width',
  initialScale: 1,
};\n`;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed ${filePath}`);
  }
}

// Find and fix all metadata files
const metadataFiles = findMetadataFiles(appDir);
metadataFiles.forEach(fixMetadataFile);

console.log('Metadata fix complete!'); 