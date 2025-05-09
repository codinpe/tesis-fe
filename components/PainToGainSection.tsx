'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const painPoints = [
  {
    title: 'Sistemas dispersos',
    description:
      'Tus procesos están desconectados. Cada área trabaja en silos y eso te frena.',
  },
  {
    title: 'Pérdida de tiempo',
    description:
      'Tu equipo invierte horas en tareas repetitivas que podrías automatizar.',
  },
  {
    title: 'Diseño confuso',
    description:
      'Tu plataforma no conecta con usuarios reales. Pierdes oportunidades clave.',
  },
];

const gainPoints = [
  {
    title: 'Todo en una sola plataforma',
    description: 'Codin integra tus procesos en una solución escalable y modular.',
  },
  {
    title: 'Automatización inteligente',
    description: 'IA aplicada y flujos UX pensados para ahorrar tiempo real.',
  },
  {
    title: 'Experiencia validada',
    description: 'Diseño centrado en el usuario, probado antes de desarrollar.',
  },
];

export default function PainToGainSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % painPoints.length);
    }, 2000); // Reducir el intervalo a 300ms para mayor rapidez
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-light text-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bloque: Dolor (Pain) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }} // Reducir el tiempo de transición
            className="space-y-6"
          >
            <h2 className="text-display font-bold text-secondary">
              ¿Te suena familiar?
            </h2>
            {painPoints.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  'p-6 rounded-xl shadow-md border transition-all duration-200', // Reducir duración de la transición
                  activeIndex === index
                    ? 'bg-primary/10 border-primary'
                    : 'bg-neutral-100 border-neutral-200'
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-neutral-700 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bloque: Ganancia (Gain) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="space-y-6"
          >
            <h2 className="text-display font-bold text-primary">
              Con Codin, la historia cambia
            </h2>
            {gainPoints.map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-neutral-800 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
