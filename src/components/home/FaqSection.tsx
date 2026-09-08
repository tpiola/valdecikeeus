"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-28 font-semibold tracking-tight md:text-40">
          Perguntas frequentes
        </h2>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.question}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-4 py-5 text-left transition-colors ${isOpen ? "text-accent" : "hover:text-accent"}`}
              >
                <span className="text-sm font-medium md:text-base">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-6 text-muted">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
