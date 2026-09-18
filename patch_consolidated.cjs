const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      flatData.forEach((v: any) => {
        let key = "";
        if (v.source === "DOCUMENTACAO") {
          const docType = v.documents[0]?.type || "Documento";
          const docDate = v.documents[0]?.rawExpiryDate || "";
          key = v.plate 
            ? \`\${v.source}-P-\${v.plate}-\${docType}-\${docDate}\` 
            : \`\${v.source}-F-\${v.fleet}-\${docType}-\${docDate}\`;
        } else {
          key = v.plate ? \`\${v.source}-P-\${v.plate}\` : \`\${v.source}-F-\${v.fleet}\`;
        }`;

const replacement = `      flatData.forEach((v: any) => {
        let key = "";
        if (v.source === "DOCUMENTACAO") {
          const docType = v.documents[0]?.type || "Documento";
          const docDate = v.documents[0]?.rawExpiryDate || "";
          // Adicionamos status/dias à chave de documentos do GLOBUS para não misturar parcelas pagas e não pagas com mesma data (ou sem data).
          // Dessa forma cada parcela individual é tratada como um documento distinto na visão de alertas
          key = v.plate 
            ? \`\${v.source}-P-\${v.plate}-\${docType}-\${docDate}-\${v.documents[0]?.status}-\${v.documents[0]?.daysRemaining}\` 
            : \`\${v.source}-F-\${v.fleet}-\${docType}-\${docDate}-\${v.documents[0]?.status}-\${v.documents[0]?.daysRemaining}\`;
        } else {
          key = v.plate ? \`\${v.source}-P-\${v.plate}\` : \`\${v.source}-F-\${v.fleet}\`;
        }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
