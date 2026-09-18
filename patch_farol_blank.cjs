const fs = require('fs');
let code = fs.readFileSync('src/components/FarolTab.tsx', 'utf8');

// The issue in the screenshot is that some cells are entirely blank `-` even though they probably have a document!
// Wait! If doc is undefined, it returns null.
// If doc.status is something else, it returns null.
// What if we change getStatusConfig to return a generic "OK" for any document that doesn't match the bad statuses, as long as it has an expiry date?

const regex = /if \(doc.status === 'regular' \|\| doc.status === 'ok'\) return \{[\s\S]*?return null;\n  \};/m;
const replacement = `// For any other status (like 'ok', 'regular', or undefined status but existing document), show as regular as long as there is an expiry date or it's explicitly ok
    if (doc.status === 'regular' || doc.status === 'ok' || (doc.expiryDate && doc.daysRemaining > 45)) return { 
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-500/30',
      icon: <CheckCircle2 size={14} className="opacity-70" />,
      label: doc.expiryDate || 'REGULAR'
    };
    
    // Fallback if it has a document but somehow slipped through
    return {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-200 dark:border-slate-700',
      icon: <CheckCircle2 size={14} className="opacity-50" />,
      label: doc.expiryDate || 'OK'
    };
  };`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/FarolTab.tsx', code);
    console.log("Patched getStatusConfig fallback");
} else {
    console.log("Regex not found");
}
