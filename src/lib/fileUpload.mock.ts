import * as XLSX from "xlsx";

export const expectedHeaders = [
  "Ruc","RAZON SOCIAL","Diario","Ddiario","Sub_diario","Fecha","Documento",
  "Fecha Doc.","Fecha Vcto.","Moneda","Usuario","Detalle de concepto",
  "Debe_MN","Haber_MN","Saldo_MN","Debe_ME","Haber_ME","Saldo_ME"
];

export async function validateFiles(list: FileList) {
  const arr = Array.from(list);
  // if (arr.length < 3 || arr.length > 5)
  //   throw new Error("Debes cargar entre 3 y 5 archivos");

  const invalid = arr.find(f => !/\.(csv|xls|xlsx|txt)$/i.test(f.name));
  if (invalid) throw new Error(`Formato inválido: ${invalid.name}`);

  const first = arr[0];
  const buf = await first.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const firstRow = (XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 })[0] ?? []) as string[];
  const ok = expectedHeaders.every(h => firstRow.includes(h));
  if (!ok) throw new Error("Estructura de columnas inválida");
  return arr; // devuelves array de File si todo pasó
}
