'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useDemoModal } from './DemoModalContext';

export const ScrollTriggeredCta = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: true });
  const controls = useAnimation();
  const [visible, setVisible] = useState(false);
  const { openModal } = useDemoModal();

  useEffect(() => {
    if (isInView) {
      setVisible(true);
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleScroll = () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="relative z-30 w-full overflow-hidden py-24 lg:py-32">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
          },
        }}
        className={cn(
          'relative mx-auto w-full  bg-primary-600 px-6 py-16 text-center text-white shadow-feature',
          visible ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl font-semibold leading-tight md:text-3xl"
        >
          ¿Y si mañana ya tuvieras un prototipo validado?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-sm text-white/80"
        >
          La oportunidad de innovar comienza con una conversación.
        </motion.p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 transition-all duration-300"
            onClick={openModal}
          >
            Conversemos sin compromiso
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/cta-bg.svg')] bg-cover bg-center opacity-10" />
      </motion.div>
    </section>
  );
};
