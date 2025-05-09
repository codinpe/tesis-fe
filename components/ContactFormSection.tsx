'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactFormSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({ name: false, message: false });

  const isNameValid = name.trim().length >= 2;
  const isMessageValid = message.trim().length >= 10;
  const isFormValid = isNameValid && isMessageValid;

  const handleSubmit = () => {
    const formattedMessage = `Hola, soy ${name}. ${message}`;
    const url = `https://wa.me/51999999999?text=${encodeURIComponent(formattedMessage)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-secondary-900 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Cuéntanos tu reto. Lo pensamos contigo.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-lg text-neutral-300"
        >
          Te respondemos en menos de 24h.
        </motion.p>
      </div>

      {!submitted ? (
        <div className="max-w-xl mx-auto mt-10 space-y-6">
          {/* Nombre */}
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="font-semibold text-base mb-1">
              Tu Nombre
            </label>
            <Input
              id="name"
              value={name}
              placeholder="Tu nombre completo"
              onChange={(e) => {
                setName(e.target.value);
                if (!touched.name) setTouched((prev) => ({ ...prev, name: true }));
              }}
              className="mt-1 text-white bg-secondary-700 placeholder-neutral-400 border border-primary/30 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md p-4"
              aria-invalid={!isNameValid}
            />
            {touched.name && !isNameValid && (
              <p className="text-red-400 text-sm mt-1">Tu nombre debe tener al menos 2 caracteres.</p>
            )}
          </div>

          {/* Mensaje */}
          <div className="flex flex-col text-left">
            <label htmlFor="message" className="font-semibold text-base mb-1">
              Tu Mensaje
            </label>
            <Textarea
              id="message"
              rows={4}
              value={message}
              placeholder="Escribe tu mensaje..."
              onChange={(e) => {
                setMessage(e.target.value);
                if (!touched.message) setTouched((prev) => ({ ...prev, message: true }));
              }}
              className="mt-1 text-white bg-secondary-700 placeholder-neutral-400 border border-primary/30 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md p-4"
              aria-invalid={!isMessageValid}
            />
            {touched.message && !isMessageValid && (
              <p className="text-red-400 text-sm mt-1">El mensaje debe tener al menos 10 caracteres.</p>
            )}
          </div>

          {/* Botón */}
          <div className="mt-6 flex justify-center">
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              whileHover={isFormValid ? { scale: 1.03 } : {}}
              whileTap={isFormValid ? { scale: 0.97 } : {}}
              className={`px-8 py-3 text-lg font-semibold rounded-full shadow-soft-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 ${
                isFormValid
                  ? 'bg-primary text-white hover:bg-primary-600'
                  : 'bg-secondary-700 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {isFormValid ? 'Enviar a WhatsApp' : 'Formulario incompleto'}
            </motion.button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-center space-y-2"
        >
          <motion.p className="text-2xl font-bold" initial={{ y: 20 }} animate={{ y: 0 }}>
            ¡Gracias! 🥳
          </motion.p>
          <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: 0.2 }}>
            Nos pondremos en contacto contigo en menos de 24h.
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}
