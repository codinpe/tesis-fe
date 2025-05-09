'use client'

import {
  RocketIcon,
  MagicWandIcon,
  LayersIcon,
  GlobeIcon,
  BarChartIcon,
  LightningBoltIcon,
} from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

const services = [
  {
    icon: <RocketIcon className="w-6 h-6 text-primary" />,
    title: 'Software a Medida',
    description:
      'Desde plataformas complejas hasta sistemas internos: creamos soluciones únicas alineadas a tus flujos reales.',
  },
  {
    icon: <MagicWandIcon className="w-6 h-6 text-primary" />,
    title: 'Landing Pages de Alto Impacto',
    description:
      'Diseños que convierten, comunican y conectan. Ideal para lanzamientos, productos o servicios.',
  },
  {
    icon: <LayersIcon className="w-6 h-6 text-primary" />,
    title: 'Apps Web y PWA Inteligentes',
    description:
      'Funcionalidad completa, UX emocional y tecnología moderna. Listas para escalar desde el día uno.',
  },
  {
    icon: <GlobeIcon className="w-6 h-6 text-primary" />,
    title: 'Transformación Digital',
    description:
      'Integramos IA y automatización para ayudarte a escalar sin sumar complejidad.',
  },
  {
    icon: <BarChartIcon className="w-6 h-6 text-primary" />,
    title: 'Dashboards y Reportes Visuales',
    description:
      'Visibilidad total. Diseñamos paneles de datos claros, adaptados a tu toma de decisiones.',
  },
  {
    icon: <LightningBoltIcon className="w-6 h-6 text-primary" />,
    title: 'Soluciones accesibles para emprendedores',
    description:
      'Desde una landing efectiva hasta un MVP validado. Acompañamos cada etapa con visión realista.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="bg-light py-24 px-4 sm:px-6 md:px-8 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-bold text-secondary">
            Servicios digitales para cada etapa de tu crecimiento
          </h2>
          <p className="mt-4 text-lg text-neutral-700 max-w-2xl mx-auto">
            Desde tu primera idea hasta escalar internacionalmente, en Codin te acompañamos con soluciones prácticas, emocionales y con impacto real.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-codin hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-700 mt-2 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
