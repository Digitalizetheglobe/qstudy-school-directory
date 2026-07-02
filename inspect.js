const xlsx = require('xlsx');
const path = require('path');

const wb = xlsx.readFile(path.join(__dirname, 'public/images/UK/Mount Kelly/Mount Kelly (Responses).xlsx'));
const sheetName = wb.SheetNames[0];
const sheet = wb.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);
console.log(JSON.stringify(data[0], null, 2));
