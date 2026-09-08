"use client";

import { useEffect, useState } from "react";
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
  /** Auto-run quote when CEP reaches 8 digits (checkout). */
  autoCalculate?: boolean;
};

function formatCepInput(raw: string): string {
  let val = raw.replace(/\D/g, "");
  if (val.length > 8) val = val.slice(0, 8);
  if (val.length > 5) val = val.replace(/^(\d{5})(\d)/, "$1-$2");
  return val;
}

function chegaLabel(days: number): string {
  if (days <= 0) return "";
  return days === 1 ? "Chega em 1 dia útil" : `Chega em ${days} dias úteis`;
}

export default function ShippingCalculator({
  productPrice = 0,
  initialCep = "",
  onSelect,
  selectedService = null,
  compact = false,
  autoCalculate = false,
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

  const calculate = async (cepOverride?: string) => {
    const raw = (cepOverride ?? cep).replace(/\D/g, "");
    if (raw.length < 8) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/frete?cep=${raw}&valor=${productPrice}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Não foi possível calcular o frete. Tente de novo.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Sem conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Keep CEP in sync when parent prefills (checkout)
  useEffect(() => {
    const next = formatCepInput(initialCep);
    if (next && next !== cep) {
      setCep(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCep]);

  useEffect(() => {
    if (!autoCalculate) return;
    const raw = cep.replace(/\D/g, "");
    if (raw.length === 8) {
      void calculate(raw);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCalculate, cep, productPrice]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void calculate();
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

  const fastest =
    result?.opcoes?.length
      ? result.opcoes.reduce((a, b) => (a.prazo <= b.prazo ? a : b))
      : null;

  return (
    <div className={compact ? "" : "mt-6 border-t border-border pt-6"}>
      <label className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <Truck size={14} className="text-accent" />
        {onSelect ? "Frete e prazo" : "Frete e prazo de entrega"}
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
            aria-label="CEP"
            className="w-full rounded-lg border border-border bg-surface py-3.5 pl-9 pr-3 text-base outline-none transition-colors focus:border-accent md:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={() => void calculate()}
          disabled={loading || cep.replace(/\D/g, "").length < 8}
          className="flex min-h-12 min-w-[108px] items-center justify-center gap-2 rounded-lg bg-accent px-5 text-xs font-bold uppercase tracking-wider text-accent-fore transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
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
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {result && fastest && !onSelect && (
        <p className="mt-4 text-sm font-semibold text-stone-900" aria-live="polite">
          <span className="text-accent">{chegaLabel(fastest.prazo)}</span>
          {result.cidade ? (
            <span className="font-normal text-stone-500">
              {" "}
              · {result.cidade}/{result.estado}
            </span>
          ) : null}
        </p>
      )}

      {result && (
        <div className="mt-3 space-y-2">
          {result.cidade && onSelect && (
            <div className="flex items-center gap-2 text-xs text-muted">
              <CheckCircle size={12} className="text-accent" />
              Entrega para{" "}
              <span className="font-semibold text-foreground">
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
                        <span className="ml-2 rounded bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase text-accent-fore">
                          Grátis
                        </span>
                      )}
                      {selected && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-accent">
                          selecionado
                        </span>
                      )}
                    </p>
                    <p className="text-xs font-medium text-stone-700">{chegaLabel(opcao.prazo)}</p>
                    <p className="text-[11px] text-muted">{opcao.descricao}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${opcao.gratis || selected ? "text-accent" : ""}`}>
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
            <p className="text-xs font-medium text-accent">Selecione SEDEX ou PAC para continuar.</p>
          )}

          {result.observacao && (
            <p className="rounded-lg bg-surface p-2.5 text-[11px] text-muted">{result.observacao}</p>
          )}

          <p className="text-[10px] text-muted/60">
            Prazo em dias úteis após confirmação do pagamento. Valores estimados pelos Correios.
          </p>
        </div>
      )}
    </div>
  );
}
