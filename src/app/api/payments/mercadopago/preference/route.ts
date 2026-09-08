import { NextRequest, NextResponse } from "next/server";
import {
  getOrderRepository,
  getPersistenceUnavailableMessage,
  getSiteUrl,
  isMercadoPagoConfigured,
} from "@/lib/commerce";

/**
 * Creates a Mercado Pago Checkout Preference for an existing pending order.
 * Does NOT mark the order as paid.
 * Never puts accessToken in back_urls or metadata.
 */
export async function POST(req: NextRequest) {
  if (!isMercadoPagoConfigured()) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Mercado Pago não configurado. Defina MERCADOPAGO_ACCESS_TOKEN no ambiente. " +
          "Enquanto isso, finalize pelo atendimento (WhatsApp/contato).",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const orders = getOrderRepository();
  if (!orders) {
    return NextResponse.json(
      {
        configured: true,
        error: "orders_unavailable",
        message: getPersistenceUnavailableMessage(),
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  let body: { orderId?: string; accessToken?: string; preferredMethod?: "pix" | "card" };
  try {
    body = (await req.json()) as {
      orderId?: string;
      accessToken?: string;
      preferredMethod?: "pix" | "card";
    };
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body.orderId || !body.accessToken) {
    return NextResponse.json(
      { error: "orderId e accessToken são obrigatórios" },
      { status: 400 }
    );
  }

  const order = await orders.getByIdAndToken(body.orderId, body.accessToken);
  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
  }
  if (order.status !== "pending_payment") {
    return NextResponse.json(
      { error: `Pedido não está pendente de pagamento (status: ${order.status})` },
      { status: 409 }
    );
  }

  const site = getSiteUrl();
  const notificationUrl =
    process.env.MERCADOPAGO_WEBHOOK_URL || `${site}/api/payments/mercadopago/webhook`;

  const items = order.items.map((item) => ({
    id: item.sku,
    title: `${item.name} — tam. ${item.size}`,
    quantity: item.qty,
    unit_price: item.unitPrice,
    currency_id: "BRL",
  }));

  if (order.shippingPrice > 0) {
    items.push({
      id: "SHIPPING",
      title: order.shipping?.service ? `Frete ${order.shipping.service}` : "Frete",
      quantity: 1,
      unit_price: order.shippingPrice,
      currency_id: "BRL",
    });
  }

  const preferenceBody = {
    external_reference: order.id,
    metadata: { order_id: order.id },
    items,
    payer: {
      name: order.customer.name,
      email: order.customer.email,
      phone: { number: order.customer.phone },
    },
    // No accessToken in URLs — order cookie / client token covers status page
    back_urls: {
      success: `${site}/pedido/${order.id}?mp=success`,
      pending: `${site}/pedido/${order.id}?mp=pending`,
      failure: `${site}/pedido/${order.id}?mp=failure`,
    },
    auto_return: "approved" as const,
    notification_url: notificationUrl,
    statement_descriptor: "KEEUS",
    payment_methods: {
      excluded_payment_types: [{ id: "ticket" }],
    },
  };

  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preferenceBody),
  });

  if (!mpRes.ok) {
    const text = await mpRes.text();
    return NextResponse.json(
      {
        configured: true,
        error: "mercadopago_error",
        message: "Falha ao criar preferência no Mercado Pago",
        detail: text.slice(0, 500),
      },
      { status: 502 }
    );
  }

  const pref = (await mpRes.json()) as {
    id: string;
    init_point?: string;
    sandbox_init_point?: string;
  };

  await orders.updateStatus(order.id, "pending_payment", {
    mercadopagoPreferenceId: pref.id,
  });

  return NextResponse.json(
    {
      configured: true,
      preferenceId: pref.id,
      initPoint: pref.init_point,
      sandboxInitPoint: pref.sandbox_init_point,
      paid: false,
      orderStatus: "pending_payment",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
