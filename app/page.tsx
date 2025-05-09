import Link from "next/link";

export default function Landing() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-primary text-center leading-tight">
        Análisis Inteligente de<br/>Anomalías Contables
      </h1>
      <p className="text-gray-700 text-center mt-6 max-w-lg">
        Sube tus archivos de Cuentas por Pagar y detecta fraudes o errores en segundos.
      </p>
      <Link
        href="/login"
        className="mt-8 bg-accent text-black px-8 py-3 rounded-md shadow-md hover:shadow-lg transition"
      >
        Comenzar
      </Link>
    </section>
  );
}
