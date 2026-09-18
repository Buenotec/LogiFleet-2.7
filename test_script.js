const fs = require('fs');
const text = fs.readFileSync('src/App.tsx', 'utf8');

// The issue might be that in DOC_SISTEMA for IPVA, it's:
// 47-002-2026 / CUE-0187 / 0000047 / 367072920

// Let's see the getValClient for situation/status
const isStatusPaid = "PAGO".includes("PAGO");
console.log(isStatusPaid);
