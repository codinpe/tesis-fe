'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import notFoundImg from '@/public/images/not-found-plate.png'; // Reemplázalo por la imagen que quieras

const NotFound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white dark:bg-black text-midnight_text dark:text-white relative text-center">
      {/* ILUSTRACIÓN */}
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Image
          src={notFoundImg}
          alt="Plato vacío: 404"
          width={300}
          height={300}
          priority
          className="mx-auto object-contain"
        />
      </motion.div> */}

      {/* MENSAJE */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        ¡Oops! Nos comimos esta página
      </motion.h1>
{/* 
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-lg text-gray-600 dark:text-zinc-400 mb-8 max-w-xl"
      >
        Parece que esta página no está en el menú de Yumful.<br />
        Pero no te preocupes, tenemos muchas delicias esperándote.
      </motion.p> */}

      {/* BOTONES */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link href="/">
          <Button
            variant="default"
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
          >
            Volver al Inicio
          </Button>
        </Link>
        {/* <Link href="#demo">
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white transition"
          >
            Agenda tu Demo Gratis
          </Button>
        </Link> */}
      </motion.div>

      {/* FOOTER GRACIOSO */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-12 text-sm text-gray-400 dark:text-zinc-500"
      >
        PD: No encontramos esta página, pero encontramos espacio para el postre 🍰.
      </motion.p>
    </section>
  );
};

export default NotFound;
