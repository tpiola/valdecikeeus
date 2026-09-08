import { NextRequest, NextResponse } from "next/server";
import { quoteFrete } from "@/lib/shipping/quote";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cep = searchParams.get("cep") ?? "";
  const valorPedido = parseFloat(searchParams.get("valor") ?? "0") || 0;

  const resultado = await quoteFrete(cep, valorPedido);
  if ("error" in resultado) {
    return NextResponse.json(
      { error: resultado.error },
      { status: resultado.status, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(resultado, {
    headers: { "Cache-Control": "private, max-age=300" },
  });
}
