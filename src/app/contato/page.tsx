"use client";

import { useState } from "react";
import { Loader2, Send, MessageCircle, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import { SITE } from "@/lib/constants";

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
    <main className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-8">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">Contato</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Fale com a Keeus
      </h1>
      <p className="mt-2 text-foreground-mid">
        Dúvidas sobre chinelos, tamanhos ou pedidos? Estamos aqui para ajudar.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Form */}
        <div>
          {status === "done" ? (
            <div className="rounded-2xl border border-border bg-surface p-8 text-center">
              <div className="text-3xl mb-3">🧡</div>
              <p className="font-display text-lg font-bold text-foreground">
                Mensagem enviada com sucesso!
              </p>
              <p className="mt-2 text-sm text-foreground-mid">
                Responderemos em até 24 horas no e-mail informado.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-widest text-muted">
                  Nome
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
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
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
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
                  placeholder="Como podemos ajudar? Conte sua dúvida sobre chinelos, tamanhos, pedidos..."
                  className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary gap-2 rounded-full px-8 py-4 text-sm font-semibold w-full sm:w-auto disabled:opacity-60"
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
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-bold text-foreground mb-4">Canais de Atendimento</h2>
            <div className="space-y-4">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 p-4 transition-all hover:bg-[#25D366]/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">WhatsApp</p>
                  <p className="text-xs text-foreground-mid">Resposta em até 5 minutos</p>
                </div>
              </a>

              <a
                href="mailto:contato@keeus.com.br"
                className="flex items-center gap-3 rounded-xl bg-accent-light p-4 transition-all hover:bg-accent/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">E-mail</p>
                  <p className="text-xs text-foreground-mid">contato@keeus.com.br</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-xl bg-surface-mid p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Telefone</p>
                  <p className="text-xs text-foreground-mid">(11) 99999-9999</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-bold text-foreground mb-2">Horário de Atendimento</h2>
            <p className="text-sm text-foreground-mid leading-relaxed">
              Segunda a Sexta: 9h às 18h<br />
              Sábado: 9h às 13h<br />
              Domingo e feriados: retornamos no próximo dia útil.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
