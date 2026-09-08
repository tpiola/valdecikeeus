"use client";

import { useState } from "react";

function numeroParaCm(cm: number): number {
  return Math.round((cm + 1.5) / 0.667);
}

export default function SizeFinder({ sizes }: { sizes: number[] }) {
  const [footLength, setFootLength] = useState("");
  const [recommended, setRecommended] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

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
    <div className="border-t border-border pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs font-semibold text-stone-700 underline underline-offset-4 hover:text-accent"
        aria-expanded={open}
      >
        {open ? "Fechar guia de tamanho" : "Não sabe o número? Medir o pé"}
      </button>

      {open && (
        <div className="mt-3">
          <p className="mb-3 text-xs leading-5 text-muted">
            Meça do calcanhar à ponta do dedão, com o pé no chão. Informe em centímetros.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={footLength}
              onChange={(e) => setFootLength(e.target.value)}
              placeholder="Ex.: 25,5"
              inputMode="decimal"
              aria-label="Comprimento do pé em centímetros"
              className="min-h-11 flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={calculate}
              className="min-h-11 rounded-md bg-stone-900 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-stone-800"
            >
              Ver tamanho
            </button>
          </div>
          {recommended && (
            <p className="mt-3 text-sm text-stone-700">
              Para este modelo, sugerimos o{" "}
              <span className="font-bold text-accent">{recommended}</span>. Entre dois números,
              prefira o maior.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
