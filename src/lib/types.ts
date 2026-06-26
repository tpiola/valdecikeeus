export type CourseCategory =
  | "farmacia"
  | "negocios"
  | "tecnologia"
  | "marketing"
  | "gastronomia"
  | "design";

export type CourseLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface Course {
  id: number;
  slug: string;
  name: string;
  category: CourseCategory;
  price: number;
  instructor: string;
  duration: string;
  level: CourseLevel;
  students: number;
  rating: number;
  description: string;
  image: string;
  modules: string[];
  certificate: boolean;
}

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
