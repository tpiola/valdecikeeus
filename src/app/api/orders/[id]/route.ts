import { NextRequest, NextResponse } from "next/server";
import {
  getOrderRepository,
  getPersistenceUnavailableMessage,
} from "@/lib/commerce";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const token =
    req.nextUrl.searchParams.get("token") ||
    req.headers.get("x-order-token") ||
    req.cookies.get(`keeus_ot_${id}`)?.value ||
    "";

  if (!id || !token) {
    return NextResponse.json(
      { error: "id e token são obrigatórios" },
      { status: 400, headers: { "Cache-Control": "no-store" } }
    );
  }

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

  const order = await orders.getByIdAndToken(id, token);
  if (!order) {
    return NextResponse.json(
      { error: "Pedido não encontrado" },
      { status: 404, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    {
      id: order.id,
      status: order.status,
      items: order.items,
      subtotal: order.subtotal,
      shippingPrice: order.shippingPrice,
      total: order.total,
      shipping: order.shipping,
      customer: {
        name: order.customer.name,
        email: order.customer.email,
      },
      createdAt: order.createdAt,
      paidAt: order.paidAt,
      payment: {
        preferenceId: order.mercadopagoPreferenceId ?? null,
        paid: order.status === "paid",
      },
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
