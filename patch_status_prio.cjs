const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      const uniqueDocsMap = new Map<string, any>();
      docs.forEach(d => {
        const normType = normalizeDocTypeForDedup(d.type);
        if (!uniqueDocsMap.has(normType)) {
          uniqueDocsMap.set(normType, d);
        } else {
          const existing = uniqueDocsMap.get(normType);
          const scoreDoc = (doc: any) => {
            let score = 0;
            if (doc.rawExpiryDate && doc.rawExpiryDate !== "-" && !doc.rawExpiryDate.toUpperCase().includes("DEFINIR") && !doc.rawExpiryDate.toUpperCase().includes("VAZIO")) score += 20;
            if (doc.validityPeriod && /\\d+/.test(doc.validityPeriod)) score += 10;
            return score;
          };`;

const replacement = `      const uniqueDocsMap = new Map<string, any>();
      docs.forEach(d => {
        const normType = normalizeDocTypeForDedup(d.type);
        if (!uniqueDocsMap.has(normType)) {
          uniqueDocsMap.set(normType, d);
        } else {
          const existing = uniqueDocsMap.get(normType);
          const scoreDoc = (doc: any) => {
            let score = 0;
            if (doc.status === 'vencido') score += 10000;
            else if (doc.status === 'critico') score += 8000;
            else if (doc.status === 'atencao') score += 6000;
            else if (doc.status === 'ok') score += 4000;
            else if (doc.status === 'pagos') score += 0;
            
            if (doc.rawExpiryDate && doc.rawExpiryDate !== "-" && !doc.rawExpiryDate.toUpperCase().includes("DEFINIR") && !doc.rawExpiryDate.toUpperCase().includes("VAZIO")) score += 20;
            if (doc.validityPeriod && /\\d+/.test(doc.validityPeriod)) score += 10;
            return score;
          };`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
