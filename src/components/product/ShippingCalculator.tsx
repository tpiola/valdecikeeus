"use client";

import { useState } from "react";
import { Loader2, Truck, Package, CheckCircle, AlertCircle, MapPin } from "lucide-react";

export interface FreteOpcao {
  servico: string;
  transportadora: string;
  preco: number;
  prazo: number;
  gratis: boolean;
  descricao: string;
}

export interface FreteResult {
  cep: string;
  cidade: string;
  estado: string;
  opcoes: FreteOpcao[];
  observacao: string;
}

/** Normalized quote passed to checkout / order create. */
export interface SelectedShippingQuote {
  cep: string;
  service: string;
  carrier: string;
  price: number;
  days: number;
  id?: string;
}

type Props = {
  productPrice?: number;
  /** Prefill CEP (e.g. from checkout address). */
  initialCep?: string;
  /** When set, options are selectable and invoke this callback. */
  onSelect?: (quote: SelectedShippingQuote) => void;
  /** Currently selected service name (SEDEX / PAC). */
  selectedService?: string | null;
  /** Visual density for embedding in checkout. */
  compact?: boolean;
};

function formatCepInput(raw: string): string {
  let val = raw.replace(/\D/g, "");
  if (val.length > 8) val = val.slice(0, 8);
  if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, "$1-$2");
  return val;
}

export default function ShippingCalculator({
  productPrice = 0,
  initialCep = "",
  onSelect,
  selectedService = null,
  compact = false,
}: Props) {
  const [cep, setCep] = useState(() => formatCepInput(initialCep));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FreteResult | null>(null);
  const [error, setError] = useState("");

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCep(formatCepInput(e.target.value));
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
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  };

  const pickOption = (opcao: FreteOpcao) => {
    if (!onSelect || !result) return;
    onSelect({
      id: opcao.servico,
      cep: result.cep,
      service: opcao.servico,
      carrier: opcao.transportadora,
      price: opcao.preco,
      days: opcao.prazo,
    });
  };

  return (
    <div className={compact ? "" : "mt-6 border-t border-border pt-6"}>
      <label className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
        <Truck size={14} />
        {onSelect ? "Frete e prazo" : "Calcular frete e prazo de entrega"}
      </label>

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
          type="button"
          onClick={calculate}
          disabled={loading || cep.replace(/\D/g, "").length < 8}
          className="flex min-w-[100px] items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-xs font-black uppercase tracking-widest text-accent-fore transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
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

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-2">
          {result.cidade && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <CheckCircle size={12} className="text-accent" />
              Calculando para:{" "}
              <span className="font-bold text-foreground">
                {result.cidade} – {result.estado}
              </span>
            </div>
          )}

          {result.opcoes.map((opcao) => {
            const selected = selectedService === opcao.servico;
            const className = `flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-colors ${
              selected
                ? "border-accent bg-accent/10 ring-1 ring-accent"
                : opcao.gratis
                  ? "border-accent/30 bg-accent/5"
                  : "border-border bg-surface"
            } ${onSelect ? "cursor-pointer hover:border-accent/60" : ""}`;
            const body = (
              <>
                <div className="flex items-center gap-3">
                  {opcao.servico === "SEDEX" ? (
                    <Truck size={18} className={opcao.gratis || selected ? "text-accent" : "text-signal"} />
                  ) : (
                    <Package size={18} className={selected ? "text-accent" : "text-muted"} />
                  )}
                  <div>
                    <p className="text-sm font-bold">
                      {opcao.servico}
                      {opcao.gratis && (
                        <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-black uppercase text-accent-fore">
                          GRÁTIS
                        </span>
                      )}
                      {selected && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-accent">
                          selecionado
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted">{opcao.descricao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black ${opcao.gratis || selected ? "text-accent" : ""}`}>
                    {opcao.gratis ? "R$ 0,00" : `R$ ${opcao.preco.toFixed(2).replace(".", ",")}`}
                  </p>
                  <p className="text-xs text-muted">{opcao.prazo} dias úteis</p>
                </div>
              </>
            );
            if (onSelect) {
              return (
                <button
                  key={opcao.servico}
                  type="button"
                  onClick={() => pickOption(opcao)}
                  className={className}
                >
                  {body}
                </button>
              );
            }
            return (
              <div key={opcao.servico} className={className}>
                {body}
              </div>
            );
          })}

          {onSelect && !selectedService && (
            <p className="text-xs font-medium text-accent">Selecione uma opção de frete para continuar.</p>
          )}

          {result.observacao && (
            <p className="rounded-lg bg-surface p-2.5 text-[11px] text-muted">{result.observacao}</p>
          )}

          <p className="text-[10px] text-muted/50">
            * Prazo contado após confirmação do pagamento. Valores estimados via tabela Correios 2024.
          </p>
        </div>
      )}
    </div>
  );
}
