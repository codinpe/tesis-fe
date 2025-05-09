'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';  // Usamos los íconos de Heroicons

export default function AccessibilityToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sincroniza el estado de montaje para evitar el error de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Asegurarse de que el componente solo se renderice después de montado
  if (!mounted) return null; // Evita el error de hidratación

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); // Cambiar el tema entre dark y light
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema entre claro y oscuro"
      className="p-3 rounded-full transition-all duration-300 ease-in-out bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {theme === 'dark' ? (
        <MoonIcon className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
      ) : (
        <SunIcon className="h-6 w-6 text-neutral-800 dark:text-neutral-200" />
      )}
    </button>
  );
}
