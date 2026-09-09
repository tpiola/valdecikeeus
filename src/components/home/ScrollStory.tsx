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
    video: {
      mp4: "/videos/story-toledo-rua.mp4",
      webm: "/videos/story-toledo-rua.webm",
      poster: "/videos/posters/story-toledo-rua.webp",
    },
    eyebrow: "Na rua",
    title: "Slide firme o dia inteiro",
    copy: "Faixa larga, palmilha anatômica, solado que aguenta. Do café da manhã ao fim da tarde sem trocar o pé.",
  },
  {
    productSlug: "malibu-mel-cafe",
    video: {
      mp4: "/videos/story-malibu.mp4",
      webm: "/videos/story-malibu.webm",
      poster: "/videos/posters/story-malibu.webp",
    },
    eyebrow: "Na praia",
    title: "Chinelo de dedo que seca rápido",
    copy: "Leve e flexível. Sai da água, seca na sombra, volta pra mesa.",
  },
  {
    productSlug: "bahamas-cafe-cafe",
    video: {
      mp4: "/videos/story-bahamas.mp4",
      webm: "/videos/story-bahamas.webm",
      poster: "/videos/posters/story-bahamas.webp",
    },
    eyebrow: "Em casa",
    title: "O par que some no dia a dia",
    copy: "Café com café: discreto, confortável, combina com roupa clara e escura.",
  },
] as const;

type Frame = (typeof FRAMES)[number];

function StoryCopy({
  productSlug,
  eyebrow,
  title,
  copy,
}: Pick<Frame, "productSlug" | "eyebrow" | "title" | "copy">) {
  const product = PRODUCTS.find((p) => p.slug === productSlug) ?? PRODUCTS[0];
  return (
    <div className="max-w-md">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5F1F]">
        {eyebrow}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
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
  );
}

function StoryMedia({
  productSlug,
  video,
  scale,
}: {
  productSlug: string;
  video: Frame["video"];
  scale?: ReturnType<typeof useTransform<number, number>>;
}) {
  const inner = (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_24px_50px_-24px_rgba(26,26,26,0.35)] md:aspect-square">
      <LazyVideo
        mp4={video.mp4}
        webm={video.webm}
        poster={video.poster}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
  if (!scale) return inner;
  return <motion.div style={{ scale }}>{inner}</motion.div>;
}

/**
 * Mobile: stack vertical (sem absolute overlap).
 * Desktop: sticky pin + crossfade; sticky top = --header-offset.
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
      {/* Mobile — stack limpo */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:hidden">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e04e0e]">
          Do pé ao lugar
        </p>
        <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-stone-900">
          Um par pra cada momento.
        </h2>
        <div className="mt-10 flex flex-col gap-14">
          {FRAMES.map((frame) => (
            <div key={frame.productSlug} className="flex flex-col gap-6">
              <StoryMedia
                productSlug={frame.productSlug}
                video={frame.video}
              />
              <StoryCopy
                productSlug={frame.productSlug}
                eyebrow={frame.eyebrow}
                title={frame.title}
                copy={frame.copy}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop — sticky pin */}
      <div className="relative hidden md:block">
        <div
          className="sticky z-[1] h-[min(88svh,780px)] overflow-hidden"
          style={{ top: "var(--header-offset)" }}
        >
          <div className="absolute inset-x-0 top-0 z-20 h-0.5 bg-stone-200/80">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-[#FF5F1F]"
            />
          </div>

          <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-8 py-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e04e0e]">
              Do pé ao lugar
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
              Um par pra cada momento.
            </h2>

            <div className="relative mt-12 min-h-[400px]">
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

        <div className="h-[160vh]" aria-hidden />
      </div>
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
} & Frame) {
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
      className="absolute inset-0 grid grid-cols-2 items-center gap-10"
    >
      <StoryMedia productSlug={productSlug} video={video} scale={scale} />
      <StoryCopy
        productSlug={productSlug}
        eyebrow={eyebrow}
        title={title}
        copy={copy}
      />
    </motion.div>
  );
}
