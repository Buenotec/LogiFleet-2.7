const flatData = [
  { source: 'DOCUMENTACAO', fleet: '47', plate: 'CUE0187', documents: [{ type: 'IPVA', rawExpiryDate: '24/09/2026', status: 'atencao', daysRemaining: 8 }] },
  { source: 'DOCUMENTACAO', fleet: '47', plate: 'CUE0187', documents: [{ type: 'DESPACHANTE', rawExpiryDate: '17/08/2026', status: 'vencido', daysRemaining: -30 }] },
  { source: 'DOCUMENTACAO', fleet: '47', plate: 'CUE0187', documents: [{ type: 'IPVA', rawExpiryDate: '18/08/2026', status: 'pagos', daysRemaining: 999 }] }
];

const consolidatedMap = new Map();
      flatData.forEach((v) => {
        let key = "";
        if (v.source === "DOCUMENTACAO") {
          const docType = v.documents[0]?.type || "Documento";
          const docDate = v.documents[0]?.rawExpiryDate || "";
          key = v.plate 
            ? `${v.source}-P-${v.plate}-${docType}-${docDate}-${v.documents[0]?.status}-${v.documents[0]?.daysRemaining}` 
            : `${v.source}-F-${v.fleet}-${docType}-${docDate}-${v.documents[0]?.status}-${v.documents[0]?.daysRemaining}`;
        } else {
          key = v.plate ? `${v.source}-P-${v.plate}` : `${v.source}-F-${v.fleet}`;
        }

        const existing = consolidatedMap.get(key);
        if (!existing) {
          consolidatedMap.set(key, v);
        } else {
          const existingScore = (existing.documents?.length || 0) + (existing.driver ? 1 : 0);
          const currentScore = (v.documents?.length || 0) + (v.driver ? 1 : 0);
            
          if (currentScore >= existingScore) {
            v.documents.forEach((d) => {
              const isDuplicate = existing.documents.some((ed) => 
                ed.type === d.type && ed.expiryDate === d.expiryDate
              );
              if (!isDuplicate) {
                existing.documents.push(d);
              }
            });
            consolidatedMap.set(key, { ...v, documents: existing.documents });
          }
        }
      });
      
console.log(Array.from(consolidatedMap.values()));
