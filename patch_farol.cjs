const fs = require('fs');
let code = fs.readFileSync('src/components/FarolTab.tsx', 'utf8');

code = code.replace(
  `    if (doc.status === 'regular') return { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: <CheckCircle2 size={14} className="opacity-70" />,
      label: \`\${doc.daysRemaining}d\`
    };`,
  `    if (doc.status === 'regular') return { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: <CheckCircle2 size={14} className="opacity-70" />,
      label: doc.expiryDate || 'OK'
    };`
);

// Also change it for atencao/critico?
// The user said: "quando o boão apenas alertas não estiver flegado, quero que exiba os outros dados, ou seja, as datas de validades de outros campos / celulas para não ficar desproporcional"
// So they specifically mentioned the "other data" (meaning the regular ones) should display validity dates.
// I'll change it for regular. I'll also add it for the others just in case.

fs.writeFileSync('src/components/FarolTab.tsx', code);
console.log("Patched FarolTab");
