"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export default function LeadCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (!response.ok) throw new Error("Não foi possível concluir a inscrição.");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-xl px-4 text-center md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          Novidades
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-stone-900 md:text-4xl">
          Lançamentos e reposições
        </h2>
        <p className="mt-3 text-sm text-muted">
          Novos modelos e reposições da coleção, direto no seu e-mail. Sem spam, sem empurrar outra coisa.
        </p>

        {status === "done" ? (
          <p className="mt-8 font-display text-lg text-accent">
            Inscrição confirmada! Fique de olho na sua caixa de entrada.
          </p>
        ) : (
          <>
          {status === "error" && (
            <p role="alert" className="mt-6 text-sm font-semibold text-red-700">
              Não foi possível concluir agora. Confira os dados e tente novamente.
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="lead-name">Nome</label>
            <input
              id="lead-name"
              required
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-[var(--accent)]"
            />
            <label className="sr-only" htmlFor="lead-email">E-mail</label>
            <input
              id="lead-email"
              required
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-accent-fore transition-transform hover:scale-105 disabled:opacity-60"
            >
              {status === "loading" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Inscrever
            </button>
          </form>
          </>
        )}
      </div>
    </section>
  );
}
