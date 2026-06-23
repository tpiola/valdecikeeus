"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Lucas M.",
    role: "Jogador de society",
    text: "Comprei a Predator e chegou em 4 dias. A chuteira é original, linda demais. Já fiz dois gols na estreia! O atendimento pelo WhatsApp foi rápido e tiraram todas as minhas dúvidas sobre tamanho.",
    rating: 5,
  },
  {
    name: "Rafael S.",
    role: "Professor de futebol",
    text: "Sempre comprei em loja física, mas resolvi arriscar na Keeus. A Mercurial veio certinha, na caixa original. Preço melhor que shopping e parcelei em 6x. Recomendo de olho fechado.",
    rating: 5,
  },
  {
    name: "André P.",
    role: "Jogador amador de futsal",
    text: "Precisava de uma Umbro Neo pro futsal e encontrei o meu tamanho (40) aqui, coisa que não achava em lugar nenhum. Entrega rápida e produto original. Virei cliente!",
    rating: 5,
  },
];

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Quem compra aprova
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
          Depoimentos reais
        </h2>
        <p className="mt-2 text-sm text-muted">
          Jogadores que confiam na Keeus Chuteiras
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <div
            key={review.name}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <div className="mb-3 flex gap-0.5 text-accent">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-sm font-bold text-foreground">{review.name}</p>
              <p className="text-xs text-muted">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
