import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Trocas e Devoluções | ${SITE.name}`,
  description: "Orientações da Keeus para solicitar análise de troca, devolução ou problema com um produto.",
};

export default function TrocasPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
      <nav className="breadcrumb mb-8"><Link href="/">Home</Link><span>/</span><span>Trocas e devoluções</span></nav>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Atendimento pós-compra</p>
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">Trocas e devoluções</h1>
      <p className="mt-5 leading-7 text-muted">Esta página explica como iniciar uma solicitação. Prazos, custos e elegibilidade devem ser confirmados conforme os dados reais do pedido e a legislação aplicável.</p>

      <div className="mt-10 space-y-8 text-sm leading-7 text-foreground/75">
        <section><h2 className="text-xl font-bold">Antes de enviar</h2><ul className="mt-3 list-disc space-y-2 pl-5"><li>Separe o número ou comprovante do pedido.</li><li>Informe o modelo, tamanho e motivo da solicitação.</li><li>Mantenha o produto, embalagem e acessórios disponíveis para análise.</li><li>Se houver defeito ou item incorreto, envie fotos claras pela conversa de atendimento.</li></ul></section>
        <section><h2 className="text-xl font-bold">Condição do produto</h2><p className="mt-3">Produtos usados, danificados por uso inadequado ou sem itens que faziam parte do envio podem exigir uma avaliação específica. Não faça postagem antes de receber as orientações da equipe.</p></section>
        <section><h2 className="text-xl font-bold">Reembolso ou substituição</h2><p className="mt-3">Quando a solicitação for aprovada, a equipe informará as alternativas disponíveis, a forma de devolução e o prazo estimado. Nenhum prazo ou postagem gratuita é prometido nesta página sem confirmação do pedido.</p></section>
      </div>

      <div className="mt-10 rounded-2xl border border-accent/20 bg-accent-light p-6">
        <h2 className="font-bold">Precisa iniciar uma solicitação?</h2>
        <p className="mt-2 text-sm text-muted">Use o formulário e inclua os dados do pedido na mensagem.</p>
        <Link href="/contato?assunto=troca" className="btn-primary mt-5 rounded-full">Ir para contato</Link>
      </div>
    </main>
  );
}
