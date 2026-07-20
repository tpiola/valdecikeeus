"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";

export default function CheckoutPage() {
  const { items, total } = useCartStore();

  if (!items.length) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <ShoppingBag size={40} className="text-accent" />
        <h1 className="mt-5 text-3xl font-bold">Sua sacola está vazia</h1>
        <p className="mt-3 text-muted">Escolha um modelo e o tamanho para revisar o pedido.</p>
        <Link href="/colecao" className="btn-primary mt-8 rounded-full">Explorar coleção</Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
      <Link href="/colecao" className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent"><ArrowLeft size={16} /> Continuar comprando</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Revisão</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Confira seu pedido</h1>
          <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
            {items.map((item) => (
              <li key={`${item.product.slug}-${item.size}`} className="flex gap-4 p-4 md:p-6">
                <div className="relative h-24 w-24 shrink-0 rounded-xl bg-surface">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" sizes="96px" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/produto/${item.product.slug}`} className="font-bold hover:text-accent">{item.product.name}</Link>
                  <p className="mt-1 text-sm text-muted">Tamanho {item.size} · Quantidade {item.quantity}</p>
                  <p className="mt-3 font-bold">R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-2xl bg-[#171512] p-6 text-white lg:sticky lg:top-32">
          <h2 className="text-lg font-bold text-white">Resumo</h2>
          <div className="mt-5 flex justify-between border-b border-white/10 pb-5 text-sm">
            <span className="text-white/60">Subtotal</span>
            <strong>R$ {total().toFixed(2).replace(".", ",")}</strong>
          </div>
          <p className="mt-5 text-sm leading-6 text-white/60">
            Frete, prazo e condições de pagamento devem ser confirmados no atendimento antes do fechamento.
          </p>
          <Link href="/contato?assunto=pedido" className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-5 py-4 text-sm font-bold text-white hover:bg-accent-hover">
            Continuar para atendimento
          </Link>
          <div className="mt-5 flex gap-2 text-xs text-white/50"><CheckCircle2 size={16} className="shrink-0 text-[#ff8a55]" /> Nenhuma cobrança é realizada nesta etapa.</div>
        </aside>
      </div>
    </section>
  );
}
