"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Star } from "lucide-react";

const SLIDES = [
  {
    src: "/assets/real/produtos/bahamas-preto-azul/2k/1.png",
    line: "Linha Bahamas",
    headline: "Slide\nPremium",
    sub: "Tiras em borracha de alta resistência, palmilha anatômica e solado antiderrapante.",
    badge: "Lançamento 2025",
    href: "/colecao?linha=bahamas",
    accent: "#FF5F00",
  },
  {
    src: "/assets/real/produtos/toledo-preto-laranja/2k/1.png",
    line: "Linha Toledo",
    headline: "Edição\nLimitada",
    sub: "Solado com tração reforçada, tiras largas e palmilha viscoelástica para máximo conforto.",
    badge: "Últimas unidades",
    href: "/colecao?linha=toledo",
    accent: "#FF5F00",
  },
  {
    src: "/assets/real/produtos/malibu-mel-cafe/2k/1.png",
    line: "Linha Malibú",
    headline: "Sofisticação\nNatural",
    sub: "Design feminino exclusivo com palmilha em espuma de alta densidade e acabamento premium.",
    badge: "7 variações",
    href: "/colecao?linha=malibu",
    accent: "#FF5F00",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-4 py-12 md:flex-row md:min-h-[86vh] md:px-8 md:py-0">

        {/* ── Left: Text content ── */}
        <div className="w-full pb-8 pt-0 md:w-1/2 md:py-20 md:pr-10">
          {/* Slide badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${current}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-light px-3.5 py-1.5 text-xs font-bold text-accent">
                <Star size={11} fill="currentColor" />
                {slide.badge} · {slide.line}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`h1-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display mt-5 whitespace-pre-line text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.9] tracking-tighter text-foreground"
            >
              {slide.headline}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-5 max-w-md text-base text-muted"
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href={slide.href} className="btn-primary gap-2 px-8 py-4">
              Comprar Agora <ArrowRight size={15} />
            </Link>
            <Link href="/colecao" className="btn-secondary px-8 py-4">
              Ver Coleção
            </Link>
          </motion.div>

          {/* Trust stats */}
          <div className="mt-10 flex gap-8 border-t border-border pt-8">
            {[
              { value: "+2.500", label: "clientes satisfeitos" },
              { value: "4.9★", label: "avaliação média" },
              { value: "30 dias", label: "troca grátis" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-xl font-extrabold text-foreground">{value}</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            ))}
          </div>

          {/* Slide dots */}
          <div className="mt-8 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 28 : 8,
                  background: i === current ? "#FF5F00" : "#E9ECEF",
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Product image ── */}
        <div className="relative w-full md:w-1/2 md:min-h-[86vh]">
          {/* Background shape */}
          <div className="absolute inset-0 -right-8 rounded-3xl bg-surface md:rounded-none md:rounded-l-[48px]" />

          <AnimatePresence mode="sync">
            <motion.div
              key={`img-${current}`}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 flex items-center justify-center py-8 md:min-h-[86vh]"
            >
              <Image
                src={slide.src}
                alt={slide.line}
                width={520}
                height={520}
                className="animate-ken-burns relative z-10 h-auto w-full max-w-[400px] object-contain drop-shadow-2xl md:max-w-[480px]"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-4 z-20 hidden rounded-2xl bg-white p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:block"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">Frete grátis acima de</p>
            <p className="text-lg font-extrabold text-foreground">R$ 299,90</p>
            <p className="text-[10px] text-accent font-bold">↑ Válido p/ SEDEX</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
