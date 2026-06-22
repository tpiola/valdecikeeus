"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Play, ArrowRight } from "lucide-react";

const SHOWCASE_LINES = [
  {
    id: "bahamas",
    name: "Linha Bahamas",
    tagline: "Slide premium · versatilidade sem limites",
    description:
      "Tiras em borracha de alta resistência, palmilha anatômica e solado antiderrapante. A escolha de quem vive em movimento sem abrir mão do estilo.",
    images: [
      "/assets/real/produtos/bahamas-preto-azul/2k/1.png",
      "/assets/real/produtos/bahamas-cafe-cafe/2k/1.png",
      "/assets/real/produtos/bahamas-preto-preto/2k/1.png",
      "/assets/real/produtos/bahamas-preto-azul/2k/2.png",
    ],
    accent: "#3b6bcf",
    href: "/colecao?linha=bahamas",
    badge: "3 Cores",
  },
  {
    id: "toledo",
    name: "Linha Toledo",
    tagline: "Potência masculina · edição limitada",
    description:
      "Desenvolvido para quem exige mais. Solado com tração reforçada, tiras largas e palmilha viscoelástica. Toledo é conforto de dia, estilo de noite.",
    images: [
      "/assets/real/produtos/toledo-preto-laranja/2k/1.png",
      "/assets/real/produtos/toledo-cafe-cafe/2k/1.png",
      "/assets/real/produtos/toledo-preto-preto/2k/1.png",
      "/assets/real/produtos/toledo-preto-laranja/2k/2.png",
    ],
    accent: "#ff6a00",
    href: "/colecao?linha=toledo",
    badge: "Ed. Limitada",
  },
  {
    id: "malibu",
    name: "Linha Malibú",
    tagline: "Feminilidade · sofisticação natural",
    description:
      "Criada para mulheres que valorizam cada detalhe. Palmilha em espuma de alta densidade, tiras com textura premium e estética minimalista. Conforto que não abre mão do charme.",
    images: [
      "/assets/real/produtos/malibu-mel-cafe/2k/1.png",
      "/assets/real/produtos/malibu-preto-preto/2k/1.png",
      "/assets/real/produtos/malibu-cafe-cafe/2k/1.png",
      "/assets/real/produtos/malibu-mel-cafe/2k/2.png",
    ],
    accent: "#d4a855",
    href: "/colecao?linha=malibu",
    badge: "7 Variações",
  },
];

function ShowcaseCard({
  line,
  isActive,
  onClick,
}: {
  line: typeof SHOWCASE_LINES[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setInterval(() => {
      setImgIndex((i) => (i + 1) % line.images.length);
    }, 2200);
    return () => clearInterval(t);
  }, [isActive, line.images.length]);

  return (
    <motion.div
      layout
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden rounded-2xl"
      style={{
        flex: isActive ? 3 : 1,
        transition: "flex 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Image */}
      <div className="relative h-[500px] w-full md:h-[620px]">
        <AnimatePresence mode="sync">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={line.images[imgIndex]}
              alt={line.name}
              fill
              className="object-contain object-center"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
          style={{
            background: `linear-gradient(to top, ${line.accent}22 0%, rgba(0,0,0,0.8) 40%, transparent 100%)`,
          }}
        />

        {/* Play button (shows when not active) */}
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Play size={22} className="text-white ml-1" fill="white" />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {/* Badge */}
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
            style={{ background: `${line.accent}22`, color: line.accent, border: `1px solid ${line.accent}44` }}
          >
            {line.badge}
          </span>

          <h3 className="font-display text-xl font-black uppercase tracking-tight text-white md:text-2xl">
            {line.name}
          </h3>
          <p className="text-xs text-white/60">{line.tagline}</p>

          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mt-3 text-sm text-white/70">{line.description}</p>
                <Link
                  href={line.href}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:gap-3"
                  style={{ background: line.accent, color: "#050506" }}
                >
                  Ver Coleção <ArrowRight size={14} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image dots */}
          {isActive && (
            <div className="mt-4 flex gap-1.5">
              {line.images.map((_, i) => (
                <div
                  key={i}
                  className="h-[2px] rounded-full transition-all"
                  style={{
                    width: i === imgIndex ? 24 : 8,
                    background: i === imgIndex ? line.accent : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductVideoShowcase() {
  const [activeId, setActiveId] = useState("bahamas");

  return (
    <section className="bg-[#050506] px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.5em] text-[#d8ff4f]">
              Nossas linhas
            </p>
            <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
              Coleção
              <br />
              <span className="text-white/30">Keeus 2025</span>
            </h2>
          </div>
          <Link
            href="/colecao"
            className="hidden items-center gap-2 text-sm font-bold text-white/50 transition-colors hover:text-white md:flex"
          >
            Ver tudo <ArrowRight size={16} />
          </Link>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4 md:flex-row">
          {SHOWCASE_LINES.map((line) => (
            <ShowcaseCard
              key={line.id}
              line={line}
              isActive={activeId === line.id}
              onClick={() => setActiveId(line.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
