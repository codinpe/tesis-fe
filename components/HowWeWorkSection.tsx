'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FC, memo } from 'react'
import { cn } from '@/lib/utils'

type Step = {
  title: string
  description: string
  icon: string
}

const STEPS: Step[] = [
  {
    title: 'Descubrimiento estratégico',
    description:
      'Analizamos tu reto desde la raíz, alineando objetivos reales con visión digital.',
    icon: '/images/strategy.png',
  },
  {
    title: 'Co-creación validada',
    description:
      'Construimos soluciones con usuarios reales desde el día uno, sin adivinanzas.',
    icon: '/images/cocreation.png',
  },
  {
    title: 'Desarrollo ágil',
    description:
      'Iteramos rápido, probamos en campo y priorizamos impacto, no solo entregables.',
    icon: '/images/agile.png',
  },
  {
    title: 'Evolución continua',
    description:
      'No terminamos en producción: optimizamos, medimos y crecemos contigo.',
    icon: '/images/evolution.png',
  },
]

const StepCard: FC<{ step: Step; index: number }> = memo(({ step, index }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12"
    >
      {/* Text Block */}
      <div
        className={cn(
          'w-full lg:w-1/2 text-center lg:text-left px-4 lg:px-0',
          isEven ? 'lg:order-1' : 'lg:order-2'
        )}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-secondary">
          {step.title}
        </h3>
        <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Icon Block */}
      <div
        className={cn(
          'w-full lg:w-1/2 flex justify-center lg:justify-center',
          isEven ? 'lg:order-2' : 'lg:order-1'
        )}
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/10 flex items-center justify-center shadow-soft-lg border border-primary/20">
          <Image
            src={step.icon}
            alt={step.title}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>
      </div>
    </motion.div>
  )
})

StepCard.displayName = 'StepCard'

const HowWeWorkSection: FC = () => {
  return (
    <section
      id="how-we-work"
      className="bg-white py-20 sm:py-28 px-6 sm:px-8 lg:px-10 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-display font-bold text-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Cómo trabajamos
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
        >
          Tu idea no se queda en Figma. Se convierte en impacto real.
        </motion.p>
      </div>

      <div className="mt-20 space-y-20 max-w-5xl mx-auto px-2 sm:px-4 lg:px-0">
        {STEPS.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </section>
  )
}

export default HowWeWorkSection
