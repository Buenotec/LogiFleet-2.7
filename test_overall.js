const docs = [
  { status: 'pagos' },
  { status: 'vencido' }
];

const statusPriority = { vencido: 0, critico: 1, atencao: 2, ok: 3, pagos: 4 };

const overallStatus = docs.reduce((prev, curr) => {
  if (curr.status === 'pagos') return prev;
  if (prev === 'pagos') return curr.status;
  return (statusPriority[curr.status] ?? 3) < (statusPriority[prev] ?? 3) ? curr.status : prev;
}, docs.find(d => d.status !== 'pagos')?.status || 'ok');

console.log(overallStatus);

