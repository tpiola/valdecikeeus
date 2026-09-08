import { PRODUCTS } from "@/lib/products";
import { buildSku, distributeStock } from "./sku";
import type { ProductVariantStock } from "./types";

/** Build in-memory / seed variant rows from the static catalog. */
export function buildVariantsFromCatalog(): ProductVariantStock[] {
  const rows: ProductVariantStock[] = [];
  for (const product of PRODUCTS) {
    const perSize = distributeStock(product.stock, product.sizes);
    product.sizes.forEach((size, i) => {
      rows.push({
        productId: product.id,
        slug: product.slug,
        size,
        sku: buildSku(product.slug, size),
        stock: perSize[i] ?? 0,
        reserved: 0,
      });
    });
  }
  return rows;
}

export function getCatalogProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
