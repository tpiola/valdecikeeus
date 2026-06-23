"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function LeadCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
    } finally {
      setStatus("done");
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface py-20">
      <div className="mx-auto max-w-xl px-4 text-center md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Fique por dentro
        </p>
        <h2 className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
          Newsletter de cursos
        </h2>
        <p className="mt-3 text-sm text-muted">
          Receba em primeira mão os lançamentos de cursos, promoções exclusivas
          e conteúdos gratuitos direto no seu e-mail.
        </p>

        {status === "done" ? (
          <p className="mt-8 font-display text-lg text-accent">
            Inscrição confirmada! Fique de olho na sua caixa de entrada.
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent"
            />
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
              Inscrever
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
