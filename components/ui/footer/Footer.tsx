'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function FooterSection() {
  return (
    <footer className="bg-[#0d1219] border-t border-white/10 pt-16 pb-24 px-6 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Bloque de marca */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Codin</h3>
          <p className="text-sm text-white/60">Tecnología que suma</p>
          <div className="flex items-center gap-4 mt-6">
            <img src="images/aws.png" alt="AWS" className="h-6" />
            <img src="images/open_ai.png" alt="OpenAI" className="h-6" />
            <img src="images/azure.png" alt="Azure" className="h-6" />
          </div>
        </div>

        {/* CTA dinámico */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl border border-white/10 p-6 bg-gradient-to-br from-[#10151c] to-[#0d1219]"
          >
            <h4 className="text-xl font-semibold mb-3">
              ¿Qué tipo de reto digital estás enfrentando?
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Validar una idea',
                'Escalar tu tecnología',
                'Automatizar procesos con IA',
                'Rediseñar una plataforma',
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-white/5 px-4 py-3 rounded-md hover:bg-white/10 transition">
                  <CheckCircleIcon className="h-5 w-5 text-primary" />
                  {text}
                </div>
              ))}
            </div>
            <Button
              size="lg"
              className="mt-6 w-full sm:w-auto"
              onClick={() => {
                const target = document.getElementById('casos')
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Ver cómo ayudamos a empresas como la tuya
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-10 border-t border-white/10" />

      {/* Copy de cierre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-lg font-medium">
          “La tecnología debe sumar. A tu equipo. A tus usuarios. A tu futuro.”
        </p>
        <p className="text-sm text-white/50 mt-2">
          Codin © {new Date().getFullYear()} – Todos los derechos reservados
        </p>
      </motion.div>
    </footer>
  )
}
