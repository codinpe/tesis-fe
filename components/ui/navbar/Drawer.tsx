"use client";

import ReactDOM from "react-dom";
import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logo from "@/public/images/logo.png";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Bloqueo del scroll en el body cuando el Drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      drawerRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, setIsOpen]);

  const onClose = () => setIsOpen(false);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm flex"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          {/* Panel del Drawer */}
          <motion.aside
            ref={drawerRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-neutral-900 w-[90%] sm:w-[320px] max-w-xs h-full flex flex-col shadow-xl focus:outline-none"
            tabIndex={-1}
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
              <Image
                src={logo}
                alt="Yumful Logo"
                width={140}
                height={40}
                className="object-contain"
                priority
              />
              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                className="rounded p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <XMarkIcon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
              {children}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Drawer;
