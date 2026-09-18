const fs = require('fs');
const https = require('https');

https.get("https://docs.google.com/spreadsheets/d/1_Wy2mIjpz-muAyDmDADm05C4kBUYo7dbVdkAY08MXhQ/gviz/tq?tqx=out:csv&sheet=DOC_SISTEMA_ETL", (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].includes('CUE-0187') || lines[i].includes('CUE0187') || lines[i].includes('47')) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
        const rowObj = {};
        headers.forEach((h, idx) => {
          if (values[idx]) rowObj[h] = values[idx];
        });
        if (rowObj['Descrição'] === 'IPVA' || rowObj['Descrição'] === 'DESPACHANTE') {
           console.log("\nRow:", rowObj);
        }
      }
    }
  });
});
