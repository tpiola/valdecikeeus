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

  const missingHints = useMemo(() => {
    const hints: string[] = [];
    if (!customer.name.trim()) hints.push("nome");
    if (!customer.email.trim()) hints.push("e-mail");
    if (!customer.phone.trim()) hints.push("telefone");
    if (customer.address.cep.replace(/\D/g, "").length < 8) hints.push("CEP");
    if (!shipping) hints.push("frete (SEDEX ou PAC)");
    if (!customer.address.street.trim()) hints.push("rua");
    if (!customer.address.number.trim()) hints.push("número");
    if (!customer.address.neighborhood.trim()) hints.push("bairro");
    if (!customer.address.city.trim()) hints.push("cidade");
    if (!customer.address.state.trim()) hints.push("estado");
    return hints;
  }, [customer, shipping]);

  const canSubmit = missingHints.length === 0 && !busy;

  const clearCart = () => {
    if (typeof clear === "function") clear();
  };

  if (!items.length && step === "form") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <ShoppingBag size={40} className="text-accent" />
        <h1 className="mt-5 text-3xl font-semibold text-stone-900">Sua sacola está vazia</h1>
        <p className="mt-3 max-w-md text-muted">
          Adicione um modelo e escolha o tamanho para continuar.
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
      setError("Calcule o frete e selecione SEDEX ou PAC para continuar.");
      return;
    }
    if (missingHints.length) {
      setError(`Falta preencher: ${missingHints.join(", ")}.`);
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
        throw new Error(
          data.message ||
            data.error ||
            "Não foi possível criar o pedido agora. Tente de novo ou fale com o atendimento."
        );
      }
      setOrder(data.order);
      setPaymentConfigured(Boolean(data.paymentConfigured));
      setPaymentNote(data.message || null);
      setStep("summary");
      clearCart();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível criar o pedido. Tente de novo ou fale conosco."
      );
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
            "Pagamento online ainda não está ativo. Seu pedido já está registrado — finalize pelo atendimento."
        );
        return;
      }
      const url = data.initPoint || data.sandboxInitPoint;
      if (!url) {
        throw new Error("Não foi possível abrir o pagamento. Tente de novo ou fale com o atendimento.");
      }
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Pedido reservado</p>
        <h1 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">
          Quase lá — finalize o pagamento
        </h1>
        <p className="mt-3 text-muted">
          Status: <strong className="text-foreground">aguardando pagamento</strong>. Nada foi
          cobrado ainda.
        </p>

        <CheckoutHoldTimer orderId={order.id} />

        <div className="mt-8 rounded-2xl border border-border bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted">Número do pedido</p>
              <p className="font-mono text-sm font-semibold">{order.id}</p>
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
            {order.shipping?.days != null && order.shipping.days > 0 && (
              <p className="text-xs font-medium text-accent">
                Chega em {order.shipping.days}{" "}
                {order.shipping.days === 1 ? "dia útil" : "dias úteis"}
              </p>
            )}
            <div className="flex justify-between font-semibold">
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

  const inputClass =
    "mt-1.5 w-full min-h-12 rounded-lg border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-accent md:text-sm";

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 pb-32 md:px-8 md:py-16 md:pb-16">
      <Link
        href="/colecao"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-accent"
      >
        <ArrowLeft size={16} /> Continuar comprando
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="checkout-progress -mx-4 mb-6 border-b border-border bg-white/95 px-4 py-3 md:-mx-0 md:rounded-xl md:border md:px-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Checkout</p>
            <p className="mt-1 text-xs text-stone-600">
              {missingHints.length
                ? `Passo atual — falta: ${missingHints.slice(0, 3).join(", ")}`
                : "Pronto para criar o pedido · Pix ou cartão na próxima etapa"}
            </p>
          </div>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">Finalize sua compra</h1>
          <p className="mt-2 text-sm text-muted">
            Dados → frete com prazo real → Pix ou cartão. Sem boleto.
          </p>

          <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white">
            {items.map((item) => (
              <li key={`${item.product.slug}-${item.size}`} className="flex gap-4 p-4 md:p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface md:h-24 md:w-24">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/produto/${item.product.slug}`} className="font-semibold hover:text-accent">
                    {item.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    Tamanho {item.size} · Qtd {item.quantity}
                  </p>
                  <p className="mt-2 font-semibold">
                    R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <form id="checkout-form" onSubmit={createOrder} className="mt-8 space-y-6">
            {/* 1. Contato — minimal first */}
            <div className="rounded-2xl border border-border bg-white p-5 md:p-6">
              <h2 className="text-lg font-semibold text-stone-900">1. Seus dados</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">Nome completo</span>
                  <input
                    required
                    autoComplete="name"
                    className={inputClass}
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">E-mail</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    className={inputClass}
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">WhatsApp</span>
                  <input
                    required
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className={inputClass}
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                </label>
              </div>
            </div>

            {/* 2. Frete early — CEP first */}
            <div className="rounded-2xl border border-border bg-white p-5 md:p-6">
              <h2 className="text-lg font-semibold text-stone-900">2. Frete e prazo</h2>
              <p className="mt-1 text-xs text-muted">
                Informe o CEP para ver SEDEX e PAC com prazo em dias úteis.
              </p>
              <label className="mt-4 block text-sm">
                <span className="font-semibold">CEP</span>
                <input
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                  className={inputClass}
                  value={customer.address.cep}
                  onChange={(e) => {
                    const cep = e.target.value;
                    setCustomer({
                      ...customer,
                      address: { ...customer.address, cep },
                    });
                    setShipping(null);
                  }}
                />
              </label>
              <div className="mt-4">
                <ShippingCalculator
                  key={customer.address.cep.replace(/\D/g, "").slice(0, 8) || "cep"}
                  productPrice={subtotal}
                  initialCep={customer.address.cep}
                  compact
                  autoCalculate
                  selectedService={shipping?.service ?? null}
                  onSelect={(quote) => {
                    setShipping(quote);
                    setError(null);
                    if (quote.cep && !customer.address.cep) {
                      setCustomer((c) => ({
                        ...c,
                        address: { ...c.address, cep: quote.cep },
                      }));
                    }
                  }}
                />
              </div>
              {shipping?.days != null && shipping.days > 0 && (
                <p className="mt-3 text-sm font-semibold text-accent" aria-live="polite">
                  Chega em {shipping.days} {shipping.days === 1 ? "dia útil" : "dias úteis"} via{" "}
                  {shipping.service}
                </p>
              )}
            </div>

            {/* 3. Endereço restante */}
            <div className="rounded-2xl border border-border bg-white p-5 md:p-6">
              <h2 className="text-lg font-semibold text-stone-900">3. Endereço de entrega</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm sm:col-span-2">
                  <span className="font-semibold">Rua</span>
                  <input
                    required
                    autoComplete="address-line1"
                    className={inputClass}
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
                    className={inputClass}
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
                  <span className="font-semibold">
                    Complemento <span className="font-normal text-muted">(opcional)</span>
                  </span>
                  <input
                    autoComplete="address-line2"
                    className={inputClass}
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
                    className={inputClass}
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
                    autoComplete="address-level2"
                    className={inputClass}
                    value={customer.address.city}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        address: { ...customer.address, city: e.target.value },
                      })
                    }
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold">Estado (UF)</span>
                  <input
                    required
                    maxLength={2}
                    autoComplete="address-level1"
                    className={`${inputClass} uppercase`}
                    value={customer.address.state}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        address: { ...customer.address, state: e.target.value },
                      })
                    }
                  />
                </label>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                {error}
              </p>
            )}

            {!canSubmit && missingHints.length > 0 && (
              <p className="text-xs text-stone-500">
                Para continuar, falta: <span className="font-medium text-stone-700">{missingHints.join(", ")}</span>
              </p>
            )}

            {/* Desktop submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="hidden w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 text-sm font-semibold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50 md:flex"
            >
              {busy ? <Loader2 className="animate-spin" size={18} /> : null}
              {canSubmit
                ? "Continuar para pagamento"
                : missingHints[0]
                  ? ("Falta: " + missingHints[0])
                  : "Preencha os dados"}
            </button>
            <p className="hidden text-xs text-muted md:block">
              Criar o pedido não cobra nada. Você escolhe Pix ou cartão na próxima etapa.
            </p>
          </form>
        </div>

        <aside className="hidden h-fit rounded-2xl border border-border bg-stone-50 p-6 lg:sticky lg:top-28 lg:block">
          <h2 className="text-lg font-semibold text-stone-900">Resumo</h2>
          <div className="mt-5 space-y-3 border-b border-border pb-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <strong>R$ {subtotal.toFixed(2).replace(".", ",")}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">
                Frete{shipping?.service ? ` (${shipping.service})` : ""}
              </span>
              <strong>
                {shipping ? `R$ ${shippingPrice.toFixed(2).replace(".", ",")}` : "—"}
              </strong>
            </div>
            {shipping?.days != null && shipping.days > 0 && (
              <p className="text-xs font-semibold text-accent">
                Chega em {shipping.days} {shipping.days === 1 ? "dia útil" : "dias úteis"}
              </p>
            )}
          </div>
          <div className="mt-5 flex justify-between text-base">
            <span className="text-muted">Total</span>
            <strong className="text-stone-900">R$ {orderTotal.toFixed(2).replace(".", ",")}</strong>
          </div>
          <div className="mt-5 space-y-2 text-sm text-stone-600">
            <p className="flex items-center gap-2">
              <QrCode size={14} className="text-accent" /> Pix
            </p>
            <p className="flex items-center gap-2">
              <CreditCard size={14} className="text-accent" /> Cartão de crédito
            </p>
            <p className="pt-1 text-xs text-muted">Sem boleto. Checkout via Mercado Pago.</p>
          </div>
          <Link
            href="/contato?assunto=pedido"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-stone-900 hover:border-accent"
          >
            <MessageCircle size={16} /> Atendimento
          </Link>
          <div className="mt-5 flex gap-2 text-xs text-muted">
            <CheckCircle2 size={16} className="shrink-0 text-accent" />
            Nada é cobrado ao criar o pedido.
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA */}
      <div className="pdp-sticky-bar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pt-3 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-lg flex-col gap-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted">Total</span>
            <span className="text-base font-semibold text-stone-900">
              R$ {orderTotal.toFixed(2).replace(".", ",")}
            </span>
          </div>
          {shipping?.days != null && shipping.days > 0 && (
            <p className="text-[11px] font-medium text-accent">
              Chega em {shipping.days} dias úteis · {shipping.service}
            </p>
          )}
          <p className="text-center text-[11px] text-muted">Pix ou cartão · frete pelo CEP · sem boleto</p>
          <button
            type="submit"
            form="checkout-form"
            disabled={!canSubmit}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? <Loader2 className="animate-spin" size={18} /> : null}
            {canSubmit
              ? "Continuar para pagamento"
              : missingHints[0]
                ? `Falta: ${missingHints[0]}`
                : "Preencha os dados"}
          </button>
        </div>
      </div>
    </section>
  );
}
