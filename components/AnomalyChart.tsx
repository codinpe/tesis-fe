"use client";

import { useEffect, useRef } from "react";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  PieController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AnomalyRow } from "@/src/lib/anomaly.mock";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ArcElement,
  DoughnutController,
  PieController,
  Title,
  Tooltip,
  Legend,zoomPlugin
);

export default function AnomalyChart({ rows }: { rows: AnomalyRow[] }) {
  const refs = {
    bar: useRef<HTMLCanvasElement>(null),
    doughnut: useRef<HTMLCanvasElement>(null),
    pie: useRef<HTMLCanvasElement>(null),
    line: useRef<HTMLCanvasElement>(null),
  };
  const chartsRef = useRef<Record<string, Chart>>({});

  useEffect(() => {
    // destruir viejos
    Object.values(chartsRef.current).forEach((c) => c.destroy());
    chartsRef.current = {};

    if (!rows.length) return;

    try {
      // 1. Bar
      const barEl = refs.bar.current;
      if (barEl) {
        chartsRef.current.bar = new Chart(barEl, {
          type: "bar",
          data: {
            labels: rows.map((r) => r.Ruc),
            datasets: [{
              label: "Saldo MN",
              data: rows.map((r) => r.Saldo_MN),
              backgroundColor: rows.map((r) =>
                r.isAnomaly ? "rgba(220,38,38,0.7)" : "rgba(34,197,94,0.7)"
              ),
            }],
          },
          options: {
            plugins: {
              title: { display: true, text: "Saldo por RUC" },
              tooltip: { mode: "index", intersect: false },
              legend: { display: false },
            },
            scales: { x: { ticks: { maxRotation: 45, minRotation: 45 } }, y: { beginAtZero: true } },
            responsive: true,
          },
        });
      }

      // 2. Doughnut
      const doughEl = refs.doughnut.current;
      if (doughEl) {
        const total = rows.length;
        const anomalies = rows.filter((r) => r.isAnomaly).length;
        chartsRef.current.doughnut = new Chart(doughEl, {
          type: "doughnut",
          data: {
            labels: ["Normal", "Anómalo"],
            datasets: [{ data: [total - anomalies, anomalies], backgroundColor: ["#22c55e99", "#dc262699"] }],
          },
          options: {
            plugins: {
              title: { display: true, text: "Distribución Anomalía" },
              legend: { position: "bottom" },
            },
            responsive: true,
          },
        });
      }

      // 3. Pie by Usuario
      const pieEl = refs.pie.current;
      if (pieEl) {
        const byUser = rows.reduce<Record<string, number>>((acc, r) => {
          acc[r.Usuario] = (acc[r.Usuario] || 0) + 1;
          return acc;
        }, {});
        chartsRef.current.pie = new Chart(pieEl, {
          type: "pie",
          data: {
            labels: Object.keys(byUser),
            datasets: [{
              data: Object.values(byUser),
              backgroundColor: Object.keys(byUser).map(
                (_, i) => `hsl(${(i * 60) % 360}, 70%, 60%)`
              ),
            }],
          },
          options: {
            plugins: {
              title: { display: true, text: "Registros por Usuario" },
              legend: { position: "right" },
            },
            responsive: true,
          },
        });
      }

      // 4. Line
      const lineEl = refs.line.current;
// … dentro de useEffect, reemplaza el bloque `// 4. Line`
if (lineEl) {
  // crea un gradiente para el trazo
  const ctx = lineEl.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, 200);
  grad.addColorStop(0, "rgba(59,130,246,0.8)");
  grad.addColorStop(1, "rgba(59,130,246,0.2)");

  chartsRef.current.line = new Chart(lineEl, {
    type: "line",
    data: {
      labels: rows.map((_, i) => `#${i + 1}`),
      datasets: [{
        label: "Saldo MN",
        data: rows.map((r) => r.Saldo_MN),
        borderColor: grad,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false
      }],
    },
    options: {
      plugins: {
        title: { display: true, text: "Tendencia de Saldos" },
        tooltip: { mode: "index", intersect: false },
        legend: { display: false },
        zoom: {
          pan: { enabled: true, mode: "x" },
          zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" }
        }
      },
      scales: {
        x: {
          display: true,
          title: { display: true, text: "Registro" },
          ticks: { maxRotation: 0 }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: "Saldo MN" }
        }
      },
      responsive: true,
      interaction: { mode: "nearest", axis: "x", intersect: false },
      animation: { duration: 800, easing: "easeOutQuart" }
    },
  });
}

    } catch (e) {
      console.error("Error al crear gráficos:", e);
    }
  }, [rows]);

  if (!rows.length) {
    return <p className="text-center text-gray-500">No hay datos para graficar.</p>;
  }

  // UI cards con Tailwind + Material
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8">
        {/* Bar completo */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Bar - Saldo por RUC</h3>
          <canvas ref={refs.bar} className="flex-1 w-full h-64" />
        </div>
  
        {/* Doughnut y Pie en una fila */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Doughnut - Distribución</h3>
            <canvas ref={refs.doughnut} className="flex-1 w-full h-64" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
            <h3 className="text-lg font-semibold mb-2">Pie - Registros por Usuario</h3>
            <canvas ref={refs.pie} className="flex-1 w-full h-64" />
          </div>
        </div>
  
        {/* Line completo */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Linea - Tendencia</h3>
          <canvas ref={refs.line} className="flex-1 w-full h-64" />
        </div>
      </div>
    </div>
  );
  
}
