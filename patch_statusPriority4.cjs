const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `      let overallStatus = 'ok';
      if (docs.length > 0) {
        if (name.startsWith("DOC_SISTEMA")) {
          overallStatus = docs[0].status as any;
        } else {
          overallStatus = docs.reduce((prev, curr) => {
            // Em licenças, não queremos que um documento "pago" puxe o overallStatus pra pagos 
            // se existir um documento vencido. O vencido sempre prevalece.
            return (statusPriority[curr.status as keyof typeof statusPriority] ?? 3) < (statusPriority[prev as keyof typeof statusPriority] ?? 3) ? curr.status : prev;
          }, docs[0].status as any);
        }
      }`;

const replacement = `      let overallStatus = 'ok';
      if (docs.length > 0) {
        if (name.startsWith("DOC_SISTEMA")) {
          // Se estamos avaliando o próprio item processado na linha do globus, o status geral dele É o status do documento que ele contém.
          overallStatus = docs[0].status as any;
        } else {
          // Quando estamos em LICENCAS, um veiculo pode ter 10 documentos agregados na MESMA linha (ex: CNH, IPVA, VISTORIA)
          // Nesse caso, ele roda a regra de achar o pior status pra que se CNH estiver vencida e o IPVA pago, a frota acenda a luz vermelha.
          overallStatus = docs.reduce((prev, curr) => {
            // Em licenças, não queremos que um documento "pago" puxe o overallStatus pra pagos 
            // se existir um documento vencido. O vencido sempre prevalece.
            return (statusPriority[curr.status as keyof typeof statusPriority] ?? 3) < (statusPriority[prev as keyof typeof statusPriority] ?? 3) ? curr.status : prev;
          }, docs[0].status as any);
        }
      }`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
