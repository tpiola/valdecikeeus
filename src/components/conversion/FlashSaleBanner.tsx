"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { FLASH_SALE } from "@/lib/constants";
import { getFlashSaleProducts } from "@/lib/products";
import Countdown, { getCountdownParts } from "./Countdown";

/** Oferta com data real — some ao expirar. Sem urgência teatral. */
export default function FlashSaleBanner() {
  const [alive, setAlive] = useState(() => {
    if (!FLASH_SALE.enabled) return false;
    return !getCountdownParts(FLASH_SALE.endsAt).expired;
  });

  useEffect(() => {
    if (!FLASH_SALE.enabled) return;
    const tick = () => setAlive(!getCountdownParts(FLASH_SALE.endsAt).expired);
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!FLASH_SALE.enabled || !alive) return null;

  const items = getFlashSaleProducts();
  const top = items[0];
  const discount =
    top?.originalPrice && top.originalPrice > top.price
      ? Math.round(((top.originalPrice - top.price) / top.originalPrice) * 100)
      : null;

  return (
    <section className="border-b border-stone-200 bg-[#f6f3ef]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-3 sm:flex-row md:px-8">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-white text-[#FF5F1F] shadow-sm sm:flex">
            <Tag size={16} />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e04e0e]">
              {FLASH_SALE.label}
              {discount ? ` · até ${discount}%` : ""}
            </p>
            <p className="mt-0.5 text-sm text-stone-700">
              {items.length
                ? `${items.length} modelo${items.length > 1 ? "s" : ""} com preço promocional até a data indicada.`
                : "Preços promocionais com data de término clara."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <p className="text-xs text-stone-600">
            Termina em{" "}
            <Countdown endsAt={FLASH_SALE.endsAt} compact className="font-semibold text-stone-900" />
          </p>
          <Link
            href={FLASH_SALE.href}
            className="inline-flex items-center rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-900 transition hover:border-[#FF5F1F] hover:text-[#e04e0e]"
          >
            Ver ofertas
          </Link>
        </div>
      </div>
    </section>
  );
}
