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
          };
          if (scoreDoc(d) > scoreDoc(existing)) {
            if (!d.validityPeriod && existing.validityPeriod) d.validityPeriod = existing.validityPeriod;
            uniqueDocsMap.set(normType, d);
          } else {
            if (!existing.validityPeriod && d.validityPeriod) existing.validityPeriod = d.validityPeriod;
          }
        }
      });
      docs = Array.from(uniqueDocsMap.values());
        
      return { ...v, documents: docs };`;

const replacement = `      // Aplicar desduplicação extrema (1 tipo por veículo) APENAS em LICENCAS.
      // Em DOCUMENTACAO (Globus) nós PODEMOS TER múltiplas parcelas do mesmo tipo de documento, e não queremos esmagá-las
      // Nós JÁ separamos essas frotas do GLOBUS como "veículos isolados" baseados na data e status do documento em consolidatedMap.
      if (v.source === "LICENCAS") {
        const uniqueDocsMap = new Map<string, any>();
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
            };
            if (scoreDoc(d) > scoreDoc(existing)) {
              if (!d.validityPeriod && existing.validityPeriod) d.validityPeriod = existing.validityPeriod;
              uniqueDocsMap.set(normType, d);
            } else {
              if (!existing.validityPeriod && d.validityPeriod) existing.validityPeriod = d.validityPeriod;
            }
          }
        });
        docs = Array.from(uniqueDocsMap.values());
      }
        
      return { ...v, documents: docs };`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
