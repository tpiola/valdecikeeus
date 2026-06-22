"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

const HERO_SLIDES = [
  {
    src: "/assets/real/produtos/bahamas-preto-azul/2k/1.png",
    label: "Linha Bahamas",
    sub: "Audácia em cada passo",
  },
  {
    src: "/assets/real/produtos/toledo-preto-laranja/2k/1.png",
    label: "Linha Toledo",
    sub: "Edição limitada",
  },
  {
    src: "/assets/real/produtos/malibu-mel-cafe/2k/1.png",
    label: "Linha Malibú",
    sub: "Sofisticação natural",
  },
  {
    src: "/assets/real/produtos/bahamas-cafe-cafe/2k/1.png",
    label: "Bahamas Café",
    sub: "Tonal premium",
  },
  {
    src: "/assets/real/produtos/toledo-cafe-cafe/2k/1.png",
    label: "Toledo Café",
    sub: "Elegância clássica",
  },
];

export default function CinematicHero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative flex h-screen min-h-[700px] items-end overflow-hidden bg-[#050506]">
      {/* ── Background Cinematic Slideshow ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.14 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              priority
              className="object-contain object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050506] via-[#050506]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050506]/60 via-transparent to-[#050506]/60" />

        {/* Film grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 w-full px-6 pb-20 md:px-16 md:pb-28">
        {/* Slide label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`label-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.5em] text-[#d8ff4f]"
          >
            {slide.label} · {slide.sub}
          </motion.p>
        </AnimatePresence>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.5rem,12vw,9rem)] font-black uppercase leading-[0.88] tracking-tighter text-white"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-lg text-base text-white/60 md:text-lg"
        >
          Chinelos premium com visualização 360° — design, conforto e atitude em cada par.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/colecao"
            className="group relative overflow-hidden rounded-full bg-[#d8ff4f] px-10 py-4 text-xs font-black uppercase tracking-widest text-[#050506] transition-transform hover:scale-105"
          >
            <span className="relative z-10">Ver Coleção</span>
            <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
          <Link
            href="/colecao?filtro=lancamentos"
            className="rounded-full border border-white/20 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm transition-all hover:border-[#d8ff4f] hover:text-[#d8ff4f]"
          >
            Lançamentos
          </Link>
        </motion.div>

        {/* Slide indicators */}
        <div className="mt-10 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i); }}
              className="group h-[2px] overflow-hidden rounded-full bg-white/20 transition-all"
              style={{ width: i === current ? 40 : 16 }}
              aria-label={`Slide ${i + 1}`}
            >
              {i === current && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full w-full origin-left bg-[#d8ff4f]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Scroll</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
