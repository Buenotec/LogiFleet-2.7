const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  `<LandingCover onStart={() => setShowCover(false)} />`,
  `<LandingCover onStart={() => setShowCover(false)} lastUpdated={lastUpdated} />`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx for LandingCover prop");
