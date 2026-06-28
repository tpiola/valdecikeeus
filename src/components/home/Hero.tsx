"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Star, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Premium gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-orange-100/60" />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 60%, #FF5F1F 0%, transparent 55%), radial-gradient(circle at 75% 30%, #FF5F1F 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center px-4 py-8 md:flex-row md:min-h-[85vh] md:px-8 md:py-0 relative z-10">
        {/* ── Left: Text content ── */}
        <div className="w-full pb-6 pt-4 md:w-1/2 md:py-24 md:pr-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#FF5F1F]">
              Coleção Verão 2026 — Frete Grátis
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mt-6 text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-stone-900"
          >
            <span className="block">O Conforto Que</span>
            <span className="block text-[#FF5F1F]">Seus Pés Merecem</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 max-w-md text-base leading-relaxed text-stone-500"
          >
            Chinelos premium com design exclusivo, palmilha anatômica e o estilo que transforma seus dias de sol. Da praia ao seu dia a dia.
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
              className="inline-flex items-center gap-2 rounded-full bg-[#FF5F1F] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Comprar Agora <ArrowRight size={16} />
            </Link>
            <Link
              href="/sobre"
              className="inline-flex items-center rounded-full border border-stone-200 px-8 py-4 text-sm font-semibold text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50"
            >
              Nossa História
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex gap-8 border-t border-stone-100 pt-8"
          >
            {[
              { value: "Frete Grátis", label: "Todo Brasil", icon: Truck },
              { value: "+5.000", label: "Clientes", icon: Star },
              { value: "30 Dias", label: "Garantia", icon: Shield },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon size={18} className="mt-0.5 shrink-0 text-[#FF5F1F]" />
                <div>
                  <p className="text-sm font-bold text-stone-900">{value}</p>
                  <p className="text-[11px] text-stone-400">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Real product image ── */}
        <div className="relative w-full md:w-1/2 md:min-h-[85vh] md:pl-8">
          {/* Background shape */}
          <div className="absolute -inset-4 -right-8 rounded-[48px] bg-orange-50/80" />

          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-80 w-80 rounded-full bg-[#FF5F1F] opacity-[0.06] blur-3xl"
            />
          </div>

          {/* Real Product Image */}
          <div className="relative z-10 flex items-center justify-center py-12 md:min-h-[85vh]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="relative mx-auto w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
                  <Image
                    src="/assets/real/produtos/toledo-preto-laranja/2k/1.png"
                    alt="Keeus Toledo Preto Laranja"
                    fill
                    className="object-contain drop-shadow-[0_12px_40px_rgba(255,95,31,0.15)]"
                    priority
                    sizes="(max-width: 768px) 350px, 450px"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating info card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-12 left-6 z-20 hidden rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-sm md:block"
          >
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              <Truck size={14} className="text-[#FF5F1F]" />
              Entrega Expressa
            </p>
            <p className="mt-0.5 text-lg font-bold text-stone-900">Brasil Todo</p>
            <p className="text-[10px] font-bold text-[#FF5F1F]">Frete Grátis</p>
          </motion.div>

          {/* Price card */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            className="absolute top-16 right-4 z-20 hidden rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-sm md:block"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">A partir de</p>
            <p className="mt-0.5 text-xl font-black text-stone-900">R$ 139</p>
            <p className="text-[10px] font-bold text-[#FF5F1F]">ou 4x sem juros</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
