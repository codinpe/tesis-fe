"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthProvider";
import { AnomalyRow } from "@/src/lib/anomaly.mock";
import { downloadReport } from "@/src/lib/report.mock";

import FileUpload from "@/components/FileUpload";

const AnomalyChart = dynamic(() => import("@/components/AnomalyChart"), {
  ssr: false,
});
const AnomalyTable = dynamic(() => import("@/components/AnomalyTable"), {
  ssr: false,
});

export default function Dashboard() {
  const { logged, isInitialized } = useAuth();
  const router = useRouter();

  const [rows, setRows] = useState<AnomalyRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isInitialized && !logged) {
      router.replace("/login");
    }
  }, [isInitialized, logged]);

  if (!isInitialized || !logged) return null;

  const handleFiles = async (data: AnomalyRow[]) => {
    setLoading(true);
    setRows(data);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://codin-tesis-back.onrender.com/api/v1/history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: "Reporte subido desde Dashboard",
            report: JSON.stringify(data),
          }),
        }
      );

      if (!response.ok) {
        console.error("Error al guardar historial:", await response.text());
      }
    } catch (error) {
      console.error("Fallo en la solicitud al historial:", error);
    }

    setLoading(false);
  };

  return (
    <main className="space-y-8 p-4">
      <FileUpload onValidFiles={handleFiles} />
      {loading && <p className="text-center">Procesando…</p>}
      {!loading && rows.length > 0 && (
        <>
          <button
            onClick={() => downloadReport(rows)}
            className="mt-4 rounded bg-primary px-4 py-2 text-white hover:opacity-90"
          >
            Descargar PDF
          </button>
          <AnomalyChart rows={rows} />
          {/* <AnomalyTable rows={rows} /> */}
        </>
      )}
      {!loading && rows.length === 0 && (
        <p className="text-center text-gray-500">No hay datos cargados.</p>
      )}
    </main>
  );
}
