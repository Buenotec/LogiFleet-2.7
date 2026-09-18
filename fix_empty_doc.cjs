const fs = require('fs');
let code = fs.readFileSync('src/components/FarolTab.tsx', 'utf8');

const target = "if (!doc) return null;";
const replacement = `if (!doc) {
      return {
        bg: 'bg-slate-100/50 dark:bg-slate-800/30',
        text: 'text-slate-400 dark:text-slate-500',
        border: 'border-slate-200/50 dark:border-slate-700/50',
        icon: null,
        label: '-'
      };
    }`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/FarolTab.tsx', code);
    console.log("Patched undefined docs");
}
