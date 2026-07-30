const str = 'KL CampusNo 185, Jalan Puchong,58200 Kuala Lumpur, Malaysia.Subang Jaya CampusNo 18, Jalan USJ Sentral 3,Persiaran Subang 1,47600 Subang Jaya,Selangor, Malaysia.Cheras Campus2, Jln Jering, Taman Cheras,56100 Kuala Lumpur,Wilayah Persekutuan Kuala LumpurShah Alam CampusLot 7950,Jln Sungai Buloh,U 6, 40150 Shah Alam,Selangor, Malaysia.';

// Step 1: Insert space before 'Campus' if missing, wait it's after Campus:
let s = str.replace(/Campus(?=[A-Za-z0-9])/gi, 'Campus ');

// Step 2: There are missing dots or spaces between 'Malaysia.Subang' etc.
// Let's just find Campus and its preceding words.
// A campus name starts with a capital letter, might have spaces, and ends with Campus.
// Let's use a regex to match Campus names and their following addresses.
// A campus name is preceded by either beginning of string, or a dot, or a lowercase letter followed by capital (like rS in LumpurShah)
s = s.replace(/([a-z])([A-Z])/g, '\.\n\');
console.log('After a-z A-Z split:', s);

s = s.replace(/\.([A-Z])/g, '.\n\');
console.log('After dot split:', s);

let finalSplit = s.split('\n');
console.log('finalSplit:', finalSplit);

let grouped = [];
let current = '';
for (let line of finalSplit) {
  if (line.includes('Campus')) {
    if (current) grouped.push(current);
    current = line;
  } else {
    current += ' ' + line;
  }
}
if (current) grouped.push(current);

console.log('grouped:', grouped);

