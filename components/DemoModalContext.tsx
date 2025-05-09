'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface DemoModalContextProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextProps | undefined>(undefined);

export const DemoModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Escucha cambios de hash en la URL para abrir el modal si es #demo
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#demo') {
        openModal();
        // Limpia el hash de la URL sin recargar
        router.replace(pathname, { scroll: false });
      }
    };

    // Detecta carga inicial con hash
    if (typeof window !== 'undefined' && window.location.hash === '#demo') {
      openModal();
      router.replace(pathname, { scroll: false });
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname, router]);

  return (
    <DemoModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </DemoModalContext.Provider>
  );
};

// Hook personalizado para usar el context en cualquier componente
export const useDemoModal = () => {
  const context = useContext(DemoModalContext);
  if (!context) {
    throw new Error('useDemoModal debe usarse dentro de DemoModalProvider');
  }
  return context;
};
