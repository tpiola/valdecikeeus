"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Star, BookOpen, Clock, Users, Award } from "lucide-react";

const SLIDES = [
  {
    line: "Desenvolvimento Web",
    headline: "Domine\nFrontend",
    sub: "React, TypeScript e Next.js do zero ao avançado com projetos reais e suporte individualizado.",
    badge: "Mais vendido",
    href: "/cursos?categoria=frontend",
    accent: "#FF5F00",
    icon: "⚛️",
  },
  {
    line: "Ciência de Dados",
    headline: "Python\n& Dados",
    sub: "Pandas, NumPy, Machine Learning e projetos com datasets reais. Certificado incluso.",
    badge: "Nova turma",
    href: "/cursos?categoria=dados",
    accent: "#FF5F00",
    icon: "🐍",
  },
  {
    line: "DevOps & Cloud",
    headline: "Infra\nEscalável",
    sub: "Docker, Kubernetes, AWS e CI/CD. Domine a stack de infraestrutura mais demandada do mercado.",
    badge: "4.9 ★",
    href: "/cursos?categoria=devops",
    accent: "#FF5F00",
    icon: "☁️",
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
              Ver Cursos <ArrowRight size={15} />
            </Link>
            <Link href="/cursos" className="btn-secondary px-8 py-4">
              Catálogo Completo
            </Link>
          </motion.div>

          {/* Trust stats */}
          <div className="mt-10 flex gap-8 border-t border-border pt-8">
            {[
              { value: "+15.000", label: "alunos" },
              { value: "4.9★", label: "avaliação média" },
              { value: "7 dias", label: "garantia" },
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

        {/* ── Right: Course icon / visual ── */}
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
              <div className="flex flex-col items-center gap-4">
                <span className="text-[120px] leading-none select-none">{slide.icon}</span>
                <span className="text-sm font-bold text-muted uppercase tracking-widest">
                  {slide.line}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-4 z-20 hidden rounded-2xl bg-white p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] md:block"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
              <Award size={14} className="inline mr-1" />
              Certificado
            </p>
            <p className="text-lg font-extrabold text-foreground">Incluso</p>
            <p className="text-[10px] text-accent font-bold">↑ Em todos os cursos</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
