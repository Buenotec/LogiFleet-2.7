const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `  const pag = (v.extraData?.["Pagamento"] || v.extraData?.["PAGAMENTO"] || "").toString().trim().toUpperCase();
  if (pag !== "" && pag !== "-" && !pag.includes("DEFINIR") && !pag.includes("NAO") && !pag.includes("NÃO")) {
    return true;
  }
  
  const statusCol = (v.extraData?.["Status"] || v.extraData?.["STATUS"] || v.extraData?.["Situação"] || v.extraData?.["SITUACAO"] || "").toString().trim().toUpperCase();
  if (statusCol.includes("PAGO") || statusCol.includes("QUITADO")) return true;`;

const replacement = `  const pag = (v.extraData?.["Pagamento"] || v.extraData?.["PAGAMENTO"] || v.extraData?.["Data Pagamento"] || v.extraData?.["DT PAGAMENTO"] || v.extraData?.["Dt Pag"] || v.extraData?.["Data Pgto"] || v.extraData?.["Data Pag"] || v.extraData?.["Pago em"] || v.extraData?.["Baixa"] || v.extraData?.["Data Baixa"] || v.extraData?.["DT BAIXA"] || "").toString().trim().toUpperCase();
  if (pag !== "" && pag !== "-" && !pag.includes("DEFINIR") && !pag.includes("NAO") && !pag.includes("NÃO")) {
    return true;
  }
  
  const statusCol = (v.extraData?.["Status"] || v.extraData?.["STATUS"] || v.extraData?.["Situação"] || v.extraData?.["SITUACAO"] || v.extraData?.["Situacao Titulo"] || v.extraData?.["Status Pagamento"] || v.extraData?.["Situação do Pagamento"] || "").toString().trim().toUpperCase();
  if (statusCol.includes("PAGO") || statusCol.includes("BAIXADO") || statusCol.includes("QUITADO")) return true;`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Success");
} else {
  console.log("Target not found");
}
