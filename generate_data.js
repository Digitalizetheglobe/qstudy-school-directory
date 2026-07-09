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
    let detailedFields = {};
    
    if (excelFile) {
      try {
        const wb = xlsx.readFile(path.join(schoolPath, excelFile));
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet)[0];
        if (data) {
          const getVal = (searchStr) => {
            const key = Object.keys(data).find(k => k.toLowerCase().replace(/\s+/g, ' ').includes(searchStr.toLowerCase()));
            return key ? data[key] : undefined;
          };

          if (getVal('School / Institution Name')) name = getVal('School / Institution Name');
          if (getVal('City/Town') && getVal('Country:')) location = `${getVal('City/Town')}, ${getVal('Country:')}`;
          else if (getVal('Country:')) location = getVal('Country:');
          
          if (getVal('Type of School / Institution')) {
             const t = getVal('Type of School / Institution');
             type = typeof t === 'string' ? t.split(',')[0] : t;
          }

          detailedFields = {
            establishmentSince: getVal('Establishment since'),
            campusDescription: getVal('School / Institution Campus'),
            totalCampuses: getVal('Total Number of Campuses'),
            fullAddress: getVal('School Address / Location'),
            schoolType: getVal('Type of Schools'),
            levelsServed: getVal('Levels Served'),
            operationalModel: getVal('Operational Model'),
            curriculum: getVal('Curriculum / Programme Offered'),
            languageOfInstruction: getVal('Language of Instruction'),
            otherLanguages: getVal('Other language of instruction besides English'),
            genderCategory: getVal('Categories of School / Gender'),
            agesEnrolled: getVal('Ages of Students Currently Enrolled'),
            feesPerTermWithBoarding: getVal('Fees Per Term in USD') && getVal('With Boarding') ? getVal('Fees Per Term in USD') : getVal('Per Term in USD: (With Boarding)'),
            feesPerYearWithBoarding: getVal('Fees Per Year in USD') && getVal('With Boarding') ? getVal('Fees Per Year in USD') : getVal('Per Year in USD: (With Boarding)'),
            feesPerTermWithoutBoarding: getVal('Fees Per Term in USD') && getVal('Without Boarding') ? getVal('Fees Per Term in USD') : getVal('Per Term in USD: (Without Boarding)'),
            feesPerYearWithoutBoarding: getVal('Yearly Per Year in USD') && getVal('Without Boarding') ? getVal('Yearly Per Year in USD') : getVal('Per Year in USD: (Without Boarding)'),
            totalEnrolledStudents: getVal('Total Number of Enrolled & Active Students'),
            studentNationalitiesTop5: getVal('Student Nationalities (Top 5)'),
            studentDiversityCountries: getVal('Student Diversity'),
            staffDiversity: getVal('Staff Diversity'),
            keyQualities: getVal('Key qualities and characteristics'),
            teachingApproaches: getVal('Teaching approaches'),
            academicCalendarIntakes: getVal('Academic Calendar / Main Intake'),
            registrationDeadline: getVal('Deadline for registration'),
            joinAfterStart: getVal('join after academic year begins'),
            schoolStartTime: getVal('School start time'),
            schoolEndTime: getVal('School end time'),
            supervisedCare: getVal('Supervised care before/after'),
            schoolLunches: getVal('School provided lunches'),
            specialDietaryNeeds: getVal('alternatives for special dietary needs'),
            schoolBusService: getVal('School bus service available'),
            uniformRequired: getVal('Uniform Required'),
            typeOfHostel: getVal('Type of Hostel / Boarding'),
            typeOfBoarding: getVal('Type of boarding:'),
            extracurricularActivities: getVal('Extracurricular activities or clubs offered'),
            availableFacilities: getVal('Brief description of available facilities'),
            campusFacilities: getVal('Campus Facilities Available'),
            sportsFacilities: getVal('available sports facilities')
          };
          
          // Let's be slightly more robust for fees if the specific substrings fail
          detailedFields.feesPerTermWithBoarding = detailedFields.feesPerTermWithBoarding || getVal('Fees Per Term in USD: \n(With Boarding)');
          detailedFields.feesPerYearWithBoarding = detailedFields.feesPerYearWithBoarding || getVal('Fees Per Year in USD: \n(With Boarding)');
          detailedFields.feesPerTermWithoutBoarding = detailedFields.feesPerTermWithoutBoarding || getVal('Fees Per Term in USD: \n(Without Boarding)');
          detailedFields.feesPerYearWithoutBoarding = detailedFields.feesPerYearWithoutBoarding || getVal('Yearly Per Year in USD: \n(Without Boarding)');
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
      stream: detailedFields.curriculum || 'General',
      fees: detailedFields.feesPerYearWithoutBoarding || fees,
      highlights: ['Premium Campus', 'Global Community', 'Excellent Facilities'],
      image: logoPath,
      gallery,
      emoji: '🏫',
      ...detailedFields
    });
  }
}

fs.writeFileSync(path.join(__dirname, 'app/data', 'schoolsData.json'), JSON.stringify(schools, null, 2));
console.log('Saved to app/data/schoolsData.json');
