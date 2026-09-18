const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        const isPaid = (s: string) => {
          if (!s) return false;
          const val = s.toString().trim().toUpperCase();
          return !(val === "" || val === "-" || val.includes("DEFINIR") || val === "NÃO" || val === "NAO");
        };

        const paid = isPaid(pagamento);
        const classification = clientClassifyDocument(paid ? pagamento : vencimento);
        const status = paid ? 'pagos' : classification.status;
        const daysRemaining = paid ? 999 : classification.daysRemaining;

        docs.push({
          type: descricao,
          expiryDate: classification.formattedDate || (paid ? pagamento : vencimento),
          rawExpiryDate: paid ? pagamento : vencimento,
          validityPeriod: "",
          status: status,
          daysRemaining: daysRemaining
        });`;

const replacement = `        const isPaidValue = (s: string) => {
          if (!s) return false;
          const val = s.toString().trim().toUpperCase();
          return !(val === "" || val === "-" || val.includes("DEFINIR") || val === "NÃO" || val === "NAO");
        };

        const statusColStr = getValClient(row, ["Status", "STATUS", "Situação", "SITUACAO", "Situacao Titulo", "Status Pagamento", "Situação do Pagamento"]).toString().toUpperCase();
        const isStatusPaid = statusColStr.includes("PAGO") || statusColStr.includes("BAIXADO") || statusColStr.includes("QUITADO");
        const hasPaidValue = isPaidValue(pagamento) || (getValClient(row, ["Valor Pago", "VALOR PAGO", "Pago", "Vlr Pago"]).toString().trim() !== "");

        const isActuallyPaid = hasPaidValue || isStatusPaid;
        const refDate = (isActuallyPaid && pagamento) ? pagamento : vencimento;
        
        const classification = clientClassifyDocument(refDate);
        const status = isActuallyPaid ? 'pagos' : classification.status;
        const daysRemaining = isActuallyPaid ? 999 : classification.daysRemaining;

        docs.push({
          type: descricao,
          expiryDate: classification.formattedDate || refDate,
          rawExpiryDate: refDate,
          validityPeriod: "",
          status: status,
          daysRemaining: daysRemaining
        });`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
