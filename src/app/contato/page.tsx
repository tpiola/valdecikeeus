"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Send } from "lucide-react";

export default function ContatoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Falha no envio");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-20">
      <nav className="breadcrumb mb-8"><Link href="/">Home</Link><span>/</span><span>Contato</span></nav>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Atendimento</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Fale com a Keeus</h1>
          <p className="mt-4 leading-7 text-muted">Envie sua dúvida sobre modelos, tamanhos, disponibilidade ou revisão do pedido. Não exibimos telefone, prazo de resposta ou redes sociais que ainda não foram confirmados.</p>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6 md:p-8">
          {status === "done" ? (
            <div role="status" className="py-12 text-center"><p className="text-xl font-bold">Mensagem recebida</p><p className="mt-2 text-sm text-muted">A equipe poderá responder pelo e-mail informado.</p><Link href="/colecao" className="btn-primary mt-7 rounded-full">Voltar à coleção</Link></div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === "error" && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">Não foi possível enviar agora. Tente novamente em instantes.</p>}
              <div><label htmlFor="contact-name" className="mb-2 block text-xs font-bold uppercase tracking-wider">Nome</label><input id="contact-name" required autoComplete="name" value={form.name} onChange={(event) => setForm({...form,name:event.target.value})} className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent" /></div>
              <div><label htmlFor="contact-email" className="mb-2 block text-xs font-bold uppercase tracking-wider">E-mail</label><input id="contact-email" required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({...form,email:event.target.value})} className="w-full rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent" /></div>
              <div><label htmlFor="contact-message" className="mb-2 block text-xs font-bold uppercase tracking-wider">Mensagem</label><textarea id="contact-message" required rows={6} value={form.message} onChange={(event) => setForm({...form,message:event.target.value})} placeholder="Informe também o modelo e tamanho, se já souber." className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 outline-none focus:border-accent" /></div>
              <button disabled={status === "loading"} className="btn-primary w-full rounded-full py-4">{status === "loading" ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />} Enviar mensagem</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
