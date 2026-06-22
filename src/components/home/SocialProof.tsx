"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Carla M.",
    city: "São Paulo, SP",
    text: "Pedi pelo tamanho recomendado pela IA do site e foi o primeiro tênis que comprei online e não precisei trocar.",
  },
  {
    name: "Rafael T.",
    city: "Belo Horizonte, MG",
    text: "A visualização 360° realmente ajuda a entender o caimento antes de comprar. Chegou em 3 dias.",
  },
  {
    name: "Juliana P.",
    city: "Curitiba, PR",
    text: "Comprei o Aero Slip e o desconto no Pix foi um diferencial. Recomendo demais.",
  },
];

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Prova social
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
          Quem usa, recomenda
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <div
            key={review.name}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <div className="mb-3 flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm text-foreground/90">&ldquo;{review.text}&rdquo;</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">
              {review.name} — {review.city}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
