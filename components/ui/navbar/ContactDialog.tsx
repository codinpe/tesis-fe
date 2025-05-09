"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDemoModal } from "@/components/DemoModalContext"; // si usas este contexto
import logo from "@/public/images/logo.png";

/**
 * Ejemplo de Modal para "Agenda tu Llamada" en lugar de "Demo"
 */
const ContactDialog = () => {
  const { isOpen, closeModal } = useDemoModal();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleGoToScheduler = () => {
    // Aquí podrías redirigir a tu formulario / agenda / Calendly
    closeModal();
    router.push("/contact"); // o "/agenda" o donde prefieras
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[9999]"
        onClose={closeModal}
        initialFocus={cancelButtonRef}
      >
        {/* Fondo oscuro */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* Contenedor del diálogo */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 text-left shadow-2xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                  <Image
                    src={logo}
                    alt="Codin Logo"
                    width={140}
                    height={40}
                    priority
                  />
                  <button
                    ref={cancelButtonRef}
                    onClick={closeModal}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary p-2"
                  >
                    ✕
                  </button>
                </div>

                {/* Contenido principal */}
                <div className="p-6 space-y-6">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-secondary dark:text-white text-center"
                  >
                    ¿Cómo deseas agendar tu Llamada?
                  </motion.h2>

                  <div className="flex flex-col gap-4 items-center justify-center mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGoToScheduler}
                      className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Agendar vía Calendario
                    </motion.button>

                    <motion.a
                      href="https://wa.me/51999999999?text=Hola,%20quiero%20hablar%20sobre%20Codin"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 w-full bg-neutral-100 dark:bg-neutral-700 text-black dark:text-white font-semibold py-3 px-6 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {/* Ícono de ejemplo */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 2H4C2.9 2 2 2.9 2 4v16a2 2 0 002 2h8v-2H4V6h16v6h2V4c0-1.1-.9-2-2-2z" />
                        <path d="M17 8H7v2h10V8zm3.1 7.64l-1.4-1.4a1.984 1.984 0 00-2.8 0l-4.53 4.53c-.09.09-.16.2-.21.32l-1.08 2.57c-.23.56.33 1.12.88.88l2.57-1.08c.12-.05.23-.12.32-.21l4.53-4.53c.78-.78.78-2.04 0-2.82z" />
                      </svg>
                      Hablar por WhatsApp
                    </motion.a>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end px-6 py-4 border-t border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={closeModal}
                    className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Cerrar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactDialog;
