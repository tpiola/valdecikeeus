import { Product } from "./types";

// ══════════════════════════════════════════════════════════════════
// ── KEEUS CHINELOS PREMIUM — COLEÇÃO VERÃO ─────────────────────
// ══════════════════════════════════════════════════════════════════

const IMG = (path: string) => `/assets/real/produtos/${path}`;

export const PRODUCTS: Product[] = [
  // ── BAHAMAS ────────────────────────────────────────────────
  {
    id: 1,
    slug: "bahamas-cafe-cafe",
    name: "Keeus Bahamas Café",
    category: "slides",
    brand: "Keeus",
    price: 149.9,
    installmentPrice: 37.48,
    installments: 4,
    stock: 50,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["#8B7355", "#1A1A1A"],
    description:
      "Slide de faixa larga na cor café. Palmilha anatômica de EVA, solado que não derrapa. Usa no dia a dia, no trabalho e em casa — combina com roupa clara e escura.",
    image: IMG("bahamas-cafe-cafe/2k/1.png"),
    gallery: [
      IMG("bahamas-cafe-cafe/2k/1.png"),
      IMG("bahamas-cafe-cafe/2k/2.png"),
      IMG("bahamas-cafe-cafe/2k/3.png"),
      IMG("bahamas-cafe-cafe/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 179.9,
  },
  {
    id: 2,
    slug: "bahamas-preto-azul",
    name: "Keeus Bahamas Preto Azul",
    category: "slides",
    brand: "Keeus",
    price: 149.9,
    installmentPrice: 37.48,
    installments: 4,
    stock: 35,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["#1A1A1A", "#003399"],
    description:
      "Slide de faixa larga preto com detalhe azul. Mesma palmilha anatômica dos outros Bahamas, solado de boa aderência. Vai bem na rua e no pós-banho.",
    image: IMG("bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-1.png"),
    gallery: [
      IMG("bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-1.png"),
      IMG("bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-2.png"),
      IMG("bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-34511-bahamas-cafe-cafe-bco-laranja-3.png"),
      IMG("bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-4-bahamas-cafe-cafe-bco-laranja-4.png"),
    ],
    angleCount: 4,
    originalPrice: 179.9,
  },
  {
    id: 3,
    slug: "bahamas-preto-preto",
    name: "Keeus Bahamas Preto",
    category: "slides",
    brand: "Keeus",
    price: 139.9,
    installmentPrice: 34.98,
    installments: 4,
    stock: 45,
    isLowStock: false,
    isNew: false,
    isLimitedEdition: false,
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["#1A1A1A"],
    description:
      "O Bahamas todo preto. Faixa larga, palmilha anatômica de EVA, solado antiderrapante. É o modelo mais discreto da linha — serve pra tudo, sem chamar atenção.",
    image: IMG("bahamas-preto-preto/2k/1.png"),
    gallery: [
      IMG("bahamas-preto-preto/2k/1.png"),
      IMG("bahamas-preto-preto/2k/2.png"),
      IMG("bahamas-preto-preto/2k/3.png"),
      IMG("bahamas-preto-preto/2k/4.png"),
    ],
    angleCount: 4,
  },

  // ── MALIBU ──────────────────────────────────────────────────
  {
    id: 4,
    slug: "malibu-cafe-cafe",
    name: "Keeus Malibu Café",
    category: "flipflops",
    brand: "Keeus",
    price: 129.9,
    installmentPrice: 32.48,
    installments: 4,
    stock: 40,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    colors: ["#8B7355", "#1A1A1A"],
    description:
      "Chinelo de dedo com tira na cor café. Tira de TPU flexível, palmilha anatômica e solado macio. Feito pra praia, piscina e dia quente.",
    image: IMG("malibu-cafe-cafe/2k/1.png"),
    gallery: [
      IMG("malibu-cafe-cafe/2k/1.png"),
      IMG("malibu-cafe-cafe/2k/2.png"),
      IMG("malibu-cafe-cafe/2k/3.png"),
      IMG("malibu-cafe-cafe/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 149.9,
  },
  {
    id: 5,
    slug: "malibu-preto-preto",
    name: "Keeus Malibu Preto",
    category: "flipflops",
    brand: "Keeus",
    price: 119.9,
    installmentPrice: 29.98,
    installments: 4,
    stock: 60,
    isLowStock: false,
    isNew: false,
    isLimitedEdition: false,
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["#1A1A1A"],
    description:
      "O chinelo de dedo preto da linha. Tira anatômica de TPU, palmilha de EVA macia, solado antiderrapante. Leve, seca rápido e não faz barulho no pé.",
    image: IMG("malibu-preto-preto/2k/1.png"),
    gallery: [
      IMG("malibu-preto-preto/2k/1.png"),
      IMG("malibu-preto-preto/2k/2.png"),
      IMG("malibu-preto-preto/2k/3.png"),
      IMG("malibu-preto-preto/2k/4.png"),
    ],
    angleCount: 4,
  },
  {
    id: 6,
    slug: "malibu-mel-cafe",
    name: "Keeus Malibu Mel Café",
    category: "flipflops",
    brand: "Keeus",
    price: 129.9,
    installmentPrice: 32.48,
    installments: 4,
    stock: 30,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    colors: ["#D4A574", "#8B7355"],
    description:
      "Chinelo de dedo com tira mel e base café. Tira de TPU flexível, palmilha anatômica e solado macio. A combinação mais vendida da linha Malibu.",
    image: IMG("malibu-mel-cafe/2k/1.png"),
    gallery: [
      IMG("malibu-mel-cafe/2k/1.png"),
      IMG("malibu-mel-cafe/2k/2.png"),
      IMG("malibu-mel-cafe/2k/3.png"),
      IMG("malibu-mel-cafe/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 149.9,
  },
  {
    id: 7,
    slug: "malibu-cafe-cafe-meli",
    name: "Keeus Malibu Café Meli",
    category: "flipflops",
    brand: "Keeus",
    price: 139.9,
    installmentPrice: 34.98,
    installments: 4,
    stock: 25,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    colors: ["#8B7355", "#C4956A"],
    description:
      "O Malibu com detalhe laranja Keeus. Mesmo caimento e mesma palmilha dos outros Malibu, com um toque de cor na tira. Edição especial da coleção.",
    image: IMG("malibu-cafe-cafe-meli/2k/1.png"),
    gallery: [
      IMG("malibu-cafe-cafe-meli/2k/1.png"),
      IMG("malibu-cafe-cafe-meli/2k/2.png"),
      IMG("malibu-cafe-cafe-meli/2k/3.png"),
      IMG("malibu-cafe-cafe-meli/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 159.9,
  },
  {
    id: 8,
    slug: "malibu-mel-cafe-meli",
    name: "Keeus Malibu Mel Meli",
    category: "flipflops",
    brand: "Keeus",
    price: 139.9,
    installmentPrice: 34.98,
    installments: 4,
    stock: 12,
    isLowStock: true,
    isNew: true,
    isLimitedEdition: false,
    flashSaleEndsAt: "2026-09-13T02:59:59.000Z",
    sizes: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    colors: ["#D4A574", "#FF5F1F"],
    description:
      "Tira mel com detalhe laranja. Chinelo de dedo com palmilha anatômica e solado antiderrapante. Se você quer um chinelo que dá pra achar num churrasco, é esse.",
    image: IMG("malibu-mel-cafe-meli/2k/1.png"),
    gallery: [
      IMG("malibu-mel-cafe-meli/2k/1.png"),
      IMG("malibu-mel-cafe-meli/2k/2.png"),
      IMG("malibu-mel-cafe-meli/2k/3.png"),
      IMG("malibu-mel-cafe-meli/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 159.9,
  },

  // ── TOLEDO ──────────────────────────────────────────────────
  {
    id: 9,
    slug: "toledo-cafe-cafe",
    name: "Keeus Toledo Café",
    category: "slides",
    brand: "Keeus",
    price: 169.9,
    installmentPrice: 42.48,
    installments: 4,
    stock: 30,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["#8B7355", "#1A1A1A"],
    description:
      "Slide de faixa larga texturizada na cor café. Palmilha de EVA de dupla densidade, solado mais robusto. Pra quem usa o dia inteiro e quer um chinelo que aguenta.",
    image: IMG("toledo-cafe-cafe/2k/1.png"),
    gallery: [
      IMG("toledo-cafe-cafe/2k/1.png"),
      IMG("toledo-cafe-cafe/2k/2.png"),
      IMG("toledo-cafe-cafe/2k/3.png"),
      IMG("toledo-cafe-cafe/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 199.9,
  },
  {
    id: 10,
    slug: "toledo-preto-laranja",
    name: "Keeus Toledo Preto Laranja",
    category: "slides",
    brand: "Keeus",
    price: 179.9,
    installmentPrice: 44.98,
    installments: 4,
    stock: 18,
    isLowStock: true,
    isNew: true,
    isLimitedEdition: true,
    flashSaleEndsAt: "2026-09-13T02:59:59.000Z",
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["#1A1A1A", "#FF5F1F"],
    description:
      "Slide preto com a cor laranja da casa. Faixa larga de TPU, palmilha anatômica, solado com boa aderência. É o modelo que mais chama atenção da coleção.",
    image: IMG("toledo-preto-laranja/2k/1.png"),
    gallery: [
      IMG("toledo-preto-laranja/2k/1.png"),
      IMG("toledo-preto-laranja/2k/2.png"),
      IMG("toledo-preto-laranja/2k/3.png"),
      IMG("toledo-preto-laranja/2k/4.png"),
    ],
    angleCount: 4,
    originalPrice: 219.9,
  },
  {
    id: 11,
    slug: "toledo-preto-preto",
    name: "Keeus Toledo Preto",
    category: "slides",
    brand: "Keeus",
    price: 159.9,
    installmentPrice: 39.98,
    installments: 4,
    stock: 35,
    isLowStock: false,
    isNew: false,
    isLimitedEdition: false,
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    colors: ["#1A1A1A"],
    description:
      "O Toledo na versão toda preta. Faixa larga de TPU, palmilha anatômica, solado antiderrapante. Sem estampa, sem firula — só o chinelo.",
    image: IMG("toledo-preto-preto/2k/1.png"),
    gallery: [
      IMG("toledo-preto-preto/2k/1.png"),
      IMG("toledo-preto-preto/2k/2.png"),
      IMG("toledo-preto-preto/2k/3.png"),
      IMG("toledo-preto-preto/2k/4.png"),
    ],
    angleCount: 4,
  },

  // ── KITS ────────────────────────────────────────────────────
  {
    id: 12,
    slug: "kit-viagem",
    name: "Kit Viagem Keeus",
    category: "kits",
    brand: "Keeus",
    price: 269.9,
    installmentPrice: 67.48,
    installments: 4,
    stock: 14,
    isLowStock: true,
    isNew: true,
    isLimitedEdition: false,
    flashSaleEndsAt: "2026-09-13T02:59:59.000Z",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    colors: ["#1A1A1A", "#FF5F1F", "#D4A574"],
    description:
      "Dois pares pra mala: o Toledo Preto Laranja (slide) e o Malibu Mel Café (chinelo de dedo). Um pra rua e hotel, outro pra praia e piscina. Mesmo tamanho nos dois — escolha o número e pronto.",
    image: IMG("toledo-preto-laranja/2k/1.png"),
    gallery: [
      IMG("toledo-preto-laranja/2k/1.png"),
      IMG("malibu-mel-cafe/2k/1.png"),
      IMG("toledo-preto-laranja/2k/2.png"),
      IMG("malibu-mel-cafe/2k/2.png"),
    ],
    angleCount: 4,
    originalPrice: 309.8,
    kitItems: ["toledo-preto-laranja", "malibu-mel-cafe"],
  },
  {
    id: 13,
    slug: "kit-presente",
    name: "Kit Presente Keeus",
    category: "kits",
    brand: "Keeus",
    price: 229.9,
    installmentPrice: 57.48,
    installments: 4,
    stock: 25,
    isLowStock: false,
    isNew: true,
    isLimitedEdition: false,
    sizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    colors: ["#1A1A1A"],
    description:
      "O clássico preto em dobro: Bahamas Preto (slide) + Malibu Preto (chinelo de dedo). Presente sem firula — foto real, tamanho pra escolher e preço de kit, sem surpresa.",
    image: IMG("bahamas-preto-preto/2k/1.png"),
    gallery: [
      IMG("bahamas-preto-preto/2k/1.png"),
      IMG("malibu-preto-preto/2k/1.png"),
      IMG("bahamas-preto-preto/2k/2.png"),
      IMG("malibu-preto-preto/2k/2.png"),
    ],
    angleCount: 4,
    originalPrice: 259.8,
    kitItems: ["bahamas-preto-preto", "malibu-preto-preto"],
  },
];

// ─── HELPERS ────────────────────────────────────────────────────────

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getFeaturedProducts = () => PRODUCTS.filter(p => p.isNew).slice(0, 6);

export const getNewArrivals = () => PRODUCTS.filter((p) => p.isNew);

export const getProductsByCategory = (category: Product["category"]) =>
  PRODUCTS.filter((p) => p.category === category);

export const getSlides = () => PRODUCTS.filter((p) => p.category === "slides");

export const getFlipFlops = () => PRODUCTS.filter((p) => p.category === "flipflops");

export const getKits = () => PRODUCTS.filter((p) => p.category === "kits");

export const getKitContents = (product: Product) =>
  (product.kitItems ?? [])
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

export const getFlashSaleProducts = () =>
  PRODUCTS.filter(
    (p) =>
      Boolean(p.flashSaleEndsAt) &&
      Boolean(p.originalPrice) &&
      new Date(p.flashSaleEndsAt!).getTime() > Date.now()
  );

