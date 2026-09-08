"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";

type OrderView = {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  shippingPrice: number;
  items: Array<{ name: string; size: number; qty: number; lineTotal: number }>;
  customer: { name: string; email: string };
  paidAt?: string | null;
  payment?: { paid: boolean };
  createdAt: string;
};

function StatusIcon({ status }: { status: string }) {
  if (status === "paid" || status === "fulfilled") {
    return <CheckCircle2 className="text-green-600" size={28} />;
  }
  if (status === "cancelled" || status === "refunded") {
    return <XCircle className="text-red-600" size={28} />;
  }
  return <Clock className="text-accent" size={28} />;
}

function statusLabel(status: string) {
  switch (status) {
    case "pending_payment":
      return "Aguardando pagamento";
    case "paid":
      return "Pago";
    case "fulfilled":
      return "Enviado / concluído";
    case "cancelled":
      return "Cancelado";
    case "refunded":
      return "Reembolsado";
    default:
      return status;
  }
}

function PedidoInner() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const token = search.get("token") || "";
  const mp = search.get("mp");
  const [order, setOrder] = useState<OrderView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${params.id}?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "Pedido não encontrado");
        if (!cancelled) setOrder(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Erro");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (params.id && token) load();
    else {
      setError("Link incompleto — falta o token de acesso.");
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [params.id, token]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-2xl items-center justify-center px-4">
        <Loader2 className="animate-spin text-accent" size={28} />
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Pedido</h1>
        <p className="mt-3 text-muted">{error || "Não encontrado"}</p>
        <Link href="/colecao" className="btn-primary mt-8 inline-flex rounded-full">
          Voltar à coleção
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-20">
      <div className="flex items-start gap-3">
        <StatusIcon status={order.status} />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Pedido</p>
          <h1 className="mt-1 text-3xl font-bold">{statusLabel(order.status)}</h1>
          <p className="mt-2 font-mono text-xs text-muted">{order.id}</p>
        </div>
      </div>

      {mp === "success" && order.status !== "paid" && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Retorno do Mercado Pago recebido, mas o status ainda é pendente até o webhook confirmar o
          pagamento. Isso é intencional — não marcamos como pago só pelo redirect.
        </p>
      )}

      {mp === "failure" && (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          O pagamento não foi concluído. Você pode tentar de novo pelo checkout ou falar com o
          atendimento.
        </p>
      )}

      <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
        {order.items.map((item, idx) => (
          <li key={`${item.name}-${item.size}-${idx}`} className="flex justify-between gap-4 p-4 text-sm">
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-muted">
                Tam. {item.size} · Qtd {item.qty}
              </p>
            </div>
            <p className="font-semibold">R$ {Number(item.lineTotal).toFixed(2).replace(".", ",")}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-2 rounded-2xl bg-surface p-5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span>R$ {Number(order.subtotal).toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Frete</span>
          <span>R$ {Number(order.shippingPrice).toFixed(2).replace(".", ",")}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
          <span>Total</span>
          <span>R$ {Number(order.total).toFixed(2).replace(".", ",")}</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Cliente: {order.customer.name} · {order.customer.email}
      </p>

      {order.status === "pending_payment" && (
        <Link
          href={`/contato?assunto=pedido&mensagem=${encodeURIComponent(
            `Olá! Quero ajuda com o pedido ${order.id}.`
          )}`}
          className="btn-primary mt-8 inline-flex rounded-full"
        >
          Falar com atendimento
        </Link>
      )}
    </section>
  );
}

export default function PedidoPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto flex min-h-[50vh] items-center justify-center">
          <Loader2 className="animate-spin text-accent" size={28} />
        </section>
      }
    >
      <PedidoInner />
    </Suspense>
  );
}
