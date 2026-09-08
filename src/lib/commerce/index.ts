import {
  canPersistOrders,
  getCommerceConfig,
  isDatabaseConfigured,
  isDevFileAdapterEnabled,
  isMercadoPagoConfigured,
  isSupabaseConfigured,
} from "./config";
import { FileOrderRepository, FileProductRepository } from "./file-adapter";
import { MemoryProductRepository } from "./memory-stock";
import type { OrderRepository, ProductRepository } from "./repositories";
import { SupabaseOrderRepository, SupabaseProductRepository } from "./supabase-adapter";

export * from "./types";
export * from "./config";
export * from "./sku";
export * from "./catalog";
export type { ProductRepository, OrderRepository, CreateOrderInput } from "./repositories";
export { stockAvailable } from "./memory-stock";

let productRepo: ProductRepository | null = null;
let orderRepo: OrderRepository | null = null;

export function getProductRepository(): ProductRepository {
  if (productRepo) return productRepo;
  if (isSupabaseConfigured()) {
    productRepo = new SupabaseProductRepository();
  } else if (isDevFileAdapterEnabled()) {
    productRepo = new FileProductRepository();
  } else {
    productRepo = new MemoryProductRepository();
  }
  return productRepo;
}

/**
 * Returns OrderRepository when persistence is available.
 * Production without DB → null (API should 503).
 */
export function getOrderRepository(): OrderRepository | null {
  if (!canPersistOrders()) return null;
  if (orderRepo) return orderRepo;

  if (isSupabaseConfigured()) {
    const products = getProductRepository();
    orderRepo = new SupabaseOrderRepository(products);
  } else if (isDevFileAdapterEnabled()) {
    const products = getProductRepository();
    orderRepo = new FileOrderRepository(products);
  }
  return orderRepo;
}

export function getPersistenceUnavailableMessage(): string {
  return (
    "Pedidos ainda não estão persistidos neste ambiente. " +
    "Configure SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (veja docs/commerce-setup.md) " +
    "ou rode em NODE_ENV=development para usar o adaptador local em data/."
  );
}

export function commerceStatus() {
  return {
    ...getCommerceConfig(),
    canPersistOrders: canPersistOrders(),
    supabase: isSupabaseConfigured(),
    databaseConfigured: isDatabaseConfigured(),
    mercadopago: isMercadoPagoConfigured(),
  };
}
