"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { FLASH_SALE } from "@/lib/constants";
import Countdown, { getCountdownParts } from "./Countdown";

const KEY = "keeus-checkout-hold";

function holdEndsAt(orderId: string): string {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { orderId: string; endsAt: string };
      if (parsed.orderId === orderId && parsed.endsAt) return parsed.endsAt;
    }
  } catch {
    /* ignore */
  }
  const ends = new Date(
    Date.now() + FLASH_SALE.checkoutHoldMinutes * 60_000
  ).toISOString();
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ orderId, endsAt: ends }));
  } catch {
    /* ignore */
  }
  return ends;
}

/**
 * Lembrete calmo: o pedido ficou pendente.
 * Sem pressão de “vai perder agora” — só orientação transparente.
 */
export default function CheckoutHoldTimer({ orderId }: { orderId: string }) {
  const [endsAt, setEndsAt] = useState<string | null>(null);

  useEffect(() => {
    setEndsAt(holdEndsAt(orderId));
  }, [orderId]);

  if (!endsAt) return null;
  const expired = getCountdownParts(endsAt).expired;

  return (
    <div className="mt-4 flex flex-wrap items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
      <Info size={16} className="mt-0.5 shrink-0 text-stone-500" />
      {expired ? (
        <p>
          Seu pedido continua registrado como pendente. Você pode pagar quando
          quiser — o estoque é atualizado conforme as confirmações de pagamento.
        </p>
      ) : (
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-2">
          <p className="flex-1">
            Pedido criado e aguardando pagamento. Nada foi cobrado. Se preferir,
            conclua nos próximos {FLASH_SALE.checkoutHoldMinutes} minutos enquanto
            revisamos a disponibilidade.
          </p>
          <Countdown endsAt={endsAt} compact className="text-sm font-semibold text-stone-800" />
        </div>
      )}
    </div>
  );
}
