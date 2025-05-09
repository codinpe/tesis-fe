import { AnomalyRow } from "./anomaly.mock";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function downloadReport(rows: AnomalyRow[]) {
  const doc = new jsPDF({ orientation: "landscape" });
  doc.text("Reporte de Anomalías – CxP", 14, 20);
  autoTable(doc, {
    startY: 25,
    head: [["RUC","Razón Social","Saldo MN","zScore","Anómalo"]],
    body: rows.map(r => [r.Ruc, r["RAZON SOCIAL"], r.Saldo_MN, r.zScore.toFixed(2), r.isAnomaly?"Sí":"No"])
  });
  doc.save("reporte-anomalias.pdf");
}
