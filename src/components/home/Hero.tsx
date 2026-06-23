"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Truck, Star, Shield } from "lucide-react";

const FLOATING_PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 4 + Math.random() * 6,
  size: 6 + Math.random() * 14,
  emoji: ["⚽", "⚽", "✨", "💚", "⚡"][Math.floor(Math.random() * 5)],
}));

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A1A0A] to-[#05220A]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(0,255,65,0.08) 0%, transparent 60%), radial-gradient(circle at 70% 20%, rgba(57,255,20,0.05) 0%, transparent 50%)",
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {FLOATING_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bottom-0"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
            }}
            initial={{ y: "0vh", opacity: 0, rotate: 0 }}
            animate={{
              y: "-100vh",
              opacity: [0, 0.7, 0.7, 0],
              rotate: 360,
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-4 py-12 md:flex-row md:min-h-[86vh] md:px-8 md:py-0 relative z-10">

        {/* ── Left: Text content ── */}
        <div className="w-full pb-8 pt-4 md:w-1/2 md:py-20 md:pr-10">
          {/* Badge "Frete Grátis Brasil" com glow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-4 py-1.5 text-xs font-bold neon-text backdrop-blur-sm">
              <Truck size={12} className="text-accent" />
              Frete Grátis Brasil
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tighter"
          >
            <span className="block text-foreground">CHUTEIRAS</span>
            <span className="block neon-text">PREMIUM</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-md text-base text-muted leading-relaxed"
          >
            Domine o campo com estilo. As melhores chuteiras para campo, society e futsal. Tecnologia de ponta para o seu futebol.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link href="/colecao" className="btn-neon gap-2 px-8 py-4 text-sm">
              Ver Coleção <ArrowRight size={16} />
            </Link>
            <Link href="/colecao" className="btn-secondary px-8 py-4">
              Explorar Modelos
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex gap-8 border-t border-border pt-8"
          >
            {[
              { value: "Frete Grátis", label: "Todo Brasil", icon: Truck },
              { value: "+5.000", label: "Clientes satisfeitos", icon: Star },
              { value: "7 dias", label: "Garantia de troca", icon: Shield },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-extrabold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Boot mockup visual ── */}
        <div className="relative w-full md:w-1/2 md:min-h-[86vh]">
          {/* Background shape */}
          <div className="absolute inset-0 -right-8 rounded-3xl bg-surface md:rounded-none md:rounded-l-[48px]" />

          {/* Glow circle behind boot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-80 h-80 rounded-full bg-accent opacity-10 blur-3xl"
            />
          </div>

          {/* Spinning boot mockup */}
          <div className="relative z-10 flex items-center justify-center py-12 md:min-h-[86vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              {/* Boot SVG / Emoji representation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[140px] leading-none select-none filter drop-shadow-[0_0_40px_rgba(0,255,65,0.3)]"
              >
                ⚽
              </motion.div>

              {/* Boot image placeholder */}
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-0 text-[80px] leading-none select-none filter drop-shadow-[0_0_30px_rgba(0,255,65,0.25)]"
              >
                👟
              </motion.div>

              <motion.div
                animate={{ rotate: [0, -3, 0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-10 top-4 text-[72px] leading-none select-none filter drop-shadow-[0_0_25px_rgba(0,255,65,0.2)]"
              >
                👟
              </motion.div>
            </motion.div>
          </div>

          {/* Floating badge card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-4 z-20 hidden rounded-2xl bg-surface border border-border p-3.5 shadow-[0_8px_32px_rgba(0,255,65,0.08)] md:block glow-card"
            style={{ animation: "none" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              <Truck size={14} className="inline mr-1 text-accent" />
              Entrega Expressa
            </p>
            <p className="text-lg font-extrabold text-foreground">Brasil Todo</p>
            <p className="text-[10px] text-accent font-bold">↑ Frete Grátis</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
