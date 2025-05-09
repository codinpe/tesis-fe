'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';
import { cn } from '@/lib/utils';
import Marquee from './Marquee'; // Asegúrate de importar el componente Marquee correctamente

type CaseStudy = {
  name: string;
  sector: string;
  description: string;
  country: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'FocusStudent',
    sector: 'Educación',
    description: 'IA para medir y optimizar la atención en clases.',
    country: '🇨🇴',
  },
  {
    name: 'IHotel',
    sector: 'Hotelería',
    description: 'Software en la nube para reservas, clientes e inventarios.',
    country: '🇵🇪',
  },
  {
    name: 'TempAlert',
    sector: 'Refrigeración industrial',
    description: 'Monitoreo y control remoto de temperatura en tiempo real.',
    country: '🇵🇪',
  },
  {
    name: 'InmobilyPay',
    sector: 'Finanzas',
    description: 'Simulación de cuotas, cronograma dinámico y reportes.',
    country: '🇨🇱',
  },
  {
    name: 'SureService',
    sector: 'Servicios técnicos',
    description: 'Gestión de técnicos y solicitudes en tiempo real.',
    country: '🇵🇪',
  },
  {
    name: 'Matricúlate',
    sector: 'Educación universitaria',
    description:
      'IA para crear horarios optimizados según preferencias. Resolución automática de conflictos.',
    country: '🇵🇪',
  },
  {
    name: 'Yumful (en desarrollo)',
    sector: 'Gastronomía inteligente',
    description:
      'Pedidos personalizados, reservas de platos, nutrición e inventarios con IA para restaurantes casuales.',
    country: '🇵🇪',
  },
  {
    name: 'El Valor de la Verdad (juego)',
    sector: 'Entretenimiento / IA',
    description:
      'Juego social que integra IA para generar preguntas, controlar dinámicas y resumir momentos clave.',
    country: '🇵🇪',
  },
];

const CaseStudiesSection: FC = () => {
  return (
    <section className="bg-light py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center mb-12">
        <motion.h2
          className="text-display font-bold text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Casos reales. Resultados visibles.
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Soluciones digitales desarrolladas por Codin que ya están transformando empresas reales.
        </motion.p>
      </div>

      {/* Marquee component for horizontal scrolling */}
      <Marquee
        className="overflow-hidden"
        vertical={false}
        repeat={5} // Set the number of repetitions
        pauseOnHover={true}
        applyMask={true}
        
      >
        {CASE_STUDIES.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] max-w-[320px] flex-shrink-0 rounded-xl bg-white p-6 shadow-codin border border-neutral-200 transition hover:shadow-feature"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            aria-label={`Caso de estudio: ${item.name}`}
          >
            <div className="mb-2">
              <p className="text-xl font-bold text-primary">{item.name}</p>
              <p className="text-sm text-neutral-600">
                {item.sector} · {item.country}
              </p>
            </div>
            <p className="mt-3 text-sm text-neutral-700">{item.description}</p>
          </motion.div>
        ))}
      </Marquee>
    </section>
  );
};

export default CaseStudiesSection;
