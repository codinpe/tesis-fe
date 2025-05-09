"use client";

import { useEffect, useState } from "react";

const useActiveSection = (sectionIds: string[]): string | null => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6, // Ajusta para definir cuándo consideras una sección “activa”
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [sectionIds]);

  return activeSection;
};

export default useActiveSection;
