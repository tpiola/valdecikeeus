"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ShoppingBag,
  MessageCircle,
  QrCode,
  CreditCard,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import ShippingCalculator, {
  type SelectedShippingQuote,
} from "@/components/product/ShippingCalculator";
import PaymentMethods, { type PayMethod } from "@/components/checkout/PaymentMethods";
import CheckoutHoldTimer from "@/components/conversion/CheckoutHoldTimer";
import ShippingCutoff from "@/components/conversion/ShippingCutoff";
import TrustStrip from "@/components/conversion/TrustStrip";

type CreatedOrder = {
  id: string;
  accessToken: string;
  status: string;
  total: number;
  subtotal: number;
  shippingPrice: number;
  shipping?: {
    cep?: string;
    service?: string;
    carrier?: string;
    price: number;
    days?: number;
  };
};

type Step = "form" | "summary";

const emptyAddress = {
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  cep: "",
};

export default function CheckoutPage() {
  const { items, total, clear } = useCartStore();
  const [step, setStep] = useState<Step>("form");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentNote, setPaymentNote] = useState<string | null>(null);
  const [paymentConfigured, setPaymentConfigured] = useState(false);
  const [order, setOrder] = useState<CreatedOrder | null>(null);
  const [shipping, setShipping] = useState<SelectedShippingQuote | null>(null);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: emptyAddress,
  });

  const subtotal = useMemo(() => total(), [items, total]);
  const shippingPrice = shipping?.price ?? 0;
  const orderTotal = Number((subtotal + shippingPrice).toFixed(2));

  const clearCart = () => {
    if (typeof clear === "function") clear();
  };

  if (!items.length && step === "form") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <ShoppingBag size={40} className="text-accent" />
        <h1 className="mt-5 text-3xl font-bold">Sua sacola está vazia</h1>
        <p className="mt-3 max-w-md text-muted">
          Adicione um modelo e escolha o tamanho para continuar com a compra.
        </p>
        <Link href="/colecao" className="btn-primary mt-8 rounded-full">
          Ver coleção
        </Link>
      </section>
    );
  }

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!shipping) {
      setError("Calcule o frete e selecione SEDEX ou PAC antes de criar o pedido.");
      return;
    }
    setBusy(true);
    setError(null);
    setPaymentNote(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.product.slug,
            size: i.size,
            qty: i.quantity,
          })),
          customer,
          shipping: {
            id: shipping.id,
            cep: shipping.cep,
            service: shipping.service,
            carrier: shipping.carrier,
            price: shipping.price,
            days: shipping.days,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Não foi possível criar o pedido");
      }
      setOrder(data.order);
      setPaymentConfigured(Boolean(data.paymentConfigured));
      setPaymentNote(data.message || null);
      setStep("summary");
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível criar o pedido. Tente de novo.");
    } finally {
      setBusy(false);
    }
  }

  async function startMercadoPago(_method: PayMethod = "pix") {
    if (!order) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/mercadopago/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          accessToken: order.accessToken,
          preferredMethod: _method,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.configured) {
        setPaymentConfigured(false);
        setPaymentNote(
          data.message ||
            "Pagamento online ainda não está ativo. Finalize pelo atendimento — seu pedido já está registrado."
        );
        return;
      }
      const url = data.initPoint || data.sandboxInitPoint;
      if (!url) throw new Error("Não foi possível abrir o checkout. Tente de novo ou fale com o atendimento.");
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o pagamento");
    } finally {
      setBusy(false);
    }
  }

  if (step === "summary" && order) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Pedido reservado</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Quase lá — finalize o pagamento</h1>
        <p className="mt-3 text-muted">
          Status: <strong className="text-foreground">aguardando pagamento</strong>. Nada foi cobrado ainda.
        </p>

        <CheckoutHoldTimer orderId={order.id} />

        <div className="mt-8 rounded-2xl border border-border bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted">Número do pedido</p>
              <p className="font-mono text-sm font-bold">{order.id}</p>
            </div>
            <Link
              href={`/pedido/${order.id}?token=${order.accessToken}`}
              className="text-sm font-semibold text-accent underline underline-offset-2"
            >
              Ver status do pedido
            </Link>
          </div>
          <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>R$ {order.subtotal.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">
                Frete
                {order.shipping?.service ? ` (${order.shipping.service})` : ""}
              </span>
              <span>R$ {order.shippingPrice.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <strong>R$ {order.total.toFixed(2).replace(".", ",")}</strong>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <TrustStrip />
        </div>
        <div className="mt-4">
          <ShippingCutoff />
        </div>

        <PaymentMethods
          orderId={order.id}
          accessToken={order.accessToken}
          paymentConfigured={paymentConfigured}
          paymentNote={paymentNote}
          busy={busy}
          error={error}
          onPay={startMercadoPago}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
      <Link
        href="/colecao"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent"
      >
        <ArrowLeft size={16} /> Continuar comprando
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Checkout</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Finalize sua compra</h1>
          <p className="mt-2 text-sm text-muted">Confira os itens, informe o endereço e siga para Pix ou cartão.</p>

          <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
            {items.map((item) => (
              <li key={`${item.product.slug}-${item.size}`} className="flex gap-4 p-4 md:p-6">
                <div className="relative h-24 w-24 shrink-0 rounded-xl bg-surface">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/produto/${item.product.slug}`} className="font-bold hover:text-accent">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    Tamanho {item.size} · Quantidade {item.quantity}
                  </p>
                  <p className="mt-3 font-bold">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={createOrder} className="mt-8 space-y-4 rounded-2xl border border-border bg-white p-6">
            <h2 className="text-lg font-bold">Endereço de entrega</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm sm:col-span-2">
                <span className="font-semibold">Nome</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">E-mail</span>
                <input
                  required
                  type="email"
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Telefone / WhatsApp</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">CEP</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.address.cep}
                  onChange={(e) => {
                    const cep = e.target.value;
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, cep },
                    });
                    // Clear selected frete when CEP changes
                    setShipping(null);
                  }}
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Estado</span>
                <input
                  required
                  maxLength={2}
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3 uppercase"
                  value={customer.address.state}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, state: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="font-semibold">Rua</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.address.street}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, street: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Número</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.address.number}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, number: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Complemento</span>
                <input
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.address.complement}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, complement: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Bairro</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.address.neighborhood}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, neighborhood: e.target.value },
                    })
                  }
                />
              </label>
              <label className="block text-sm">
                <span className="font-semibold">Cidade</span>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-3"
                  value={customer.address.city}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, city: e.target.value },
                    })
                  }
                />
              </label>
            </div>

            <div className="rounded-2xl border border-border bg-surface/60 p-4">
              <h3 className="text-sm font-bold">Frete</h3>
              <p className="mt-1 text-xs text-muted">
                O frete da PDP não carrega automaticamente — calcule e escolha o serviço aqui.
              </p>
              <div className="mt-3">
                <ShippingCalculator
                  key={customer.address.cep.replace(/\D/g, "").slice(0, 8) || "cep"}
                  productPrice={subtotal}
                  initialCep={customer.address.cep}
                  compact
                  selectedService={shipping?.service ?? null}
                  onSelect={(quote) => {
                    setShipping(quote);
                    setError(null);
                  }}
                />
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !shipping}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 text-sm font-bold text-white hover:bg-accent-hover disabled:opacity-60"
            >
              {busy ? <Loader2 className="animate-spin" size={18} /> : null}
              Continuar para pagamento
            </button>
            <p className="text-xs text-muted">
              Em produção sem banco, a API responde 503 com instruções. Em desenvolvimento local,
              pedidos vão para <code>data/orders.json</code>.
            </p>
          </form>
        </div>

        <aside className="h-fit rounded-2xl bg-[#171512] p-6 text-white lg:sticky lg:top-32">
          <h2 className="text-lg font-bold text-white">Resumo</h2>
          <div className="mt-5 space-y-3 border-b border-white/10 pb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Subtotal</span>
              <strong>R$ {subtotal.toFixed(2).replace(".", ",")}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">
                Frete{shipping?.service ? ` (${shipping.service})` : ""}
              </span>
              <strong>
                {shipping
                  ? `R$ ${shippingPrice.toFixed(2).replace(".", ",")}`
                  : "—"}
              </strong>
            </div>
            {shipping?.days != null && (
              <p className="text-xs text-white/50">Prazo estimado: {shipping.days} dias úteis</p>
            )}
          </div>
          <div className="mt-5 flex justify-between text-base">
            <span className="text-white/70">Total</span>
            <strong>R$ {orderTotal.toFixed(2).replace(".", ",")}</strong>
          </div>
          <div className="mt-5 space-y-2 text-sm text-white/60">
            <p className="flex items-center gap-2">
              <QrCode size={14} className="text-[#ff8a55]" /> Pix — aprovação na hora
            </p>
            <p className="flex items-center gap-2">
              <CreditCard size={14} className="text-[#ff8a55]" /> Cartão de crédito
            </p>
            <p className="pt-1 text-xs text-white/45">
              Checkout seguro via Mercado Pago. Se o pagamento online estiver off, finalizamos no atendimento.
            </p>
          </div>
          <Link
            href="/contato?assunto=pedido"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white hover:border-accent"
          >
            <MessageCircle size={16} /> Ir para atendimento
          </Link>
          <div className="mt-5 flex gap-2 text-xs text-white/50">
            <CheckCircle2 size={16} className="shrink-0 text-[#ff8a55]" />
            Criar o pedido não cobra nada. Você só paga na próxima etapa.
          </div>
        </aside>
      </div>
    </section>
  );
}
