const fs = require('fs');
let code = fs.readFileSync('src/components/FarolTab.tsx', 'utf8');

const regex = /if \(doc.status === 'regular'\) return \{[\s\S]*?return null;\n  \};/m;
const replacement = `if (doc.status === 'regular' || doc.status === 'ok') return { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: <CheckCircle2 size={14} className="opacity-70" />,
      label: doc.expiryDate || 'REGULAR'
    };
    return null;
  };`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/FarolTab.tsx', code);
    console.log("Patched getStatusConfig with 'ok' status");
} else {
    console.log("Regex not found");
}
