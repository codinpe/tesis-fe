import { randomDelay } from "@/src/helpers";
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const config = { api: { bodyParser: false } };

function detect(rows: any[]) {
  const saldo = rows.map((r) => +r.Saldo_MN || 0);
  const mean = saldo.reduce((a, b) => a + b, 0) / saldo.length;
  const std = Math.sqrt(
    saldo.map((v) => (v - mean) ** 2).reduce((a, b) => a + b, 0) / saldo.length
  );
  return rows.map((r) => {
    const z = std ? (r.Saldo_MN - mean) / std : 0;
    return { ...r, zScore: z, isAnomaly: Math.abs(z) >= 2 };
  });
}

export async function POST(req: NextRequest) {
  await randomDelay(1000, 2500);

  const form = await req.formData();
  const files = form.getAll("file") as File[];

  if (!files.length) {
    return NextResponse.json({ success: false, message: "No se recibieron archivos" }, { status: 400 });
  }

  try {
    const allRows: any[] = [];

    for (const file of files) {
      const buf = Buffer.from(await file.arrayBuffer());
      const wb = XLSX.read(buf, { type: "buffer" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any>(ws, { defval: 0 });
      allRows.push(...rows);
    }

    const result = detect(allRows);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 400 }
    );
  }
}
