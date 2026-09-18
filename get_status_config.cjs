const fs = require('fs');
let code = fs.readFileSync('src/components/FarolTab.tsx', 'utf8');

const regex = /const getStatusConfig = \(\s*doc\?: Document\s*\) => \{[\s\S]*?return \{[\s\S]*?OK'[\s\S]*?\};[\s\S]*?\};/m;
const match = code.match(regex);
if (match) {
    console.log(match[0]);
} else {
    console.log("NOT FOUND");
}
