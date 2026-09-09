"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";

/**
 * Botão flutuante "voltar ao topo" — aparece após rolar ~1 viewport.
 * Leva de volta ao header/menu com scroll suave. Some ao chegar perto do topo.
 * Acessível: aria-label + foco visível. Respeita prefers-reduced-motion.
 */
export default function BackToTop() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Voltar ao topo e ver o menu"
      title="Voltar ao topo"
      className={`back-to-top-btn fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white/95 text-stone-700 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-300 hover:border-[#FF5F1F] hover:text-[#FF5F1F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F1F] md:bottom-6 md:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.2} aria-hidden />
    </button>
  );
}
