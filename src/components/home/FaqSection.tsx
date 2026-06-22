"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Perguntas frequentes
        </h2>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {FAQ_ITEMS.map((item, i) => (
          <div key={item.question}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-sm font-medium md:text-base">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${open === i ? "rotate-180 text-accent" : ""}`}
              />
            </button>
            {open === i && (
              <p className="pb-5 text-sm text-muted">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
