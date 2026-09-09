"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Send } from "lucide-react";

const ASSUNTO_PRESETS: Record<string, { subject: string; message: string }> = {
  pedido: {
    subject: "Pedido",
    message:
      "Olá! Gostaria de finalizar um pedido. Seguem os detalhes da sacola / modelos e tamanhos:\n\n",
  },
  troca: {
    subject: "Troca ou devolução",
    message:
      "Olá! Gostaria de solicitar uma troca ou devolução. Informações do pedido/produto:\n\n",
  },
};

function ContatoForm() {
  const searchParams = useSearchParams();
  const assuntoParam = (searchParams.get("assunto") ?? "").trim().toLowerCase();
  const mensagemParam = (searchParams.get("mensagem") ?? searchParams.get("msg") ?? "").trim();
  const nomeParam = (searchParams.get("nome") ?? searchParams.get("name") ?? "").trim();
  const emailParam = (searchParams.get("email") ?? "").trim();

  const preset = useMemo(() => {
    if (assuntoParam && ASSUNTO_PRESETS[assuntoParam]) return ASSUNTO_PRESETS[assuntoParam];
    if (assuntoParam) {
      return {
        subject: assuntoParam.charAt(0).toUpperCase() + assuntoParam.slice(1),
        message: "",
      };
    }
    return { subject: "", message: "" };
  }, [assuntoParam]);

  const [form, setForm] = useState({
    name: nomeParam,
    email: emailParam,
    subject: preset.subject,
    message: mensagemParam || preset.message,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.subject ? `[${form.subject}] ${form.message}` : form.message,
        assunto: assuntoParam || form.subject || undefined,
      };
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Falha no envio");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-20">
      <nav className="breadcrumb mb-8">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Contato</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Atendimento</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Fale com a Keeus</h1>
          <p className="mt-4 leading-7 text-muted">
            Envie sua dúvida sobre modelos, tamanhos, disponibilidade ou revisão do pedido.
            Se for sobre um pedido que já fechou, informe o número — se não tiver, o e-mail
            usado na compra já ajuda a gente a achar.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
          {status === "done" ? (
            <div role="status" className="py-12 text-center">
              <p className="text-xl font-bold">Mensagem recebida</p>
              <p className="mt-2 text-sm text-muted">A equipe poderá responder pelo e-mail informado.</p>
              <Link href="/colecao" className="btn-primary mt-7 rounded-full">
                Voltar à coleção
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && (
                <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                  Não foi possível enviar agora. Tente novamente em instantes.
                </p>
              )}
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-xs font-bold uppercase tracking-wider">
                  Nome
                </label>
                <input
                  id="contact-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-xs font-bold uppercase tracking-wider">
                  E-mail
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="mb-2 block text-xs font-bold uppercase tracking-wider">
                  Assunto
                </label>
                <input
                  id="contact-subject"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  placeholder="Ex.: Pedido, troca, dúvida de tamanho"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs font-bold uppercase tracking-wider">
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  placeholder="Informe também o modelo e tamanho, se já souber."
                  className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent"
                />
              </div>
              <button disabled={status === "loading"} className="btn-primary w-full rounded-full py-4">
                {status === "loading" ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />} Enviar
                mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ContatoPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-20">
          <p className="text-sm text-muted">Carregando formulário…</p>
        </main>
      }
    >
      <ContatoForm />
    </Suspense>
  );
}
