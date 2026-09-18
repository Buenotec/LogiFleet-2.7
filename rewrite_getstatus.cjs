const fs = require('fs');
let code = fs.readFileSync('src/components/FarolTab.tsx', 'utf8');

const regex = /const getStatusConfig = \(\s*doc\?: Document\s*\) => \{[\s\S]*?return null;\n  \};/m;

const newBlock = `const getStatusConfig = (doc?: Document) => {
    if (!doc) return null;
    if (doc.status === 'vencido') return { 
      bg: 'bg-rose-500/15 dark:bg-rose-500/20',
      text: 'text-rose-700 dark:text-rose-400',
      border: 'border-rose-300 dark:border-rose-500/40',
      icon: <XCircle size={14} className="drop-shadow-[0_0_3px_rgba(244,63,94,0.5)]" />,
      label: 'VENCIDO'
    };
    if (doc.status === 'critico') return { 
      bg: 'bg-amber-500/15 dark:bg-amber-500/20',
      text: 'text-amber-700 dark:text-amber-400',
      border: 'border-amber-300 dark:border-amber-500/40',
      icon: <AlertTriangle size={14} className="drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]" />,
      label: \`\${doc.daysRemaining}d\`
    };
    if (doc.status === 'atencao') return { 
      bg: 'bg-blue-500/15 dark:bg-blue-500/20',
      text: 'text-blue-700 dark:text-blue-400',
      border: 'border-blue-300 dark:border-blue-500/40',
      icon: <Clock size={14} className="drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]" />,
      label: \`\${doc.daysRemaining}d\`
    };
    if (doc.status === 'regular') return { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: <CheckCircle2 size={14} className="opacity-70" />,
      label: doc.expiryDate || 'REGULAR'
    };
    return null;
  };`;

code = code.replace(regex, newBlock);
fs.writeFileSync('src/components/FarolTab.tsx', code);
console.log("Patched getStatusConfig");
