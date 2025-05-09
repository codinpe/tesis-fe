'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

const testimonials = [
  {
    project: 'FocusStudent',
    role: 'Plataforma IA para educación',
    background: '/images/focusstudent.png',
    quote:
      'Antes dependíamos de suposiciones. Ahora, sabemos qué tan atentos están nuestros estudiantes en tiempo real.',
  },
  {
    project: 'IHotel',
    role: 'Reservas inteligentes y en la nube',
    background: '/images/ihotel.png',
    quote:
      'Pasamos de papeles a tener todo en tiempo real. El check-in nunca fue tan eficiente.',
  },
  {
    project: 'TempAlert',
    role: 'Monitoreo de refrigeración industrial',
    background: '/images/tempalert.png',
    quote:
      'Ahora monitoreamos la temperatura remotamente sin depender de reportes manuales. Precisión total.',
  },
  {
    project: 'InmobilyPay',
    role: 'Finanzas simplificadas con tecnología',
    background: '/images/inmobilypay.png',
    quote:
      'Nuestros clientes simulan cuotas y cronogramas en segundos. Todo es más claro y rápido.',
  },
  {
    project: 'SureService',
    role: 'Gestión de técnicos en tiempo real',
    background: '/images/sureservice.png',
    quote:
      'Sabemos quién está atendiendo a quién en cada momento. La operación se volvió ágil y transparente.',
  },
  {
    project: 'Matricúlate',
    role: 'Plataforma IA para crear horarios personalizados',
    background: '/images/matriculate.png',
    quote:
      'La IA entendió nuestras preferencias mejor que nosotros. Creamos horarios óptimos sin dolores de cabeza.',
  },
  {
    project: 'Yumful',
    role: 'Gestión inteligente para restaurantes',
    background: '/images/yumful.png',
    quote:
      'Los tiempos de espera se redujeron notablemente. El pedido personalizado con IA encantó a los comensales.',
  },
  {
    project: 'El Valor de la Verdad',
    role: 'Juego social emocional interactivo',
    background: '/images/valor.png',
    quote:
      'Nunca imaginamos que un juego podía conectar tan profundamente. Risas, sorpresas y emoción real.',
  },
]

export default function TestimonialSection() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="casos" className="relative isolate overflow-hidden bg-secondary text-light py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      {/* Imagen de fondo con opacidad y blur controlados */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={current.background}
          alt={current.project}
          fill
          className="object-cover opacity-40 blur-[2px] transition-all duration-700"
          priority
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-display font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Esto cambió nuestra forma de trabajar
        </motion.h2>

        <motion.p
          className="text-lg text-neutral-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Testimonios reales de equipos que confiaron en Codin y lograron resultados medibles.
        </motion.p>

        <motion.div
          className="relative flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <blockquote className="text-xl font-medium text-light px-4 max-w-2xl relative z-10">
            “{current.quote}”
          </blockquote>

          <div className="text-sm text-neutral-300 relative z-10">
            <span className="font-semibold">{current.project}</span> – {current.role}
          </div>

          <div className="flex gap-4 mt-8 relative z-10">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
              aria-label="Anterior testimonio"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={next}
              className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
              aria-label="Siguiente testimonio"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
