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
 * Hero editorial — vídeo ken-burns suave + tipografia clara no fundo escuro.
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

  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 48]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 24]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f0f0f] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/4 h-[360px] w-[360px] rounded-full bg-[#FF5F1F]/25 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-14 md:px-8 md:py-24">
        <motion.div style={{ y: textY }} className="order-2 md:order-1">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF5F1F]"
          >
            Slide e chinelo de dedo
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight !text-white md:text-6xl"
            style={{ color: "#ffffff" }}
          >
            Chinelo Keeus.
            <br />
            Feito pro seu pé.
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/70"
          >
            Fotos reais, numeração conforme o modelo e frete cotado pelo CEP. Pix ou cartão no checkout.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link
              href="/colecao"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ff5f1f] px-7 text-sm font-bold text-white transition hover:bg-[#e04e0e]"
            >
              Comprar agora
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/colecao?categoria=kits"
              className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-7 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Ver kits
            </Link>
          </motion.div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/15 pt-6 text-sm text-white/65">
            <li>
              <strong className="font-semibold text-white">13</strong> itens
            </li>
            <li>
              <strong className="font-semibold text-white">Por modelo</strong> numeração
            </li>
            <li>
              <strong className="font-semibold text-white">Pix e cartão</strong>
            </li>
          </ul>
        </motion.div>

        <div className="order-1 md:order-2">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0.7, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0c0c0c] md:aspect-square"
            >
              <LazyVideo
                mp4="/videos/hero-toledo.mp4"
                webm="/videos/hero-toledo.webm"
                poster={heroProduct.image}
                lazy={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-stone-800">
                {heroProduct.name}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
