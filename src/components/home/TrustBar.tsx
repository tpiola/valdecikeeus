"use client";

import { Truck, Shield, RefreshCw, Clock } from "lucide-react";

const TRUST_BADGES = [
  { label: "Frete Grátis", detail: "Em compras acima de R$ 299" },
  { label: "Troca em 30 dias", detail: "Não serviu? Troca gratuita" },
  { label: "Original Garantido", detail: "Produtos 100% originais com NF" },
  { label: "Suporte 24h", detail: "Atendimento por WhatsApp e e-mail" },
];

const ICONS = [Truck, RefreshCw, Shield, Clock];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
        {TRUST_BADGES.map((badge, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={badge.label} className="flex items-start gap-3">
              <Icon size={22} className="shrink-0 text-accent" />
              <div>
                <p className="text-sm font-bold">{badge.label}</p>
                <p className="text-xs text-muted">{badge.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
