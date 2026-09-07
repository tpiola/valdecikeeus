export type ProductCategory = "slides" | "flipflops" | "premium";

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
}
