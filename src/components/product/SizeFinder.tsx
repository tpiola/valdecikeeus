"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function SizeFinder({ sizes }: { sizes: number[] }) {
  const [footLength, setFootLength] = useState("");
  const [usualSize, setUsualSize] = useState("");
  const [recommended, setRecommended] = useState<number | null>(null);

  const calculate = () => {
    const length = parseFloat(footLength.replace(",", "."));
    const usual = parseFloat(usualSize.replace(",", "."));

    let target: number;
    if (!isNaN(length)) {
      target = Math.round(length * 1.5 + 18);
    } else if (!isNaN(usual)) {
      target = Math.round(usual);
    } else {
      return;
    }

    const closest = sizes.reduce((best, size) =>
      Math.abs(size - target) < Math.abs(best - target) ? size : best
    );
    setRecommended(closest);
  };

  return (
    <div className="rounded-xl border border-accent/30 bg-accent-soft p-5">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
        <Sparkles size={14} />
        Keeus Size AI
      </div>
      <p className="mb-4 text-xs text-muted">
        Informe o comprimento do seu pé (cm) ou o tamanho que você costuma
        usar em outras marcas — nosso sistema recomenda o tamanho ideal neste
        modelo.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={footLength}
          onChange={(e) => setFootLength(e.target.value)}
          placeholder="Comprimento do pé (cm)"
          inputMode="decimal"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <input
          value={usualSize}
          onChange={(e) => setUsualSize(e.target.value)}
          placeholder="ou tamanho usual"
          inputMode="decimal"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={calculate}
          className="rounded-md bg-accent px-5 py-2 text-xs font-bold uppercase text-accent-foreground"
        >
          Recomendar
        </button>
      </div>

      {recommended && (
        <p className="mt-4 text-sm">
          Tamanho recomendado para você:{" "}
          <span className="font-display text-lg text-accent">{recommended}</span>
        </p>
      )}
    </div>
  );
}
