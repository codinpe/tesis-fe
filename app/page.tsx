// src/app/page.tsx
import Link from "next/link";
import { FC } from "react";

const features = [
  {
    title: "Detección Automática de Anomalías",
    description:
      "Gracias a nuestro motor de Machine Learning, identifica patrones inusuales en tus cuentas por pagar en segundos.",
    icon: "⚡️",
  },
  {
    title: "Métricas de Rendimiento",
    description:
      "Obtén Accuracy, Precision, Recall y F1-Score tras el entrenamiento de tu modelo, todo visible al instante.",
    icon: "📊",
  },
  {
    title: "Visualización Avanzada",
    description:
      "Genera gráficos de barras, pastel, doughnut y líneas para explorar tus datos con zoom y filtrado interactivo.",
    icon: "📈",
  },
  {
    title: "Descarga de Reportes",
    description:
      "Exporta los resultados en un Excel listo para auditoría, o baja reportes PDF con un solo click.",
    icon: "📥",
  },
  {
    title: "Registro y Recuperación",
    description:
      "Crea tu cuenta ADMIN en un par de clics, recupera tu contraseña de forma segura y gestiona usuarios fácilmente.",
    icon: "🛡️",
  },
];

const Landing: FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-tight">
          Análisis Inteligente de<br />
          Anomalías Contables
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl">
          Sube tus archivos de Cuentas por Pagar y detecta fraudes o errores en
          segundos, con reportes descargables, métricas de rendimiento y gráficos
          interactivos.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/sign-up"
            className="bg-accent text-black px-8 py-3 rounded-md shadow-md hover:shadow-lg transition"
          >
            Crear cuenta
          </Link>
          <Link
            href="/login"
            className="bg-primary text-white px-8 py-3 rounded-md shadow-md hover:opacity-90 transition"
          >
            Iniciar sesión
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          ¿Qué ofrecemos?
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-xl hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="py-16 px-4 bg-blue-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
          Flujo de Trabajo
        </h2>
        <ol className="mt-10 max-w-3xl mx-auto space-y-8 list-decimal list-inside text-gray-700">
          <li>
            <strong>Sube tus archivos:</strong> Arrastra o selecciona tus .csv,
            .xls, .xlsx ó .txt.
          </li>
          <li>
            <strong>Validación y Procesamiento:</strong> Se comprueba la
            estructura, se entrena el modelo y se calculan las métricas.
          </li>
          <li>
            <strong>Visualiza Resultados:</strong> Navega entre gráficos de
            barras, doughnut, pie y líneas; ajusta zoom y filtra anomalías.
          </li>
          <li>
            <strong>Descarga Informes:</strong> Baja tu Excel completo o PDF de
            auditoría, listo para compartir.
          </li>
        </ol>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center justify-center py-16 bg-white px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Empieza hoy mismo
        </h2>
        <p className="mt-4 text-gray-600 max-w-lg text-center">
          Únete a decenas de empresas que ya usan nuestra plataforma para
          garantizar la integridad de sus finanzas.
        </p>
        <Link
          href="/sign-up"
          className="mt-8 bg-accent text-black px-8 py-3 rounded-md shadow-md hover:shadow-lg transition"
        >
          Regístrate Gratis
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-primary text-white text-center">
        <p>© {new Date().getFullYear()} Accounting AML. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;
