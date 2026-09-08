import { NextRequest, NextResponse } from "next/server";
import {
  getOrderRepository,
  getPersistenceUnavailableMessage,
  isMercadoPagoConfigured,
} from "@/lib/commerce";
import type { CartLineInput, CustomerInput } from "@/lib/commerce";
import { getCatalogProduct } from "@/lib/commerce/catalog";
import { resolveShippingForOrder } from "@/lib/shipping/quote";

type Body = {
  items?: CartLineInput[];
  customer?: CustomerInput;
  shipping?: {
    id?: string;
    cep?: string;
    service?: string;
    carrier?: string;
    /** Client price is ignored — recalculated server-side. */
    price?: number;
    days?: number;
  };
};

function validateCustomer(customer: CustomerInput | undefined): string | null {
  if (!customer) return "Informe os dados do cliente";
  if (!customer.name?.trim()) return "Nome obrigatório";
  if (!customer.email?.trim() || !customer.email.includes("@")) return "E-mail inválido";
  if (!customer.phone?.trim()) return "Telefone obrigatório";
  const a = customer.address;
  if (!a?.street?.trim() || !a?.number?.trim() || !a?.city?.trim() || !a?.state?.trim() || !a?.cep?.trim()) {
    return "Endereço incompleto";
  }
  return null;
}

function cartSubtotal(items: CartLineInput[]): number | { error: string } {
  let sum = 0;
  for (const line of items) {
    if (!line.slug || !line.size || line.qty < 1) return { error: "Item inválido no carrinho" };
    const product = getCatalogProduct(line.slug);
    if (!product) return { error: `Produto não encontrado: ${line.slug}` };
    sum += product.price * line.qty;
  }
  return Number(sum.toFixed(2));
}

export async function POST(req: NextRequest) {
  const orders = getOrderRepository();
  if (!orders) {
    return NextResponse.json(
      {
        error: "orders_unavailable",
        message: getPersistenceUnavailableMessage(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body.items?.length) {
    return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
  }

  const customerError = validateCustomer(body.customer);
  if (customerError || !body.customer) {
    return NextResponse.json({ error: customerError || "Cliente inválido" }, { status: 400 });
  }

  if (!body.shipping?.service) {
    return NextResponse.json(
      { error: "Calcule o frete e selecione SEDEX ou PAC" },
      { status: 400 }
    );
  }

  const sub = cartSubtotal(body.items);
  if (typeof sub !== "number") {
    return NextResponse.json({ error: sub.error }, { status: 400 });
  }

  const cep = body.shipping.cep || body.customer.address.cep;
  const resolved = resolveShippingForOrder({
    cep,
    service: body.shipping.service,
    clientPrice: body.shipping.price,
    subtotal: sub,
    cidade: body.customer.address.city,
    estado: body.customer.address.state,
  });

  if (!resolved.ok) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  // Server-authoritative shipping — never persist client price
  const shipping = resolved.shipping;

  try {
    const order = await orders.create({
      items: body.items,
      customer: body.customer,
      shipping,
    });

    const paymentConfigured = isMercadoPagoConfigured();
    const nextStep = paymentConfigured
      ? ("pay_mercadopago" as const)
      : ("configure_payment" as const);

    const res = NextResponse.json(
      {
        order: {
          id: order.id,
          accessToken: order.accessToken,
          status: order.status,
          total: order.total,
          subtotal: order.subtotal,
          shippingPrice: order.shippingPrice,
          shipping: order.shipping ?? null,
          items: order.items,
          createdAt: order.createdAt,
        },
        nextStep,
        paymentConfigured,
        message: paymentConfigured
          ? "Pedido criado. Prossiga para o pagamento Mercado Pago."
          : "Pedido criado como pendente. Pagamento online ainda não configurado — use atendimento ou configure MERCADOPAGO_ACCESS_TOKEN.",
      },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );

    // Opaque order access cookie for MP back_urls without token in query
    res.cookies.set(`keeus_ot_${order.id}`, order.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Falha ao criar pedido";
    const status =
      message.includes("estoque") || message.includes("Estoque") || message.includes("Sem estoque")
        ? 409
        : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
