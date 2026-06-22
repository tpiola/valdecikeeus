export interface Product {
  id: number;
  slug: string;
  name: string;
  category: "masculino" | "feminino" | "unissex";
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
