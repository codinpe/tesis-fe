'use client';

import { motion } from 'framer-motion';
import {
  CheckCircledIcon,
  RocketIcon,
  BarChartIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

const items = [
  {
    icon: CheckCircledIcon,
    title: 'Validado con usuarios reales',
    description: 'Probamos antes de construir. Minimiza el riesgo y maximiza el impacto.',
  },
  {
    icon: RocketIcon,
    title: 'IA práctica, no teórica',
    description: 'Usamos IA donde aporta valor tangible, no donde solo suena bonito.',
  },
  {
    icon: BarChartIcon,
    title: 'Escalable desde el día uno',
    description: 'Arquitectura sólida, pensada para crecer con tu negocio.',
  },
  {
    icon: PersonIcon,
    title: 'Full acompañamiento, sin floro técnico',
    description: 'Nos entiendes desde el día uno. Codin traduce tecnología en acción.',
  }
  
];

export default function ValuePropositionSection() {
  return (
    <section className="relative w-full bg-neutral-100 text-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-display font-bold text-secondary max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Soluciones que fluyen, porque <span className="text-primary">entendemos primero.</span>
        </motion.h2>

        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-codin hover:shadow-soft-lg transition-all duration-300 border border-neutral-200 hover:border-primary/50 group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
