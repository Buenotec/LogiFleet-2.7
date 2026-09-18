const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      const statusPriority: Record<string, number> = { vencido: 0, critico: 1, atencao: 2, ok: 3, pagos: 4 };
      // Se TODOS os documentos forem pagos, overallStatus é pagos. Caso contrário, acha o pior status que NÃO SEJA pagos
      let overallStatus = 'ok';
      if (docs.length > 0) {
        if (docs.every(d => d.status === 'pagos')) {
          overallStatus = 'pagos';
        } else {
          overallStatus = docs.reduce((prev, curr) => {
            if (curr.status === 'pagos') return prev;
            if (prev === 'pagos') return curr.status;
            return (statusPriority[curr.status as keyof typeof statusPriority] ?? 3) < (statusPriority[prev as keyof typeof statusPriority] ?? 3) ? curr.status : prev;
          }, docs.find(d => d.status !== 'pagos')?.status || 'ok') as any;
        }
      }`;

const replacement = `      const statusPriority: Record<string, number> = { vencido: 0, critico: 1, atencao: 2, ok: 3, pagos: 4 };
      let overallStatus = 'ok';
      if (docs.length > 0) {
        // Se a origem for DOC_SISTEMA (GLOBUS), a linha processada costuma representar uma única parcela
        // Queremos refletir o status exato DESTA parcela, e não agregar pior status.
        if (name.startsWith("DOC_SISTEMA")) {
          overallStatus = docs[0].status as any;
        } else {
          if (docs.every(d => d.status === 'pagos')) {
            overallStatus = 'pagos';
          } else {
            overallStatus = docs.reduce((prev, curr) => {
              if (curr.status === 'pagos') return prev;
              if (prev === 'pagos') return curr.status;
              return (statusPriority[curr.status as keyof typeof statusPriority] ?? 3) < (statusPriority[prev as keyof typeof statusPriority] ?? 3) ? curr.status : prev;
            }, docs.find(d => d.status !== 'pagos')?.status || 'ok') as any;
          }
        }
      }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
