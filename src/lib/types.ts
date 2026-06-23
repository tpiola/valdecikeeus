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
