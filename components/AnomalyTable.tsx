"use client";

import { AnomalyRow } from "@/src/lib/anomaly.mock";
import { downloadReport } from "@/src/lib/report.mock";

export default function AnomalyTable({ rows }: { rows: AnomalyRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {["RUC","Razón Social","Saldo","zScore","Anómalo"].map(h => (
              <th key={h} className="px-2 py-1 border">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={i} className="text-sm">
              <td className="border px-2">{r.Ruc}</td>
              <td className="border px-2">{r["RAZON SOCIAL"]}</td>
              <td className="border px-2">{r.Saldo_MN}</td>
              <td className="border px-2">{r.zScore.toFixed(2)}</td>
              <td className="border px-2">{r.isAnomaly ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => downloadReport(rows)}
        className="mt-4 bg-primary text-white px-4 py-2 rounded hover:opacity-90"
      >
        Descargar PDF
      </button>
    </div>
  );
}
