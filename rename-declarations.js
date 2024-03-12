//CALL ME NOOB IN WEBPACK

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');

fs.readdirSync(distDir).forEach(file => {
  if (file.endsWith('.d.ts')) {
    const filePath = path.join(distDir, file);
    const newFileName = file.replace('index.d.ts', 'is-business-mail.d.ts');
    fs.renameSync(filePath, path.join(distDir, newFileName));
  }
});
