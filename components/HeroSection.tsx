'use client'

import { cn } from '@/lib/utils'
import { ArrowDownIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDemoModal } from './DemoModalContext'


export default function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(false)
  const { openModal } = useDemoModal();

  useEffect(() => {
    const timeout = setTimeout(() => setShowScrollHint(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative isolate w-full overflow-hidden bg-secondary text-light">
      {/* 🎥 Video de fondo ultra responsivo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[-1] overflow-hidden"
      >
        {/* <div className="relative h-full w-full aspect-[16/9] sm:aspect-auto">
          <ReactPlayer
            url="/videos/codin-hero.mp4"
            playing
            loop
            muted
            playsinline
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              objectFit: 'cover',
              pointerEvents: 'none',
              opacity: 0.2, // Se ajusta abajo con tailwind para responsive
            }}
          />
        </div> */}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-28 text-center sm:px-6 lg:px-8 lg:pb-32 lg:pt-32">
        <motion.h1
          className="text-hero font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Tu idea. <span className="text-primary">Validada.</span> Funcionando.
          <br />
          <span className="text-primary">En semanas.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Tecnología inteligente + diseño probado. Sin fricciones.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
              onClick={openModal}
              className={cn(
              'rounded-full px-8 py-3 text-base font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
              'bg-primary text-light shadow-soft-lg hover:scale-105 hover:bg-primary-400'
            )}
          >
            Hablemos de tu reto digital
          </button>
          <a
            href="#how-we-work"
            className={cn(
              'rounded-full border border-white/20 px-8 py-3 text-base font-medium text-light transition',
              'hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'
            )}
          >
            Explora cómo trabajamos
          </a>
        </motion.div>

        
      </div>
    </section>
  )
}
