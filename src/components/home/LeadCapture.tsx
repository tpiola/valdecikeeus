"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function LeadCapture() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [interest, setInterest] = useState("masculino");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, interest }),
      });
    } finally {
      setStatus("done");
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface py-20">
      <div className="mx-auto max-w-xl px-4 text-center md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Acesso antecipado
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
          Receba 10% na primeira compra
        </h2>
        <p className="mt-3 text-sm text-muted">
          Deixe seu contato e receba o cupom direto no WhatsApp, antes do
          próximo lançamento.
        </p>

        {status === "done" ? (
          <p className="mt-8 font-display text-lg text-accent">
            Recebemos seu contato! Confira seu WhatsApp em instantes.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent"
            />
            <input
              required
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="WhatsApp"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent"
            />
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="rounded-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="unissex">Unissex</option>
            </select>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-105 disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Quero o cupom
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
