"use client";

import { useState } from "react";
import { CreditCard, FileText, QrCode } from "lucide-react";

export default function PaymentOptions({ price }: { price: number }) {
  const [method, setMethod] = useState<"credit" | "pix" | "boleto">("credit");
  const [installments, setInstallments] = useState(1);

  return (
    <div className="space-y-5 rounded-xl border border-border bg-surface p-5">
      <h4 className="border-b border-border pb-4 text-xs font-bold uppercase tracking-widest text-muted">
        Forma de pagamento
      </h4>

      <div className="grid grid-cols-3 gap-2">
        {[
          { id: "credit" as const, label: "Cartão", icon: CreditCard },
          { id: "pix" as const, label: "Pix", icon: QrCode },
          { id: "boleto" as const, label: "Boleto", icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMethod(id)}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors ${
              method === id ? "border-accent bg-accent-soft" : "border-border"
            }`}
          >
            <Icon size={18} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        ))}
      </div>

      {method === "credit" && (
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Parcelamento
          </label>
          <select
            value={installments}
            onChange={(e) => setInstallments(Number(e.target.value))}
            className="mt-1 w-full border-b-2 border-border bg-transparent p-2 text-sm font-medium outline-none focus:border-accent"
          >
            {[1, 2, 3].map((i) => (
              <option key={i} value={i}>
                {i}x de R$ {(price / i).toFixed(2)} sem juros
              </option>
            ))}
          </select>
        </div>
      )}

      {method === "pix" && (
        <div className="py-4 text-center">
          <div className="mb-2 inline-block rounded-lg bg-background p-4">
            <div className="flex h-32 w-32 items-center justify-center border-2 border-dashed border-border">
              <QrCode size={48} className="text-muted" />
            </div>
          </div>
          <p className="text-xs text-muted">
            Aprovação imediata • 5% de desconto extra: R$ {(price * 0.95).toFixed(2)}
          </p>
        </div>
      )}

      {method === "boleto" && (
        <p className="text-xs text-muted">
          O boleto vence em 3 dias úteis. Aprovação em até 2 dias úteis após o pagamento.
        </p>
      )}
    </div>
  );
}
