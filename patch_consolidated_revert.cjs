const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetRegex = /const consolidatedMap = new Map\(\);\s*flatData\.forEach\(\(v: any\) => \{\s*let key = "";\s*if \(v\.source === "DOCUMENTACAO"\) \{\s*const docType = v\.documents\[0\]\?\.type \|\| "Documento";\s*const docDate = v\.documents\[0\]\?\.rawExpiryDate \|\| "";\s*key = v\.plate\s*\? `\$\{v\.source\}-P-\$\{v\.plate\}-\$\{docType\}-\$\{Math\.random\(\)\}`\s*: `\$\{v\.source\}-F-\$\{v\.fleet\}-\$\{docType\}-\$\{Math\.random\(\)\}`;\s*\} else \{\s*key = v\.plate \? `\$\{v\.source\}-P-\$\{v\.plate\}` : `\$\{v\.source\}-F-\$\{v\.fleet\}`;\s*\}/m;

const replacement = `const consolidatedMap = new Map();
        
      flatData.forEach((v: any) => {
        const key = v.plate ? \`\${v.source}-P-\${v.plate}\` : \`\${v.source}-F-\${v.fleet}\`;`;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
