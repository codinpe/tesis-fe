"use client";

import { useState, useCallback } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";

export default function FileUpload({
  onValidFiles,
}: {
  onValidFiles: (rows: any[]) => void;
}) {
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const processFiles = useCallback(
    async (files: FileList) => {
      setLoading(true);
      try {
        // 1️⃣ Validación de estructura
        const fd1 = new FormData();
        Array.from(files).forEach((f) => fd1.append("file", f));
        const resVal = await fetch("/api/validate", {
          method: "POST",
          body: fd1,
        });
        const jsonVal = await resVal.json();
        if (!resVal.ok) throw new Error(jsonVal.message || "Error de validación");

        // 2️⃣ Análisis de datos
        const fd2 = new FormData();
        Array.from(files).forEach((f) => fd2.append("file", f));
        const resAn = await fetch("/api/analyze", {
          method: "POST",
          body: fd2,
        });
        const jsonAn = await resAn.json();
        if (!resAn.ok) throw new Error(jsonAn.message || "Error de análisis");

        // 3️⃣ Éxito
        onValidFiles(jsonAn.data);
        toast.success(`✅ ${files.length} archivo(s) procesado(s)`);
      } catch (err: any) {
        console.error("FileUpload error:", err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [onValidFiles]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
    if (e.dataTransfer.files.length) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
      ${hover ? "bg-blue-50 border-accent" : "bg-white border-gray-300"}`}
      style={{ minHeight: 200 }}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg z-10">
          <ClipLoader size={48} color="#2563eb" />
        </div>
      )}

      <p className="mb-4 font-medium text-gray-700">Arrastra tus archivos aquí</p>
      <p className="mb-6 text-sm text-gray-500">
        Acepta .csv, .xls, .xlsx, .txt — 3 a 5 archivos
      </p>

      <label className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-md cursor-pointer hover:bg-primary/90 transition">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-3 3m3-3l3 3M12 4v8" />
        </svg>
        <span>Seleccionar archivos</span>
        <input
          type="file"
          multiple
          accept=".csv,.xls,.xlsx,.txt"
          hidden
          onChange={handleSelect}
          disabled={loading}
        />
      </label>
    </div>
  );
}
