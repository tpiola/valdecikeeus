"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";

// Tabela brasileira padrão de calçados: número ≈ (comprimento do pé + folga) ÷ 0,667
function numeroParaCm(cm: number): number {
  return Math.round((cm + 1.5) / 0.667);
}

export default function SizeFinder({ sizes }: { sizes: number[] }) {
  const [footLength, setFootLength] = useState("");
  const [recommended, setRecommended] = useState<number | null>(null);

  const calculate = () => {
    const cm = parseFloat(footLength.replace(",", "."));
    if (isNaN(cm) || cm <= 0) return;
    const alvo = numeroParaCm(cm);
    const maisProximo = sizes.reduce((best, size) =>
      Math.abs(size - alvo) < Math.abs(best - alvo) ? size : best
    );
    setRecommended(maisProximo);
  };

  return (
    <div className="rounded-xl border border-accent/30 bg-accent-light p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
        <Ruler size={14} />
        Não sabe seu número?
      </div>
      <p className="mb-4 text-xs leading-5 text-muted">
        Meça do calcanhar à ponta do dedão, com o pé no chão. Digite a medida
        em centímetros e a gente indica o tamanho certo deste modelo.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={footLength}
          onChange={(e) => setFootLength(e.target.value)}
          placeholder="Comprimento do pé (cm)"
          inputMode="decimal"
          aria-label="Comprimento do pé em centímetros"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={calculate}
          className="rounded-md bg-accent px-5 py-2 text-xs font-bold uppercase text-accent-fore hover:bg-accent-hover"
        >
          Ver tamanho
        </button>
      </div>

      {recommended && (
        <p className="mt-4 text-sm text-foreground/80">
          Pelo comprimento que você informou, o número deste modelo é{" "}
          <span className="font-display text-lg text-accent">{recommended}</span>.
          Entre dois números, prefira o maior.
        </p>
      )}
    </div>
  );
}
