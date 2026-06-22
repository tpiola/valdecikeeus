"use client";

import { ShieldCheck, Truck, CreditCard, RefreshCw } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const ICONS = [Truck, RefreshCw, CreditCard, ShieldCheck];

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
