const xlsx = require('xlsx');
const path = require('path');
const imagesDir = path.join(__dirname, 'public/images');
const fs = require('fs');

let keys = new Set();
const countries = fs.readdirSync(imagesDir).filter(f => fs.statSync(path.join(imagesDir, f)).isDirectory());

for (const country of countries) {
  const countryPath = path.join(imagesDir, country);
  const schoolDirs = fs.readdirSync(countryPath).filter(f => fs.statSync(path.join(countryPath, f)).isDirectory());

  for (const schoolName of schoolDirs) {
    const schoolPath = path.join(countryPath, schoolName);
    const files = fs.readdirSync(schoolPath);
    const excelFile = files.find(f => f.endsWith('.xlsx'));
    if (excelFile) {
        const wb = xlsx.readFile(path.join(schoolPath, excelFile));
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet)[0];
        if (data) {
           Object.keys(data).forEach(k => {
               keys.add(k);
           });
        }
    }
  }
}
console.log(Array.from(keys).join('\n'));
