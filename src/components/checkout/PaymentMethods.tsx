"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Loader2,
  MessageCircle,
  QrCode,
} from "lucide-react";

export type PayMethod = "pix" | "card";

type Props = {
  orderId: string;
  accessToken: string;
  paymentConfigured: boolean;
  paymentNote: string | null;
  busy: boolean;
  error: string | null;
  onPay: (method: PayMethod) => void;
};

/**
 * UI profissional de meios de pagamento: apenas Pix e cartão de crédito.
 * Integra com stub MP — nunca marca pedido como pago localmente.
 */
export default function PaymentMethods({
  orderId,
  accessToken,
  paymentConfigured,
  paymentNote,
  busy,
  error,
  onPay,
}: Props) {
  const [method, setMethod] = useState<PayMethod>("pix");

  const methods: {
    id: PayMethod;
    label: string;
    detail: string;
    icon: typeof QrCode;
  }[] = [
    {
      id: "pix",
      label: "Pix",
      detail: "Aprovação na hora · sem juros",
      icon: QrCode,
    },
    {
      id: "card",
      label: "Cartão de crédito",
      detail: "Parcelamento conforme Mercado Pago",
      icon: CreditCard,
    },
  ];

  return (
    <div className="mt-8 rounded-2xl bg-[#171512] p-6 text-white">
      <h2 className="text-lg font-bold">Forma de pagamento</h2>
      <p className="mt-1 text-sm text-white/55">
        Escolha como prefere pagar. O pedido só é marcado como pago depois da
        confirmação do Mercado Pago.
      </p>

      <div
        className="mt-5 grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Meio de pagamento"
      >
        {methods.map((m) => {
          const Icon = m.icon;
          const selected = method === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setMethod(m.id)}
              className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                selected
                  ? "border-[#FF5F1F] bg-[#FF5F1F]/10 shadow-[0_0_0_1px_rgba(255,95,31,0.35)]"
                  : "border-white/15 bg-white/5 hover:border-white/35"
              }`}
            >
              <span
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  selected
                    ? "bg-[#FF5F1F] text-white"
                    : "bg-white/10 text-white/80"
                }`}
              >
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-sm font-bold">{m.label}</span>
                <span className="mt-0.5 block text-xs leading-5 text-white/55">
                  {m.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {paymentConfigured ? (
        <>
          <p className="mt-5 text-sm leading-6 text-white/60">
            Você será levado ao checkout seguro do Mercado Pago para concluir
            com{" "}
            <strong className="text-white">
              {method === "pix" ? "Pix" : "cartão de crédito"}
            </strong>
            . Não cobramos nada nesta página.
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => onPay(method)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5F1F] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#e04e0e] disabled:opacity-60"
          >
            {busy ? <Loader2 className="animate-spin" size={18} /> : null}
            {method === "pix" ? "Pagar com Pix" : "Pagar com cartão"}
          </button>
        </>
      ) : (
        <>
          <div className="mt-5 flex gap-2 rounded-xl bg-white/5 p-4 text-sm text-white/70">
            <AlertTriangle size={18} className="shrink-0 text-[#ff8a55]" />
            <p>
              {paymentNote ||
                "Pagamento online ainda não está ativo neste ambiente. Seu pedido ficou registrado como pendente — finalize pelo atendimento."}
            </p>
          </div>
          <Link
            href={`/contato?assunto=pedido&mensagem=${encodeURIComponent(
              `Olá! Quero finalizar o pedido ${orderId} (preferência: ${
                method === "pix" ? "Pix" : "cartão"
              }).`
            )}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF5F1F] px-5 py-4 text-sm font-bold text-white hover:bg-[#e04e0e]"
          >
            <MessageCircle size={18} /> Finalizar no atendimento
          </Link>
        </>
      )}

      <div className="mt-5 flex gap-2 text-xs text-white/50">
        <CheckCircle2 size={16} className="shrink-0 text-[#ff8a55]" />
        Pix e cartão apenas. Sem boleto. Nenhuma cobrança sem confirmação do
        gateway.
      </div>

      <Link
        href={`/pedido/${orderId}?token=${accessToken}`}
        className="mt-4 inline-block text-xs font-semibold text-white/60 underline underline-offset-2 hover:text-white"
      >
        Ver status do pedido
      </Link>

      {error && (
        <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm font-medium text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
