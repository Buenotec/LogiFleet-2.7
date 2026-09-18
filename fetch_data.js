fetch("https://docs.google.com/spreadsheets/d/1_Wy2mIjpz-muAyDmDADm05C4kBUYo7dbVdkAY08MXhQ/gviz/tq?tqx=out:csv&sheet=DOC_SISTEMA_ETL")
  .then(res => res.text())
  .then(text => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
    console.log("Headers:", headers.join(' | '));
    for(let i=1; i<lines.length; i++) {
      if (lines[i].includes('CUE-0187') || lines[i].includes('CUE0187') || lines[i].includes('47')) {
        console.log("Found row:", lines[i]);
      }
    }
  });
