"use client";

import { useState } from "react";
import { Loader2, Truck } from "lucide-react";

interface ShippingResult {
  sedex: { price: number; days: number };
  pac: { price: number; days: number };
}

export default function ShippingCalculator() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ShippingResult | null>(null);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, "$1-$2");
    setCep(val);
  };

  const calculate = () => {
    if (cep.length < 9) return;
    setLoading(true);
    setTimeout(() => {
      const isCapital = cep.startsWith("0") || cep.startsWith("1");
      setResult({
        sedex: { price: isCapital ? 25 : 45, days: isCapital ? 2 : 4 },
        pac: { price: isCapital ? 12 : 22, days: isCapital ? 5 : 8 },
      });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mt-6 border-t border-border pt-6">
      <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted">
        Calcular frete e prazo
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={cep}
          onChange={handleCepChange}
          placeholder="00000-000"
          inputMode="numeric"
          className="flex-1 rounded-md border border-border bg-surface px-3 py-3 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={calculate}
          disabled={loading || cep.length < 9}
          className="rounded-md bg-accent px-6 py-3 text-xs font-bold uppercase text-accent-foreground transition-opacity disabled:opacity-50"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Calcular"}
        </button>
      </div>

      {result && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-accent" />
              <div>
                <p className="text-sm font-bold">SEDEX Express</p>
                <p className="text-xs text-muted">{result.sedex.days} dias úteis</p>
              </div>
            </div>
            <p className="font-bold">R$ {result.sedex.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-surface p-3">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-muted" />
              <div>
                <p className="text-sm font-bold">PAC Econômico</p>
                <p className="text-xs text-muted">{result.pac.days} dias úteis</p>
              </div>
            </div>
            <p className="font-bold">R$ {result.pac.price.toFixed(2)}</p>
          </div>
          <p className="text-[10px] italic text-muted">
            Cálculo estimado. Pronto para integração com Correios / Melhor Envio via variável de ambiente.
          </p>
        </div>
      )}
    </div>
  );
}
