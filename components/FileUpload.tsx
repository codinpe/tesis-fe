'use client';

import { useState, useCallback } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { AnomalyRow, parseExcelBlobToJson } from '@/src/lib/anomaly.mock';

type Metrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
};

export default function FileUpload({
  onValidFiles,
}: {
  onValidFiles: (rows: AnomalyRow[]) => void;
}) {
  const [hover, setHover] = useState(false);
  const [stage, setStage] = useState<'idle' | 'processing' | 'done'>('idle');
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  const processFiles = useCallback(async (files: FileList) => {
    const fileArray = Array.from(files);
    if (fileArray.length < 3 || fileArray.length > 5) {
      toast.error('Debes seleccionar entre 3 y 5 archivos.');
      return;
    }

    setStage('processing');
    setMetrics(null);

    let lastParsedRows: AnomalyRow[] = [];
    let lastBlob: Blob | null = null;
    let lastMetrics: Metrics | null = null;

    try {
      for (const file of fileArray) {
        // ─── 1️⃣ Subir archivo ───────────────────────────────
        const fd = new FormData();
        fd.append('file', file);
        const resProc = await fetch('https://ml-fastapi-s54j.onrender.com/process', {
          method: 'POST',
          body: fd,
        });
        const jsonProc = await resProc.json();
        if (!resProc.ok) throw new Error(jsonProc.message || 'Error al subir archivo');
        toast.success(`✅ "${file.name}" subido`);

        // ─── 3️⃣ Descargar Excel ────────────────────────────
        const resDl = await fetch('https://ml-fastapi-s54j.onrender.com/download-excel');
        if (!resDl.ok) throw new Error('Error al descargar Excel');
        const blob = await resDl.blob();
        lastBlob = blob;

        // ─── Parsear a JSON ───────────────────────────────────
        const parsed = await parseExcelBlobToJson(blob);
        lastParsedRows = parsed;
      }

      // Solo utilizamos el resultado del ÚLTIMO archivo
      if (lastParsedRows.length) {
        onValidFiles(lastParsedRows);
      }

      if (lastMetrics) {
        setMetrics(lastMetrics);
      }

      // Descargar Excel final para el usuario
      if (lastBlob) {
        const url = window.URL.createObjectURL(lastBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }

      setStage('done');
    } catch (err: any) {
      console.error('FileUpload error:', err);
      toast.error(err.message || 'Error en el procesamiento');
      setStage('idle');
    }
  }, [onValidFiles]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) processFiles(e.target.files);
  };

  const isBusy = stage === 'processing';

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setHover(true); }}
        onDragLeave={() => setHover(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${hover ? 'bg-blue-50 border-accent' : 'bg-white border-gray-300'}`}
        style={{ minHeight: 200 }}
      >
        {isBusy && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg z-10">
            <div className="flex flex-col items-center gap-2">
              <ClipLoader size={48} color="#2563eb" />
              <span className="text-gray-700">Procesando archivos…</span>
            </div>
          </div>
        )}

        <p className="mb-4 font-medium text-gray-700">Arrastra tus archivos aquí</p>
        <p className="mb-6 text-sm text-gray-500">Acepta .csv, .xls, .xlsx, .txt — 3 a 5 archivos</p>

        <label className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-md cursor-pointer hover:bg-primary/90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-3 3m3-3l3 3M12 4v8" />
          </svg>
          <span>Seleccionar archivos</span>
          <input
            type="file"
            multiple
            accept=".csv,.xls,.xlsx,.txt"
            hidden
            onChange={handleSelect}
            disabled={isBusy}
          />
        </label>
      </div>

      {metrics && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">Métricas del Modelo</h3>
          <ul className="space-y-2">
            <li>📈 Accuracy: {metrics.accuracy.toFixed(4)}</li>
            <li>🎯 Precision: {metrics.precision.toFixed(4)}</li>
            <li>🔔 Recall: {metrics.recall.toFixed(4)}</li>
            <li>⚖️ F1 Score: {metrics.f1.toFixed(4)}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
