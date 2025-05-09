// src/components/provider/index.tsx

"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function Provider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"     // Usamos class para la estrategia de tema
      defaultTheme="light"  // El default es light
      enableSystem={false}  // Ignoramos el modo del sistema
      forcedTheme="light"   // SIEMPRE forzamos el tema light
    >
      {children}
    </NextThemesProvider>
  );
}
