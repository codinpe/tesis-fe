'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    window.gtag &&
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
      });

    localStorage.setItem('cookie-consent', 'granted');
    setShowBanner(false);
  };

  const handleReject = () => {
    window.gtag &&
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
      });

    localStorage.setItem('cookie-consent', 'denied');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:bottom-8 max-w-sm md:max-w-md bg-lightgrey text-black shadow-cause-shadow z-50 rounded-lg border border-border p-4 md:p-6"
        >
          <div className="flex flex-col gap-3">
            <p className="text-xs md:text-sm leading-130 text-center md:text-left">
              🍪 Usamos cookies para brindarte una experiencia a tu medida. ¿Te gustaría ayudarnos a mejorar aceptándolas?
            </p>
            <div className="flex justify-center md:justify-start gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm text-white bg-blue hover:bg-midblue transition-colors"
              >
                Sí, acepto
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm text-blue border border-blue hover:bg-blue hover:text-white transition-colors"
              >
                No, gracias
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;