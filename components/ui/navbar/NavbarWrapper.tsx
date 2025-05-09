"use client";

import { useEffect } from "react";
import Navbar from "./Navbar";

/**
 * Este wrapper añade un debounce para almacenar en dataset el valor del scroll
 * (p.ej. document.documentElement.dataset.scroll = "123")
 * que luego podría usarse en CSS para estilos condicionales.
 */
export default function NavbarWrapper() {
  useEffect(() => {
    const debounce = (fn: Function) => {
      let frame: number;
      return (...params: any[]) => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => fn(...params));
      };
    };

    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY.toString();
    };

    const debouncedStoreScroll = debounce(storeScroll);
    document.addEventListener("scroll", debouncedStoreScroll, { passive: true });
    storeScroll();

    return () => {
      document.removeEventListener("scroll", debouncedStoreScroll);
    };
  }, []);

  return <Navbar />;
}
