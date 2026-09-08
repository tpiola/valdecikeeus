"use client";

import Link from "next/link";
import Image from "next/image";
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
 * Hero cinematográfico: vídeo ken-burns gerado das fotos reais + parallax.
 * Sem marquee de palavras / gimmicks de startup.
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

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 80]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduceMotion ? 1 : 1.06]
  );
  const glowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.15]);
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : 36]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f0f0f] text-white"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[#FF5F1F]/35 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#FF5F1F]/15 blur-[80px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 md:grid-cols-2 md:gap-12 md:px-8 md:py-20 lg:py-24">
        <motion.div style={{ y: textY }} className="order-2 md:order-1">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-bold uppercase tracking-[0.22em] text-[#FF5F1F]"
          >
            Slide e chinelo de dedo
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl"
          >
            Chinelo Keeus.
            <br />
            Feito pro seu pé.
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/70"
          >
            Slides e chinelos de dedo com foto real, numeração clara e kits
            prontos. Escolha o tamanho, pague com Pix ou cartão.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/colecao"
              className="group inline-flex items-center gap-2 rounded-full bg-[#ff5f1f] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e04e0e] hover:shadow-[0_10px_24px_-8px_rgba(255,95,31,0.5)] hover:-translate-y-0.5"
            >
              Comprar agora
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
            <Link
              href="/colecao?categoria=kits"
              className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:-translate-y-0.5"
            >
              Ver kits
            </Link>
          </motion.div>
          <motion.ul
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm text-white/65"
          >
            <li>
              <strong className="font-bold text-white">13</strong> itens
            </li>
            <li>
              <strong className="font-bold text-white">34–45</strong> numerações
            </li>
            <li>
              <strong className="font-bold text-white">Kits</strong> viagem &amp;
              presente
            </li>
          </motion.ul>
        </motion.div>

        <div className="order-1 md:order-2">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    clipPath: "inset(12% 18% 12% 18% round 1.5rem)",
                    opacity: 0.6,
                  }
            }
            animate={{
              clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
              opacity: 1,
            }}
            transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0c0c0c] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] md:aspect-square"
            >
              <LazyVideo
                mp4="/videos/hero-toledo.mp4"
                webm="/videos/hero-toledo.webm"
                poster={heroProduct.image}
                lazy={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Fallback still for SEO / first paint */}
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="pointer-events-none object-contain p-10 opacity-0"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-stone-800 shadow-sm">
                {heroProduct.name}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
