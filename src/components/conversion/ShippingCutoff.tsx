"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { FLASH_SALE } from "@/lib/constants";

/** Aviso útil de horário — sem tom de ameaça. */
export default function ShippingCutoff({ className = "" }: { className?: string }) {
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utcH = now.getUTCHours();
      const brtHour = (utcH - 3 + 24) % 24;
      const utcDay = now.getUTCDay();
      const day = utcH < 3 ? (utcDay + 6) % 7 : utcDay;
      const isWeekday = day >= 1 && day <= 5;
      const cutoff = FLASH_SALE.sameDayCutoffHour;
      if (isWeekday && brtHour < cutoff) {
        setShow(true);
        setLabel(
          `Em dias úteis, pedidos pagos até ${cutoff}h (horário de Brasília) entram na fila de separação do mesmo dia, sujeito à confirmação do pagamento.`
        );
      } else {
        setShow(false);
      }
    };
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!show) return null;

  return (
    <p className={`flex items-start gap-2 text-xs leading-5 text-stone-600 ${className}`}>
      <Clock size={14} className="mt-0.5 shrink-0 text-stone-500" />
      <span>{label}</span>
    </p>
  );
}
