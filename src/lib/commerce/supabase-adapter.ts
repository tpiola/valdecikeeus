/**
 * Thin Supabase REST stub (PostgREST) — no @supabase/supabase-js dependency.
 * Activated when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set.
 */
import { randomBytes, randomUUID } from "crypto";
import { getCatalogProduct } from "./catalog";
import { getSupabaseServiceKey, getSupabaseUrl } from "./config";
import type { CreateOrderInput, OrderRepository, ProductRepository } from "./repositories";
import { buildSku } from "./sku";
import type {
  CustomerInput,
  Order,
  OrderItem,
  OrderStatus,
  ProductVariantStock,
} from "./types";

type DbVariant = {
  product_id: number;
  slug: string;
  size: number;
  sku: string;
  stock: number;
  reserved: number;
};

type DbOrder = {
  id: string;
  access_token: string;
  status: OrderStatus;
  customer: CustomerInput;
  subtotal: number;
  shipping_price: number;
  total: number;
  shipping: Order["shipping"] | null;
  mercadopago_preference_id: string | null;
  mercadopago_payment_id: string | null;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
};

type DbOrderItem = {
  order_id: string;
  slug: string;
  product_id: number;
  name: string;
  size: number;
  sku: string;
  qty: number;
  unit_price: number;
  line_total: number;
};

function requireConfig() {
  const url = getSupabaseUrl();
  const key = getSupabaseServiceKey();
  if (!url || !key) throw new Error("Supabase não configurado");
  return { url: url.replace(/\/$/, ""), key };
}

async function sbFetch<T>(
  path: string,
  init: RequestInit & { prefer?: string } = {}
): Promise<T> {
  const { url, key } = requireConfig();
  const headers: Record<string, string> = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (init.prefer) headers.Prefer = init.prefer;
  const res = await fetch(`${url}/rest/v1/${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

function mapVariant(row: DbVariant): ProductVariantStock {
  return {
    productId: row.product_id,
    slug: row.slug,
    size: row.size,
    sku: row.sku,
    stock: row.stock,
    reserved: row.reserved,
  };
}

function available(row: ProductVariantStock): number {
  return Math.max(0, row.stock - row.reserved);
}

function mapOrder(row: DbOrder, items: OrderItem[]): Order {
  return {
    id: row.id,
    accessToken: row.access_token,
    status: row.status,
    customer: row.customer,
    items,
    subtotal: Number(row.subtotal),
    shippingPrice: Number(row.shipping_price),
    total: Number(row.total),
    shipping: row.shipping ?? undefined,
    mercadopagoPreferenceId: row.mercadopago_preference_id,
    mercadopagoPaymentId: row.mercadopago_payment_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    paidAt: row.paid_at,
  };
}

function mapItem(row: DbOrderItem): OrderItem {
  return {
    slug: row.slug,
    productId: row.product_id,
    name: row.name,
    size: row.size,
    sku: row.sku,
    qty: row.qty,
    unitPrice: Number(row.unit_price),
    lineTotal: Number(row.line_total),
  };
}

export class SupabaseProductRepository implements ProductRepository {
  async getVariant(slug: string, size: number): Promise<ProductVariantStock | null> {
    const rows = await sbFetch<DbVariant[]>(
      `product_variants?slug=eq.${encodeURIComponent(slug)}&size=eq.${size}&select=*`
    );
    return rows[0] ? mapVariant(rows[0]) : null;
  }

  async getStockBySlug(slug: string): Promise<ProductVariantStock[]> {
    const rows = await sbFetch<DbVariant[]>(
      `product_variants?slug=eq.${encodeURIComponent(slug)}&select=*&order=size.asc`
    );
    return rows.map(mapVariant);
  }

  async reserve(slug: string, size: number, qty: number): Promise<void> {
    const variant = await this.getVariant(slug, size);
    if (!variant || available(variant) < qty) {
      throw new Error(`Estoque insuficiente para ${slug} tamanho ${size}`);
    }
    await sbFetch(
      `product_variants?slug=eq.${encodeURIComponent(slug)}&size=eq.${size}`,
      {
        method: "PATCH",
        body: JSON.stringify({ reserved: variant.reserved + qty }),
        prefer: "return=minimal",
      }
    );
  }

  async releaseReservation(slug: string, size: number, qty: number): Promise<void> {
    const variant = await this.getVariant(slug, size);
    if (!variant) return;
    await sbFetch(
      `product_variants?slug=eq.${encodeURIComponent(slug)}&size=eq.${size}`,
      {
        method: "PATCH",
        body: JSON.stringify({ reserved: Math.max(0, variant.reserved - qty) }),
        prefer: "return=minimal",
      }
    );
  }

  async confirmSale(slug: string, size: number, qty: number): Promise<void> {
    const variant = await this.getVariant(slug, size);
    if (!variant) throw new Error(`Variante não encontrada: ${slug} / ${size}`);
    await sbFetch(
      `product_variants?slug=eq.${encodeURIComponent(slug)}&size=eq.${size}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          stock: Math.max(0, variant.stock - qty),
          reserved: Math.max(0, variant.reserved - qty),
        }),
        prefer: "return=minimal",
      }
    );
  }
}

export class SupabaseOrderRepository implements OrderRepository {
  constructor(private products: ProductRepository) {}

  private async loadItems(orderId: string): Promise<OrderItem[]> {
    const rows = await sbFetch<DbOrderItem[]>(
      `order_items?order_id=eq.${orderId}&select=*`
    );
    return rows.map(mapItem);
  }

  async create(input: CreateOrderInput): Promise<Order> {
    if (!input.items?.length) throw new Error("Carrinho vazio");
    if (!input.customer?.name || !input.customer?.email || !input.customer?.phone) {
      throw new Error("Dados do cliente incompletos");
    }

    const orderItems: OrderItem[] = [];
    for (const line of input.items) {
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

    for (const item of orderItems) {
      await this.products.reserve(item.slug, item.size, item.qty);
    }

    const subtotal = Number(orderItems.reduce((s, i) => s + i.lineTotal, 0).toFixed(2));
    const shippingPrice = Number((input.shipping?.price ?? 0).toFixed(2));
    const id = randomUUID();
    const accessToken = randomBytes(24).toString("hex");
    const now = new Date().toISOString();

    const dbOrder: DbOrder = {
      id,
      access_token: accessToken,
      status: "pending_payment",
      customer: input.customer,
      subtotal,
      shipping_price: shippingPrice,
      total: Number((subtotal + shippingPrice).toFixed(2)),
      shipping: input.shipping ?? null,
      mercadopago_preference_id: null,
      mercadopago_payment_id: null,
      created_at: now,
      updated_at: now,
      paid_at: null,
    };

    try {
      await sbFetch("orders", {
        method: "POST",
        body: JSON.stringify(dbOrder),
        prefer: "return=minimal",
      });
      await sbFetch("order_items", {
        method: "POST",
        body: JSON.stringify(
          orderItems.map((i) => ({
            order_id: id,
            slug: i.slug,
            product_id: i.productId,
            name: i.name,
            size: i.size,
            sku: i.sku,
            qty: i.qty,
            unit_price: i.unitPrice,
            line_total: i.lineTotal,
          }))
        ),
        prefer: "return=minimal",
      });
    } catch (err) {
      for (const item of orderItems) {
        await this.products.releaseReservation(item.slug, item.size, item.qty);
      }
      throw err;
    }

    return mapOrder(dbOrder, orderItems);
  }

  async getById(id: string): Promise<Order | null> {
    const rows = await sbFetch<DbOrder[]>(`orders?id=eq.${id}&select=*`);
    if (!rows[0]) return null;
    const items = await this.loadItems(id);
    return mapOrder(rows[0], items);
  }

  async getByIdAndToken(id: string, token: string): Promise<Order | null> {
    const order = await this.getById(id);
    if (!order || order.accessToken !== token) return null;
    return order;
  }

  async list(limit = 50): Promise<Order[]> {
    const rows = await sbFetch<DbOrder[]>(
      `orders?select=*&order=created_at.desc&limit=${limit}`
    );
    const result: Order[] = [];
    for (const row of rows) {
      const items = await this.loadItems(row.id);
      result.push(mapOrder(row, items));
    }
    return result;
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    extra?: Partial<Pick<Order, "mercadopagoPreferenceId" | "mercadopagoPaymentId" | "paidAt">>
  ): Promise<Order | null> {
    const prev = await this.getById(id);
    if (!prev) return null;

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

    const patch: Record<string, unknown> = {
      status,
      updated_at: new Date().toISOString(),
    };
    if (extra?.mercadopagoPreferenceId !== undefined) {
      patch.mercadopago_preference_id = extra.mercadopagoPreferenceId;
    }
    if (extra?.mercadopagoPaymentId !== undefined) {
      patch.mercadopago_payment_id = extra.mercadopagoPaymentId;
    }
    if (extra?.paidAt !== undefined) {
      patch.paid_at = extra.paidAt;
    }

    await sbFetch(`orders?id=eq.${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
      prefer: "return=minimal",
    });
    return this.getById(id);
  }
}
