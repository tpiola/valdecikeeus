"use client";

import { useState } from "react";
import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { Loader2, Send } from "lucide-react";

// Note: metadata must be exported from a Server Component, but this page needs
// client interactivity for the form. The metadata will be set via layout or manually.
// For now, we document the page title here:
// title: `Contato | ${SITE.name}`

export default function ContatoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    } finally {
      setStatus("done");
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Fale com a Keeus
      </h1>
      <p className="mt-3 text-sm text-muted">
        Dúvidas sobre modelos, tamanhos ou pedidos? Mande sua mensagem que respondemos
        rápido.
      </p>

      {status === "done" ? (
        <div className="mt-10 rounded-xl border border-border bg-surface p-8 text-center">
          <p className="font-display text-lg text-accent">
            Mensagem enviada com sucesso!
          </p>
          <p className="mt-2 text-sm text-muted">
            Responderemos em até 24 horas no e-mail informado.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
              Nome
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
              E-mail
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
              Mensagem
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Como podemos ajudar? Conte qual chuteira te interessa, sua dúvida sobre tamanho..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {status === "loading" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            Enviar mensagem
          </button>
        </form>
      )}
    </main>
  );
}
