import { NextRequest, NextResponse } from "next/server";
import {
  getOrderRepository,
  getPersistenceUnavailableMessage,
  isMercadoPagoConfigured,
} from "@/lib/commerce";
import type { CartLineInput, CustomerInput, ShippingQuoteInput } from "@/lib/commerce";

type Body = {
  items?: CartLineInput[];
  customer?: CustomerInput;
  shipping?: ShippingQuoteInput;
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

export async function POST(req: NextRequest) {
  const orders = getOrderRepository();
  if (!orders) {
    return NextResponse.json(
      {
        error: "orders_unavailable",
        message: getPersistenceUnavailableMessage(),
      },
      { status: 503 }
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

  if (body.shipping) {
    if (typeof body.shipping.price !== "number" || body.shipping.price < 0 || Number.isNaN(body.shipping.price)) {
      return NextResponse.json({ error: "Frete inválido" }, { status: 400 });
    }
  }

  try {
    const order = await orders.create({
      items: body.items,
      customer: body.customer,
      shipping: body.shipping,
    });

    const paymentConfigured = isMercadoPagoConfigured();
    const nextStep = paymentConfigured
      ? ("pay_mercadopago" as const)
      : ("configure_payment" as const);

    return NextResponse.json(
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
        // Honest: no money moved yet — order is pending_payment
        message: paymentConfigured
          ? "Pedido criado. Prossiga para o pagamento Mercado Pago."
          : "Pedido criado como pendente. Pagamento online ainda não configurado — use atendimento ou configure MERCADOPAGO_ACCESS_TOKEN.",
      },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Falha ao criar pedido";
    const status = message.includes("estoque") || message.includes("Estoque") || message.includes("Sem estoque")
      ? 409
      : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
