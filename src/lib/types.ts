export type ProductCategory = "slides" | "flipflops" | "premium" | "kits";

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  installmentPrice: number;
  installments: number;
  stock: number;
  isLowStock: boolean;
  isNew: boolean;
  isLimitedEdition: boolean;
  sizes: number[];
  colors: string[];
  description: string;
  image: string;
  gallery: string[];
  angleCount: number;
  originalPrice?: number;
  /** Slugs dos pares inclusos quando category === "kits" */
  kitItems?: string[];
  /** ISO deadline da oferta relâmpago deste SKU (opcional) */
  flashSaleEndsAt?: string;
}
