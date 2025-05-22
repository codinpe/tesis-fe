'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthProvider';
import { HiOutlineDocumentArrowDown, HiOutlineDocumentText } from 'react-icons/hi2';
import { AnomalyRow } from '@/src/lib/anomaly.mock';
import * as XLSX from 'xlsx';
import { downloadReport } from '@/src/lib/report.mock';

interface HistoryEntry {
  id: number;
  name: string;
  report: string; // JSON.stringify(AnomalyRow[])
  date: string; // ISO format
}

export default function HistorialPage() {
  const { logged, isInitialized } = useAuth();
  const router = useRouter();
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isInitialized && !logged) {
      router.replace('/login');
    }
  }, [isInitialized, logged]);

  useEffect(() => {
    if (logged) {
      fetchHistory();
    }
  }, [logged]);

  const fetchHistory = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('https://codin-tesis-back.onrender.com/api/v1/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: HistoryEntry[] = await res.json();
    setEntries(data);
  } catch (e) {
    console.error('Error cargando historial', e);
  } finally {
    setLoading(false);
  }
};


  const handleDownloadPDF = (report: string) => {
    try {
      const rows: AnomalyRow[] = JSON.parse(report);
      downloadReport(rows);
    } catch (e) {
      console.error('Error al parsear JSON para PDF:', e);
    }
  };

  const handleDownloadExcel = (report: string, filename: string) => {
    try {
      const rows: AnomalyRow[] = JSON.parse(report);
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
      XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (e) {
      console.error('Error al generar Excel:', e);
    }
  };

  if (!isInitialized || !logged) return null;

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">HISTORIAL</h1>

      {loading && <p className="text-center text-gray-500">Cargando historial...</p>}

      {!loading && entries.length === 0 && (
        <p className="text-center text-gray-500">No hay reportes en el historial.</p>
      )}

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm"
          >
            <input
              className="bg-white border border-gray-300 rounded px-2 py-1 text-sm flex-1 mr-4"
              value={entry.name}
              readOnly
            />
            <span className="text-sm text-gray-700 mr-4">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              <button
                title="Descargar Excel"
                className="p-2 bg-green-200 hover:bg-green-300 rounded"
                onClick={() => handleDownloadExcel(entry.report, entry.name)}
              >
                <HiOutlineDocumentArrowDown className="w-5 h-5 text-green-700" />
              </button>
              <button
                title="Descargar PDF"
                className="p-2 bg-blue-200 hover:bg-blue-300 rounded"
                onClick={() => handleDownloadPDF(entry.report)}
              >
                <HiOutlineDocumentText className="w-5 h-5 text-blue-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
