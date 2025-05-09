import { randomDelay } from "@/src/helpers";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const config = { api: { bodyParser: false } };

const expectedHeaders = [
  "Ruc","RAZON SOCIAL","Diario","Ddiario","Sub_diario","Fecha","Documento",
  "Fecha Doc.","Fecha Vcto.","Moneda","Usuario","Detalle de concepto",
  "Debe_MN","Haber_MN","Saldo_MN","Debe_ME","Haber_ME","Saldo_ME"
];

export async function POST(req: NextRequest) {
  await randomDelay();

  // Extraemos el FormData de la request
  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ success: false, message: "No se recibió archivo" }, { status: 400 });
  }

  try {
    // Leemos el ArrayBuffer directamente
    const buf = Buffer.from(await file.arrayBuffer());
    const wb = XLSX.read(buf, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const firstRow = (XLSX.utils.sheet_to_json<any[]>(ws, { header: 1 })[0] ?? []) as string[];

    if (!expectedHeaders.every((h) => firstRow.includes(h))) {
      return NextResponse.json(
        { success: false, message: "Estructura de columnas inválida" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 400 }
    );
  }
}
