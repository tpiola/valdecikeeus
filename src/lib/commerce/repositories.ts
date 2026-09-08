import type {
  CartLineInput,
  CustomerInput,
  Order,
  OrderStatus,
  ProductVariantStock,
  ShippingQuoteInput,
} from "./types";

export interface ProductRepository {
  getVariant(slug: string, size: number): Promise<ProductVariantStock | null>;
  getStockBySlug(slug: string): Promise<ProductVariantStock[]>;
  /** Soft-hold: increase reserved without decrementing stock. */
  reserve(slug: string, size: number, qty: number): Promise<void>;
  /** Release soft-hold (cancel). */
  releaseReservation(slug: string, size: number, qty: number): Promise<void>;
  /**
   * Confirm payment: decrement stock and reserved by qty.
   * Stock policy: only called when order becomes `paid`.
   */
  confirmSale(slug: string, size: number, qty: number): Promise<void>;
}

export interface CreateOrderInput {
  items: CartLineInput[];
  customer: CustomerInput;
  shipping?: ShippingQuoteInput;
}

export interface OrderRepository {
  create(input: CreateOrderInput): Promise<Order>;
  getById(id: string): Promise<Order | null>;
  getByIdAndToken(id: string, token: string): Promise<Order | null>;
  list(limit?: number): Promise<Order[]>;
  updateStatus(
    id: string,
    status: OrderStatus,
    extra?: Partial<Pick<Order, "mercadopagoPreferenceId" | "mercadopagoPaymentId" | "paidAt">>
  ): Promise<Order | null>;
}
