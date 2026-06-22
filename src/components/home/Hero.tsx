"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[640px] items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <video
          className="h-full w-full scale-105 object-cover opacity-70"
          autoPlay
          muted
          loop
          playsInline
          poster="/products/hero/poster.jpg"
        >
          <source src="/products/hero/loop.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.5em] text-accent"
        >
          Tecnologia de ajuste por IA
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl font-bold uppercase leading-none tracking-tight md:text-9xl"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-md text-sm text-muted md:text-base"
        >
          {SITE.tagline}. Visualização 360°, frete em tempo real e o ajuste
          perfeito recomendado por inteligência artificial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/colecao"
            className="w-full rounded-full bg-accent px-10 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 sm:w-auto"
          >
            Explorar Coleção
          </Link>
          <Link
            href="/colecao?filtro=lancamentos"
            className="w-full rounded-full border border-foreground/30 px-10 py-4 text-xs font-bold uppercase tracking-widest transition-colors hover:border-accent hover:text-accent sm:w-auto"
          >
            Ver Lançamentos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
