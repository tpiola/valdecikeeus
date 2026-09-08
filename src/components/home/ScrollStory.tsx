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

const FRAMES = [
  {
    productSlug: "toledo-preto-laranja",
    video: { mp4: "/videos/hero-toledo.mp4", webm: "/videos/hero-toledo.webm" },
    eyebrow: "Na rua",
    title: "Slide firme o dia inteiro",
    copy: "Faixa larga, palmilha anatômica, solado que aguenta. Do café da manhã ao fim da tarde sem trocar o pé.",
  },
  {
    productSlug: "malibu-mel-cafe",
    video: { mp4: "/videos/story-malibu.mp4", webm: "/videos/story-malibu.webm" },
    eyebrow: "Na praia",
    title: "Chinelo de dedo que seca rápido",
    copy: "Leve, flexível e sem firula. Sai da água, seca na sombra, volta pra mesa.",
  },
  {
    productSlug: "bahamas-cafe-cafe",
    video: {
      mp4: "/videos/story-bahamas.mp4",
      webm: "/videos/story-bahamas.webm",
    },
    eyebrow: "Em casa",
    title: "O par que some no dia a dia",
    copy: "Café com café: discreto, confortável, combina com roupa clara e escura.",
  },
] as const;

/**
 * Scroll storytelling — pin/reveal com clips ken-burns das fotos reais.
 */
export default function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-[#f6f3ef]">
      <div className="sticky top-0 z-[1] h-[min(100svh,920px)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-stone-200/80">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-[#FF5F1F]"
          />
        </div>

        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-16 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e04e0e]">
            Do pé ao lugar
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl">
            Um chinelo pra cada momento — sem discurso vazio.
          </h2>

          <div className="relative mt-10 min-h-[340px] md:mt-12 md:min-h-[400px]">
            {FRAMES.map((frame, i) => (
              <StoryFrame
                key={frame.productSlug}
                index={i}
                total={FRAMES.length}
                progress={scrollYProgress}
                reduceMotion={!!reduceMotion}
                {...frame}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-[220vh]" aria-hidden />
    </section>
  );
}

function StoryFrame({
  index,
  total,
  progress,
  reduceMotion,
  productSlug,
  video,
  eyebrow,
  title,
  copy,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
  productSlug: string;
  video: { mp4: string; webm: string };
  eyebrow: string;
  title: string;
  copy: string;
}) {
  const product = PRODUCTS.find((p) => p.slug === productSlug) ?? PRODUCTS[0];
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    progress,
    [start, mid - 0.02, mid + 0.02, end],
    reduceMotion
      ? [index === 0 ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0]
      : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, mid, end],
    reduceMotion ? [0, 0, 0] : [28, 0, -28]
  );
  const scale = useTransform(
    progress,
    [start, mid, end],
    reduceMotion ? [1, 1, 1] : [0.96, 1, 0.98]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10"
    >
      <motion.div
        style={{ scale }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-24px_rgba(26,26,26,0.35)] md:aspect-square"
      >
        <LazyVideo
          mp4={video.mp4}
          webm={video.webm}
          poster={product.image}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      <div className="max-w-md">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5F1F]">
          {eyebrow}
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold text-stone-900 md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
          {copy}
        </p>
        <Link
          href={`/produto/${product.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-stone-900 transition-colors hover:text-[#e04e0e]"
        >
          Ver {product.name}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}
