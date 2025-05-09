// src/app/dashboard/page.tsx
"use client";

import AnomalyChart from "@/components/AnomalyChart";
import AnomalyTable from "@/components/AnomalyTable";
import FileUpload from "@/components/FileUpload";
import { AnomalyRow } from "@/src/lib/anomaly.mock";
import { useState } from "react";

export default function Dashboard() {
  const [rows, setRows] = useState<AnomalyRow[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = async (data: AnomalyRow[]) => {
    setLoading(true);
    setRows(data);         // ya viene procesado
    setLoading(false);
  };

  return (
    <main className="p-4 space-y-8">
      <FileUpload onValidFiles={handleFiles} />
      {loading && <p className="text-center">Procesando…</p>}
      {!loading && rows.length > 0 && (
        <>
          <AnomalyChart rows={rows} />
          <AnomalyTable rows={rows} />
        </>
      )}
      {!loading && rows.length === 0 && (
        <p className="text-center text-gray-500">No hay datos cargados.</p>
      )}
    </main>
  );
}
