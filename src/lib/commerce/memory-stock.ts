/**
 * Read-only stock view derived from products.ts when no DB / file adapter.
 * Used on PDP to disable sizes gracefully without credentials.
 * Does NOT persist orders — order creation still requires DB or dev adapter.
 */
import { buildVariantsFromCatalog } from "./catalog";
import type { ProductRepository } from "./repositories";
import type { ProductVariantStock } from "./types";

const CACHE = buildVariantsFromCatalog();

function available(row: ProductVariantStock): number {
  return Math.max(0, row.stock - row.reserved);
}

export class MemoryProductRepository implements ProductRepository {
  async getVariant(slug: string, size: number): Promise<ProductVariantStock | null> {
    return CACHE.find((r) => r.slug === slug && r.size === size) ?? null;
  }

  async getStockBySlug(slug: string): Promise<ProductVariantStock[]> {
    return CACHE.filter((r) => r.slug === slug);
  }

  async reserve(): Promise<void> {
    throw new Error("Persistência de pedidos indisponível sem banco configurado");
  }

  async releaseReservation(): Promise<void> {
    /* no-op */
  }

  async confirmSale(): Promise<void> {
    throw new Error("Persistência de pedidos indisponível sem banco configurado");
  }
}

export function stockAvailable(row: ProductVariantStock | null | undefined): number {
  if (!row) return 0;
  return available(row);
}
