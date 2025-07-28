import fs from 'fs';
import path from 'path';

// Tạo thư mục dist nếu chưa có
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy các file cần thiết
const filesToCopy = [
  'index.html',
  'src',
  'public'
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    if (fs.lstatSync(file).isDirectory()) {
      // Copy thư mục
      copyDir(file, `dist/${file}`);
    } else {
      // Copy file
      fs.copyFileSync(file, `dist/${file}`);
    }
  }
});

// Copy package.json với start script
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts.start = 'npx serve -s . -l $PORT';
fs.writeFileSync('dist/package.json', JSON.stringify(packageJson, null, 2));

console.log('Build completed! Files copied to dist/');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
} 