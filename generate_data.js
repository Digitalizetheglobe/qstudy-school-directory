const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const imagesDir = path.join(__dirname, 'public/images');
const countries = fs.readdirSync(imagesDir).filter(f => fs.statSync(path.join(imagesDir, f)).isDirectory());

const schools = [];

for (const country of countries) {
  const countryPath = path.join(imagesDir, country);
  const schoolDirs = fs.readdirSync(countryPath).filter(f => fs.statSync(path.join(countryPath, f)).isDirectory());

  for (const schoolName of schoolDirs) {
    const schoolPath = path.join(countryPath, schoolName);
    
    // find excel file
    const files = fs.readdirSync(schoolPath);
    const excelFile = files.find(f => f.endsWith('.xlsx'));
    
    let type = 'Boarding School';
    let location = country;
    let name = schoolName;
    let fees = 'Contact for fees';
    
    if (excelFile) {
      try {
        const wb = xlsx.readFile(path.join(schoolPath, excelFile));
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet)[0];
        if (data) {
          if (data['School / Institution Name:']) name = data['School / Institution Name:'];
          if (data['City/Town:'] && data['Country:']) location = `${data['City/Town:']}, ${data['Country:']}`;
          else if (data['Country:']) location = data['Country:'];
          if (data['Type of School / Institution (Select all that apply)']) type = data['Type of School / Institution (Select all that apply)'].split(',')[0];
          else if (data['Type of School / Institution (Select all that apply):']) type = data['Type of School / Institution (Select all that apply):'].split(',')[0];
        }
      } catch(e) {}
    }

    // find logo
    let logoPath = null;
    const allFiles = (dir) => {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
          results = results.concat(allFiles(file));
        } else { 
          results.push(file);
        }
      });
      return results;
    }

    const all = allFiles(schoolPath);
    const imageFiles = all.filter(f => (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')) && !f.includes('Logo') && !f.includes('logo'));
    const logoFiles = all.filter(f => f.toLowerCase().includes('logo') && (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')));
    
    if (logoFiles.length > 0) {
      logoPath = logoFiles[0].replace(path.join(__dirname, 'public'), '').replace(/\\/g, '/');
    }
    
    const gallery = imageFiles.map(f => f.replace(path.join(__dirname, 'public'), '').replace(/\\/g, '/'));

    schools.push({
      name,
      location,
      type,
      stream: 'General',
      fees,
      highlights: ['Premium Campus', 'Global Community', 'Excellent Facilities'],
      image: logoPath,
      gallery,
      emoji: '🏫'
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'app/data', 'schoolsData.json'), JSON.stringify(schools, null, 2));
console.log('Saved to app/data/schoolsData.json');
