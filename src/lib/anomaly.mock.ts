import * as XLSX from "xlsx";

export type AnomalyRow = {
  Ruc: string;
  "RAZON SOCIAL": string;
  Diario: string;
  Ddiario: string;
  Sub_diario: string;
  Fecha: string | number;
  Documento: string;
  "Fecha Doc.": string | number;
  "Fecha Vcto.": string | number;
  Moneda: string;
  Usuario: string;
  "Detalle de concepto": string;
  Debe_MN: number;
  Haber_MN: number;
  Saldo_MN: number;
  Debe_ME: number;
  Haber_ME: number;
  Saldo_ME: number;
  /** Valor calculado automáticamente */
  zScore: number;
  /** Si es anómalo según zScore */
  isAnomaly: boolean;
};

export async function parseFiles(files: File[]) {
  const allRows: AnomalyRow[] = [];
  for (const f of files) {
    const buf = await f.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(ws, { defval: 0 }) as any[];
    allRows.push(...rows);
  }
  return detect(allRows);
}

function detect(rows: any[]): AnomalyRow[] {
  const saldo = rows.map(r => +r.Saldo_MN || 0);
  const mean = saldo.reduce((a,b)=>a+b,0)/saldo.length;
  const std  = Math.sqrt(saldo.map(v => (v-mean)**2).reduce((a,b)=>a+b,0)/saldo.length);
  return rows.map(r => {
    const z = std ? (r.Saldo_MN - mean) / std : 0;
    return { ...r, zScore: z, isAnomaly: Math.abs(z) >= 2 };
  });
}
