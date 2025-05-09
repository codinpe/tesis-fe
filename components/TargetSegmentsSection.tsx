'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SEGMENTS = [
  {
    id: 'startups',
    title: 'Startups',
    pain: 'Ideas sin validación, sin producto claro.',
    solution: 'Prototipo validado en semanas, listo para iterar.',
    emotion: '“Validamos tu visión con tecnología real.”',
    cta: 'Agenda con nuestro team startup',
  },
  {
    id: 'empresas',
    title: 'Empresas medianas',
    pain: 'Procesos dispersos, software sin escalabilidad.',
    solution: 'Centralizamos, automatizamos y escalamos contigo.',
    emotion: '“La tecnología no debe frenar tu operación.”',
    cta: 'Agenda con nuestro team empresa',
  },
  {
    id: 'corporativos',
    title: 'Corporativos',
    pain: 'Proyectos lentos, con poca adopción interna.',
    solution: 'Co-creamos con tus equipos para lograr impacto real.',
    emotion: '“Innovación que se implementa, no solo se idea.”',
    cta: 'Agenda con nuestro team corporativo',
  },
  {
    id: 'agencias',
    title: 'Agencias',
    pain: 'Proyectos tech que se caen o no llegan a producción.',
    solution: 'Te damos el soporte técnico que tu equipo necesita.',
    emotion: '“Convertimos tu diseño en un producto estable y escalable.”',
    cta: 'Agenda con nuestro team tech',
  },
];

export default function TargetSegmentsSection() {
  const [active, setActive] = useState('startups');

  const selected = SEGMENTS.find((s) => s.id === active);

  return (
    <section id="segmentos" className="relative bg-neutral-100 text-secondary py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-display font-bold text-secondary mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          ¿Para quién es Codin?
        </motion.h2>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {SEGMENTS.map((segment) => (
            <button
              key={segment.id}
              onClick={() => setActive(segment.id)}
              className={cn(
                'px-5 py-2 rounded-full border font-medium transition-all text-sm sm:text-base',
                active === segment.id
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-neutral-200 hover:bg-neutral-100 text-secondary'
              )}
            >
              {segment.title}
            </button>
          ))}
        </div>

        <motion.div
          key={selected?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-left bg-white rounded-2xl shadow-codin p-6 sm:p-8"
        >
          <h3 className="text-xl font-semibold text-primary mb-2">{selected?.title}</h3>
          <p className="text-sm sm:text-base text-neutral-700 mb-1">
            <strong className="font-semibold text-secondary">Dolor típico: </strong>
            {selected?.pain}
          </p>
          <p className="text-sm sm:text-base text-neutral-700 mb-1">
            <strong className="font-semibold text-secondary">Solución Codin: </strong>
            {selected?.solution}
          </p>
          <p className="text-base italic text-secondary mt-4">“{selected?.emotion}”</p>

          <a
            href="#contact"
            className="inline-block mt-6 rounded-full bg-primary text-white px-6 py-2 text-sm font-semibold hover:bg-primary-600 transition"
          >
            {selected?.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
