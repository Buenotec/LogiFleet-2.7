const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  `onClick={() => setShowCover(true)}`,
  `onClick={() => {
              setShowCover(true);
              setActiveTab("dashboard");
              setActiveDashboardSubTab("licencas");
            }}`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched onClick successfully");
