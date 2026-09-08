/**
 * Dev/local file adapter — ONLY used when NODE_ENV=development and
 * Supabase/DATABASE_URL are not configured.
 * Never rely on this on Vercel (ephemeral filesystem).
 */
import { randomBytes, randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { PRODUCTS } from "@/lib/products";
import { buildVariantsFromCatalog, getCatalogProduct } from "./catalog";
import type { CreateOrderInput, OrderRepository, ProductRepository } from "./repositories";
import { buildSku } from "./sku";
import type { Order, OrderItem, OrderStatus, ProductVariantStock } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const STOCK_FILE = path.join(DATA_DIR, "stock.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, data: unknown) {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

async function loadStock(): Promise<ProductVariantStock[]> {
  const existing = await readJson<ProductVariantStock[] | null>(STOCK_FILE, null);
  if (existing && existing.length > 0) return existing;
  const seeded = buildVariantsFromCatalog();
  await writeJson(STOCK_FILE, seeded);
  return seeded;
}

async function saveStock(rows: ProductVariantStock[]) {
  await writeJson(STOCK_FILE, rows);
}

function available(row: ProductVariantStock): number {
  return Math.max(0, row.stock - row.reserved);
}

export class FileProductRepository implements ProductRepository {
  async getVariant(slug: string, size: number): Promise<ProductVariantStock | null> {
    const rows = await loadStock();
    return rows.find((r) => r.slug === slug && r.size === size) ?? null;
  }

  async getStockBySlug(slug: string): Promise<ProductVariantStock[]> {
    const rows = await loadStock();
    return rows.filter((r) => r.slug === slug);
  }

  async reserve(slug: string, size: number, qty: number): Promise<void> {
    const rows = await loadStock();
    const idx = rows.findIndex((r) => r.slug === slug && r.size === size);
    if (idx < 0) throw new Error(`Variante não encontrada: ${slug} / ${size}`);
    if (available(rows[idx]) < qty) {
      throw new Error(`Estoque insuficiente para ${slug} tamanho ${size}`);
    }
    rows[idx] = { ...rows[idx], reserved: rows[idx].reserved + qty };
    await saveStock(rows);
  }

  async releaseReservation(slug: string, size: number, qty: number): Promise<void> {
    const rows = await loadStock();
    const idx = rows.findIndex((r) => r.slug === slug && r.size === size);
    if (idx < 0) return;
    rows[idx] = {
      ...rows[idx],
      reserved: Math.max(0, rows[idx].reserved - qty),
    };
    await saveStock(rows);
  }

  async confirmSale(slug: string, size: number, qty: number): Promise<void> {
    const rows = await loadStock();
    const idx = rows.findIndex((r) => r.slug === slug && r.size === size);
    if (idx < 0) throw new Error(`Variante não encontrada: ${slug} / ${size}`);
    const row = rows[idx];
    rows[idx] = {
      ...row,
      stock: Math.max(0, row.stock - qty),
      reserved: Math.max(0, row.reserved - qty),
    };
    await saveStock(rows);
  }
}

export class FileOrderRepository implements OrderRepository {
  constructor(private products: ProductRepository) {}

  private async loadOrders(): Promise<Order[]> {
    return readJson<Order[]>(ORDERS_FILE, []);
  }

  private async saveOrders(orders: Order[]) {
    await writeJson(ORDERS_FILE, orders);
  }

  async create(input: CreateOrderInput): Promise<Order> {
    if (!input.items?.length) throw new Error("Carrinho vazio");
    if (!input.customer?.name || !input.customer?.email || !input.customer?.phone) {
      throw new Error("Dados do cliente incompletos");
    }

    const orderItems: OrderItem[] = [];
    for (const line of input.items) {
      if (!line.slug || !line.size || line.qty < 1) {
        throw new Error("Item inválido no carrinho");
      }
      const product = getCatalogProduct(line.slug);
      if (!product) throw new Error(`Produto não encontrado: ${line.slug}`);
      if (!product.sizes.includes(line.size)) {
        throw new Error(`Tamanho ${line.size} indisponível para ${product.name}`);
      }
      const variant = await this.products.getVariant(line.slug, line.size);
      if (!variant || available(variant) < line.qty) {
        throw new Error(`Sem estoque para ${product.name} tamanho ${line.size}`);
      }
      orderItems.push({
        slug: line.slug,
        productId: product.id,
        name: product.name,
        size: line.size,
        sku: variant.sku || buildSku(line.slug, line.size),
        qty: line.qty,
        unitPrice: product.price,
        lineTotal: Number((product.price * line.qty).toFixed(2)),
      });
    }

    // Soft-hold reservations (stock decremented only on paid)
    for (const item of orderItems) {
      await this.products.reserve(item.slug, item.size, item.qty);
    }

    const subtotal = Number(orderItems.reduce((s, i) => s + i.lineTotal, 0).toFixed(2));
    const shippingPrice = Number((input.shipping?.price ?? 0).toFixed(2));
    const now = new Date().toISOString();
    const order: Order = {
      id: randomUUID(),
      accessToken: randomBytes(24).toString("hex"),
      status: "pending_payment",
      customer: input.customer,
      items: orderItems,
      subtotal,
      shippingPrice,
      total: Number((subtotal + shippingPrice).toFixed(2)),
      shipping: input.shipping,
      mercadopagoPreferenceId: null,
      mercadopagoPaymentId: null,
      createdAt: now,
      updatedAt: now,
      paidAt: null,
    };

    const orders = await this.loadOrders();
    orders.unshift(order);
    await this.saveOrders(orders);
    return order;
  }

  async getById(id: string): Promise<Order | null> {
    const orders = await this.loadOrders();
    return orders.find((o) => o.id === id) ?? null;
  }

  async getByIdAndToken(id: string, token: string): Promise<Order | null> {
    const order = await this.getById(id);
    if (!order || order.accessToken !== token) return null;
    return order;
  }

  async list(limit = 50): Promise<Order[]> {
    const orders = await this.loadOrders();
    return orders.slice(0, limit);
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    extra?: Partial<Pick<Order, "mercadopagoPreferenceId" | "mercadopagoPaymentId" | "paidAt">>
  ): Promise<Order | null> {
    const orders = await this.loadOrders();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx < 0) return null;
    const prev = orders[idx];

    if (status === "paid" && prev.status !== "paid") {
      for (const item of prev.items) {
        await this.products.confirmSale(item.slug, item.size, item.qty);
      }
      extra = { ...extra, paidAt: extra?.paidAt ?? new Date().toISOString() };
    }

    if (status === "cancelled" && prev.status === "pending_payment") {
      for (const item of prev.items) {
        await this.products.releaseReservation(item.slug, item.size, item.qty);
      }
    }

    const updated: Order = {
      ...prev,
      ...extra,
      status,
      updatedAt: new Date().toISOString(),
    };
    orders[idx] = updated;
    await this.saveOrders(orders);
    return updated;
  }
}

/** Ensure catalog length stays in sync for sanity checks in seed scripts. */
export const CATALOG_PRODUCT_COUNT = PRODUCTS.length;
