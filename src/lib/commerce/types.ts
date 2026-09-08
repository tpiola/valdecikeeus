/** Commerce domain types — independent of storage adapter. */

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "cancelled"
  | "fulfilled"
  | "refunded";

export interface CustomerInput {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
}

export interface CartLineInput {
  slug: string;
  size: number;
  qty: number;
}

export interface ShippingQuoteInput {
  id?: string;
  service?: string;
  price: number;
  days?: number;
}

export interface ProductVariantStock {
  productId: number;
  slug: string;
  size: number;
  sku: string;
  /** Units available for sale (not yet paid-decremented). */
  stock: number;
  /** Soft-hold for pending_payment orders; stock decremented only on paid. */
  reserved: number;
}

export interface OrderItem {
  slug: string;
  productId: number;
  name: string;
  size: number;
  sku: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  /** Public access token — required with id for GET /api/orders/[id] */
  accessToken: string;
  status: OrderStatus;
  customer: CustomerInput;
  items: OrderItem[];
  subtotal: number;
  shippingPrice: number;
  total: number;
  shipping?: ShippingQuoteInput;
  mercadopagoPreferenceId?: string | null;
  mercadopagoPaymentId?: string | null;
  createdAt: string;
  updatedAt: string;
  paidAt?: string | null;
}

export interface CreateOrderResult {
  order: Order;
  nextStep: "pay_mercadopago" | "configure_payment" | "contact_atendimento";
  paymentConfigured: boolean;
}

export interface CommerceConfig {
  databaseConfigured: boolean;
  mercadopagoConfigured: boolean;
  isDevFileAdapter: boolean;
}
