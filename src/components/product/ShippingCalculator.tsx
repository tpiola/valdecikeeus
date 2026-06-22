"use client";

import { useState } from "react";
import { Loader2, Truck, Package, CheckCircle, AlertCircle, MapPin } from "lucide-react";

interface FreteOpcao {
  servico: string;
  transportadora: string;
  preco: number;
  prazo: number;
  gratis: boolean;
  descricao: string;
}

interface FreteResult {
  cep: string;
  cidade: string;
  estado: string;
  opcoes: FreteOpcao[];
  observacao: string;
}

export default function ShippingCalculator({ productPrice = 0 }: { productPrice?: number }) {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FreteResult | null>(null);
  const [error, setError] = useState("");

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, "$1-$2");
    setCep(val);
    setError("");
    setResult(null);
  };

  const calculate = async () => {
    const raw = cep.replace(/\D/g, "");
    if (raw.length < 8) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/frete?cep=${raw}&valor=${productPrice}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao calcular frete. Tente novamente.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Sem conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") calculate();
  };

  return (
    <div className="mt-6 border-t border-border pt-6">
      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
        <Truck size={14} />
        Calcular frete e prazo de entrega
      </label>

      {/* CEP Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            onKeyDown={handleKeyDown}
            placeholder="00000-000"
            inputMode="numeric"
            maxLength={9}
            className="w-full rounded-lg border border-border bg-surface py-3 pl-9 pr-3 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>
        <button
          onClick={calculate}
          disabled={loading || cep.replace(/\D/g, "").length < 8}
          className="flex min-w-[100px] items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-xs font-black uppercase tracking-widest text-accent-foreground transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : "Calcular"}
        </button>
      </div>

      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1.5 block text-[11px] text-muted underline-offset-2 hover:underline"
      >
        Não sei meu CEP
      </a>

      {/* Error */}
      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-4 space-y-2">
          {/* City confirmation */}
          {result.cidade && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <CheckCircle size={12} className="text-accent" />
              Calculando para:{" "}
              <span className="font-bold text-foreground">
                {result.cidade} – {result.estado}
              </span>
            </div>
          )}

          {/* Options */}
          {result.opcoes.map((opcao) => (
            <div
              key={opcao.servico}
              className={`flex items-center justify-between rounded-xl border p-3.5 transition-colors ${
                opcao.gratis
                  ? "border-accent/30 bg-accent/5"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                {opcao.servico === "SEDEX" ? (
                  <Truck size={18} className={opcao.gratis ? "text-accent" : "text-signal"} />
                ) : (
                  <Package size={18} className="text-muted" />
                )}
                <div>
                  <p className="text-sm font-bold">
                    {opcao.servico}
                    {opcao.gratis && (
                      <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-black uppercase text-accent-foreground">
                        GRÁTIS
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted">{opcao.descricao}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black ${opcao.gratis ? "text-accent" : ""}`}>
                  {opcao.gratis ? "R$ 0,00" : `R$ ${opcao.preco.toFixed(2).replace(".", ",")}`}
                </p>
                <p className="text-xs text-muted">{opcao.prazo} dias úteis</p>
              </div>
            </div>
          ))}

          {/* Observation */}
          {result.observacao && (
            <p className="rounded-lg bg-surface p-2.5 text-[11px] text-muted">
              {result.observacao}
            </p>
          )}

          <p className="text-[10px] text-muted/50">
            * Prazo contado após confirmação do pagamento. Valores estimados via tabela Correios 2024.
          </p>
        </div>
      )}
    </div>
  );
}
