const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('framer-motion')) {
    content = content.replace(/import\s+\{([^}]*)motion([^}]*)\}\s+from\s+['"]framer-motion['"]/, 'import {$1m$2} from \"framer-motion\"');
    content = content.replace(/<motion\./g, '<m.');
    content = content.replace(/<\/motion\./g, '</m.');
    content = content.replace(/\bmotion\(/g, 'm(');
    content = content.replace(/\bmotion,/g, 'm,');
    content = content.replace(/motion\.div/g, 'm.div');
    content = content.replace(/motion\.span/g, 'm.span');
    content = content.replace(/motion\.p/g, 'm.p');
    content = content.replace(/motion\.h/g, 'm.h');
    fs.writeFileSync(filePath, content);
  }
});
console.log('Done');
