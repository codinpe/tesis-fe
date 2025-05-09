"use client";

import { MouseEvent } from "react";
import { motion } from "framer-motion";

export interface NavigationItem {
  name: string;
  href: string;
  isAnchor?: boolean;
}

export const NAV_ITEMS: NavigationItem[] = [
  { name: "Servicios", href: "#servicios", isAnchor: true },
  { name: "Cómo trabajamos", href: "#how-we-work", isAnchor: true },
  { name: "Casos reales", href: "#casos", isAnchor: true },
  { name: "¿Es para ti?", href: "#segmentos", isAnchor: true },
];

interface DrawerDataProps {
  handleAnchorClick: (e: MouseEvent<HTMLAnchorElement>, href: string) => void;
  activeSection?: string | null;
}

const DrawerData = ({ handleAnchorClick, activeSection }: DrawerDataProps) => {
  return (
    <nav aria-label="Menú principal">
      {/* Mini frase emocional */}
      <div className="px-4 pt-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Navega y descubre cómo podemos ayudarte a transformar tu reto digital.
      </div>

      <ul className="space-y-4">
        {NAV_ITEMS.map((item) => {
          const id = item.href.replace("#", "");
          const isActive = activeSection === id;

          return (
            <li key={item.name}>
              <motion.a
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                href={item.href}
                onClick={(e) =>
                  item.isAnchor ? handleAnchorClick(e, item.href) : null
                }
                className={`block text-lg font-medium px-4 py-2 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-primary"
                }`}
              >
                {item.name}
              </motion.a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DrawerData;
