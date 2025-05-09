"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Drawer from "./Drawer";
import DrawerData, { NAV_ITEMS } from "./DrawerData";
import { useDemoModal } from "@/components/DemoModalContext"; // <-- O rename a "useCallModal"
import logo from "@/public/images/logo.png";
import clsx from "clsx";
import useActiveSection from "./useActiveSection";
import AccessibilityToggle from "@/components/AccessibilityToggle";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true); // control de ocultar/mostrar
  const [isAtTop, setIsAtTop] = useState(true); // para determinar si estamos en top
  const lastScrollY = useRef(0);

  // Para abrir/cerrar el modal (antes "demo")
  const { openModal } = useDemoModal();

  // Ver si estamos en la página /demo (o la que sea) para un navbar simplificado
  const isDemoPage = pathname === "/llamada"; 
  // EJEMPLO: si tuvieras una página "/llamada" donde no quieres la navbar "completa"

  // Secciones para IntersectionObserver
  const sectionIds = NAV_ITEMS.map((item) => item.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  // Manejo de scroll: oculta la navbar al hacer scroll down
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setIsAtTop(currentScrollY === 0);
    if (currentScrollY > lastScrollY.current) {
      // Scrolling Down
      setIsScrollingUp(false);
    } else {
      // Scrolling Up
      setIsScrollingUp(true);
    }
    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll suave a secciones
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsDrawerOpen(false);
      }
    },
    []
  );

  // Si quieres un navbar simplificado en "/llamada" o "/demo"
  if (isDemoPage) {
    return (
      <nav className="fixed top-0 left-0 w-full z-[9999] bg-white dark:bg-dark shadow-md backdrop-blur-sm transition-all duration-300">
        <div className="flex justify-between items-center h-[60px] max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 w-full">
          {/* Botón para volver al inicio */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Volver al inicio
          </button>

          {/* Logo */}
          <Link href="/" aria-label="Ir al inicio" className="flex items-center">
            <div className="relative w-32 h-10 lg:w-40 lg:h-12">
              <Image
                src={logo}
                alt="Codin logo"
                fill
                priority
                sizes="(max-width: 1024px) 128px, 160px"
                className="object-contain"
              />
            </div>
          </Link>
        </div>
      </nav>
    );
  }

  // NAVBAR PRINCIPAL
  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isScrollingUp ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          "fixed top-0 left-0 w-full z-[9999] transition-all duration-300",
          "bg-white dark:bg-dark shadow-md backdrop-blur-sm",
          isAtTop && "shadow-none"
        )}
      >
        <div className="flex justify-between items-center h-[60px] lg:h-[70px] max-w-screen-xl mx-auto w-full px-4 md:px-6 lg:px-8 overflow-hidden">
          {/* Logo */}
          <Link href="/" aria-label="Ir al inicio" className="flex-shrink-0">
            <div className="relative w-28 h-10 lg:w-40 lg:h-12">
              <Image
                src={logo}
                alt="Codin logo"
                fill
                priority
                sizes="(max-width: 1024px) 128px, 160px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) =>
                    item.isAnchor ? handleAnchorClick(e, item.href) : null
                  }
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={clsx(
                    "text-sm xl:text-base px-3 py-2 font-medium transition-all duration-200 relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "text-primary"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-primary"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            {/* <AccessibilityToggle /> */}
            <button
              onClick={openModal}
              className="bg-primary text-white text-sm xl:text-base font-semibold py-3 px-6 rounded-full hover:bg-primary-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Agenda tu Llamada
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            {/* <AccessibilityToggle /> */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menú"
              aria-controls="mobile-menu"
              aria-expanded={isDrawerOpen}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <Bars3Icon
                className="h-6 w-6 text-neutral-900 dark:text-neutral-100"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Botón flotante en mobile */}
      <motion.div
        className="fixed bottom-4 right-4 z-[99999] lg:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={openModal}
          className="bg-primary text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-primary-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Agendar
        </button>
      </motion.div>

      {/* Drawer móvil */}
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
        <DrawerData handleAnchorClick={handleAnchorClick} activeSection={activeSection} />
        <div className="px-4 pb-6">
          <button
            onClick={() => {
              setIsDrawerOpen(false);
              openModal();
            }}
            className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-primary-400 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Agenda tu Llamada
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
