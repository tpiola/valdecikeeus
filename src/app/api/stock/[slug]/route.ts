import { NextResponse } from "next/server";
import { getProductRepository, stockAvailable } from "@/lib/commerce";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;
  const products = getProductRepository();
  const variants = await products.getStockBySlug(slug);
  return NextResponse.json({
    slug,
    variants: variants.map((v) => ({
      size: v.size,
      sku: v.sku,
      stock: v.stock,
      reserved: v.reserved,
      available: stockAvailable(v),
    })),
  });
}
