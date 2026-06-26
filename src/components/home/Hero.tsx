"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Star, Shield, Sun } from "lucide-react";

const FLOATING_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 5,
  size: 8 + Math.random() * 12,
  emoji: ["🌊", "☀️", "🩴", "🌴", "🧡"][Math.floor(Math.random() * 5)],
}));

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Sunset gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFF5EE] to-[#FFE8D6]" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 60%, rgba(255,95,31,0.15) 0%, transparent 55%), radial-gradient(circle at 75% 30%, rgba(245,158,11,0.12) 0%, transparent 50%)",
          }}
        />
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
              opacity: [0, 0.6, 0.6, 0],
              rotate: 180,
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

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-4 py-10 md:flex-row md:min-h-[80vh] md:px-8 md:py-0 relative z-10">
        {/* ── Left: Text content ── */}
        <div className="w-full pb-6 pt-4 md:w-1/2 md:py-20 md:pr-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-light border border-accent/20 px-4 py-1.5 text-xs font-bold text-accent">
              <Sun size={14} />
              Coleção Verão 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mt-5 text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="block text-foreground">O VERÃO</span>
            <span className="block text-accent">COMEÇA AQUI</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 max-w-md text-base text-foreground-mid leading-relaxed"
          >
            Chinelos premium com design exclusivo, conforto superior e o estilo que transforma seus dias de sol. Do beach club ao pôr do sol.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href="/colecao"
              className="btn-primary rounded-full gap-2 px-8 py-4 text-sm shadow-lg shadow-accent/20"
            >
              Ver Coleção <ArrowRight size={16} />
            </Link>
            <Link href="/sobre" className="btn-outline px-8 py-4 text-sm">
              Nossa História
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
              { value: "30 dias", label: "Garantia de troca", icon: Shield },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-start gap-2">
                <Icon size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Visual ── */}
        <div className="relative w-full md:w-1/2 md:min-h-[80vh]">
          {/* Background shape */}
          <div className="absolute inset-0 -right-8 rounded-3xl bg-surface md:rounded-none md:rounded-l-[48px]" />

          {/* Glow circle behind */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.15, 0.22, 0.15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-80 h-80 rounded-full bg-accent opacity-10 blur-3xl"
            />
          </div>

          {/* Floating chinelo visual */}
          <div className="relative z-10 flex items-center justify-center py-12 md:min-h-[80vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              {/* Main */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[140px] leading-none select-none"
                style={{ filter: "drop-shadow(0 8px 32px rgba(255,95,31,0.15))" }}
              >
                🩴
              </motion.div>

              {/* Side chinelos */}
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 top-2 text-[80px] leading-none select-none"
                style={{ filter: "drop-shadow(0 4px 16px rgba(255,95,31,0.12))" }}
              >
                🩴
              </motion.div>

              <motion.div
                animate={{ rotate: [0, -3, 0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-8 top-4 text-[72px] leading-none select-none"
                style={{ filter: "drop-shadow(0 4px 12px rgba(255,95,31,0.1))" }}
              >
                🩴
              </motion.div>
            </motion.div>
          </div>

          {/* Floating badge card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-4 z-20 hidden rounded-2xl bg-white border border-border p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] md:block"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted flex items-center gap-1.5">
              <Truck size={14} className="text-accent" />
              Entrega Expressa
            </p>
            <p className="text-lg font-extrabold text-foreground mt-0.5">Brasil Todo</p>
            <p className="text-[10px] text-accent font-bold">↑ Frete Grátis</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
