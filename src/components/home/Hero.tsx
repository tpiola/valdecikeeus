"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import LazyVideo from "@/components/ui/LazyVideo";

/**
 * Hero cinematic — full-bleed ken-burns + tipografia editorial.
 * Nike/Apple energy: quiet, alive, purchase-forward. No AI gimmicks.
 */
export default function Hero() {
  const heroProduct =
    PRODUCTS.find((p) => p.slug === "toledo-preto-laranja") ?? PRODUCTS[0];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 80]
  );
  const mediaScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 1.08]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 36]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1, reduceMotion ? 1 : 0.35]
  );
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [0.55, reduceMotion ? 0.55 : 0.78]
  );

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="hero-cinematic relative isolate min-h-[min(92vh,920px)] overflow-hidden bg-[#0a0a0a] text-white"
      aria-label="Keeus — chinelo e slide"
    >
      {/* Full-bleed media */}
      <motion.div
        aria-hidden
        style={{ y: mediaY, scale: mediaScale }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 overflow-hidden">
          <LazyVideo
            mp4="/videos/hero-toledo.mp4"
            webm="/videos/hero-toledo.webm"
            poster={heroProduct.image}
            lazy={false}
            className={`absolute inset-0 h-full w-full object-cover ${
              reduceMotion ? "" : "animate-ken-burns"
            }`}
          />
        </div>
      </motion.div>

      {/* Editorial veils — legibility without killing the film */}
      <motion.div
        aria-hidden
        style={{ opacity: veilOpacity }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FF5F1F]/18 blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[min(92vh,920px)] max-w-7xl flex-col justify-end px-4 pb-14 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-32">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="max-w-2xl"
        >
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FF5F1F]"
          >
            Slide e chinelo de dedo
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease }}
            className="mt-5 font-display text-[clamp(2.6rem,8vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white"
          >
            O pé encontra
            <br />
            o par certo.
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease }}
            className="mt-6 max-w-md text-base leading-relaxed text-white/72 md:text-lg"
          >
            Fotos reais. Numeração por modelo. Frete cotado pelo CEP.
            Pix ou cartão no checkout — sem surpresa na hora de pagar.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/colecao"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#FF5F1F] px-8 text-sm font-bold text-white shadow-[0_12px_40px_-12px_rgba(255,95,31,0.65)] transition hover:bg-[#E04E0E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Comprar agora
              <span aria-hidden className="translate-y-px">
                →
              </span>
            </Link>
            <Link
              href={`/produto/${heroProduct.slug}`}
              className="inline-flex min-h-12 items-center rounded-full border border-white/35 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/10"
            >
              Ver {heroProduct.name.replace(/^Keeus\s+/i, "")}
            </Link>
          </motion.div>

          <motion.ul
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-[13px] text-white/60"
          >
            <li>
              <span className="font-semibold text-white">
                {PRODUCTS.length}
              </span>{" "}
              modelos
            </li>
            <li>
              <span className="font-semibold text-white">Pix e cartão</span>
            </li>
            <li>
              <span className="font-semibold text-white">Frete pelo CEP</span>
            </li>
          </motion.ul>
        </motion.div>

        {/* Quiet product cue — bottom right on desktop */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pointer-events-none absolute bottom-8 right-4 hidden max-w-[11rem] text-right md:bottom-12 md:right-8 md:block"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
            Em destaque
          </p>
          <p className="mt-1 text-sm font-medium text-white/85">
            {heroProduct.name}
          </p>
        </motion.div>
      </div>

      {/* Soft bottom mask into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0a0a0a]/40 md:h-24"
      />
    </section>
  );
}
