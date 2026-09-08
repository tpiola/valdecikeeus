import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  getOrderRepository,
  getPersistenceUnavailableMessage,
  isMercadoPagoConfigured,
} from "@/lib/commerce";

/**
 * Mercado Pago webhook stub.
 * - Verifies x-signature when MERCADOPAGO_WEBHOOK_SECRET is set.
 * - Marks order paid + decrements stock ONLY after MP reports approved payment.
 * - Never invents payment success.
 */

function verifySignature(req: NextRequest, rawBody: string): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) return false;

  const xSignature = req.headers.get("x-signature") || "";
  const xRequestId = req.headers.get("x-request-id") || "";
  // MP sends: ts=...,v1=...
  const parts = Object.fromEntries(
    xSignature.split(",").map((p) => {
      const [k, v] = p.trim().split("=");
      return [k, v];
    })
  );
  const ts = parts.ts;
  const hash = parts.v1;
  if (!ts || !hash) return false;

  const dataId =
    req.nextUrl.searchParams.get("data.id") ||
    req.nextUrl.searchParams.get("id") ||
    "";

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  try {
    const a = Buffer.from(expected, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    // Fallback string compare if hex parse fails
    return expected === hash;
  }
}

async function fetchPayment(paymentId: string) {
  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(`MP payment fetch failed: ${res.status}`);
  }
  return (await res.json()) as {
    id: number;
    status: string;
    external_reference?: string;
  };
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  let body: {
    type?: string;
    action?: string;
    data?: { id?: string };
    live_mode?: boolean;
  } = {};
  try {
    body = JSON.parse(rawBody) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const hasSecret = Boolean(secret);
  const signatureOk = hasSecret ? verifySignature(req, rawBody) : false;

  if (hasSecret && !signatureOk) {
    return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
  }

  // Production without webhook secret: refuse to mutate order status
  if (!hasSecret && process.env.NODE_ENV === "production") {
    console.warn(
      "[mp-webhook] MERCADOPAGO_WEBHOOK_SECRET ausente — ignorando mutação em produção"
    );
    return NextResponse.json({
      ok: true,
      ignored: true,
      reason: "webhook_secret_missing_in_production",
    });
  }

  if (!isMercadoPagoConfigured()) {
    return NextResponse.json({
      ok: true,
      ignored: true,
      reason: "mercadopago_not_configured",
    });
  }

  const orders = getOrderRepository();
  if (!orders) {
    return NextResponse.json(
      { error: "orders_unavailable", message: getPersistenceUnavailableMessage() },
      { status: 503 }
    );
  }

  const topic = body.type || body.action || "";
  const paymentId = body.data?.id;
  if (!paymentId || !(topic.includes("payment") || topic === "payment")) {
    return NextResponse.json({ ok: true, ignored: true, reason: "not_a_payment_event" });
  }

  try {
    const payment = await fetchPayment(paymentId);
    const orderId = payment.external_reference;
    if (!orderId) {
      return NextResponse.json({ ok: true, ignored: true, reason: "no_external_reference" });
    }

    if (payment.status === "approved") {
      const updated = await orders.updateStatus(orderId, "paid", {
        mercadopagoPaymentId: String(payment.id),
        paidAt: new Date().toISOString(),
      });
      return NextResponse.json({
        ok: true,
        orderId,
        status: updated?.status ?? "paid",
        stockDecremented: true,
      });
    }

    // pending / in_process / rejected — do not mark paid, do not decrement stock
    return NextResponse.json({
      ok: true,
      orderId,
      mpStatus: payment.status,
      orderMutated: false,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "webhook_error";
    console.error("[mp-webhook]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
