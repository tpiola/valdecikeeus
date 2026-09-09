import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/constants";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata: Metadata = {
  title: "Coleção",
  description:
    "Coleção Keeus: slides, chinelos de dedo e kits. Fotos reais, numeração 34–45 e frete cotado pelo CEP.",
  alternates: { canonical: `${SITE.url}/colecao` },
  openGraph: {
    title: "Coleção Keeus — Slide e Chinelo de Dedo",
    description: "Slides, chinelos de dedo e kits com prazo real de entrega.",
    url: `${SITE.url}/colecao`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Coleção Keeus" }],
  },
};

const CATEGORY_TABS = [
  { key: "", label: "Tudo", href: "/colecao" },
  { key: "slides", label: "Slides", href: "/colecao?categoria=slides" },
  { key: "flipflops", label: "Chinelo de dedo", href: "/colecao?categoria=flipflops" },
  { key: "kits", label: "Kits", href: "/colecao?categoria=kits" },
  { key: "novos", label: "Lançamentos", href: "/colecao?filtro=novos" },
  { key: "oferta", label: "Em oferta", href: "/colecao?filtro=oferta" },
];

export default async function ColecaoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; filtro?: string; busca?: string }>;
}) {
  const { categoria, filtro, busca } = await searchParams;

  let products = PRODUCTS;
  let title = "Coleção Completa";
  let subtitle = `${PRODUCTS.length} produtos disponíveis`;
  let activeTab = "";

  if (categoria === "slides") {
    products = products.filter((p) => p.category === "slides");
    title = "Slides";
    subtitle = "Faixa larga, do 34 ao 45";
    activeTab = "slides";
  } else if (categoria === "flipflops") {
    products = products.filter((p) => p.category === "flipflops");
    title = "Chinelos de dedo";
    subtitle = "O clássico do verão, do 34 ao 45";
    activeTab = "flipflops";
  } else if (categoria === "premium") {
    products = products.filter((p) => p.category === "premium");
    title = "Edições especiais";
    subtitle = "Seleção premium Keeus";
  } else if (categoria === "kits") {
    products = products.filter((p) => p.category === "kits");
    title = "Kits Keeus";
    subtitle = "Dois pares com preço de kit — viagem ou presente";
    activeTab = "kits";
  }
  if (filtro === "novos") {
    products = products.filter((p) => p.isNew);
    title = "Lançamentos";
    subtitle = "Os mais recentes chinelos Keeus";
    activeTab = "novos";
  }
  if (filtro === "oferta") {
    const now = Date.now();
    products = products.filter(
      (p) =>
        Boolean(p.flashSaleEndsAt) &&
        Boolean(p.originalPrice) &&
        new Date(p.flashSaleEndsAt!).getTime() > now
    );
    title = "Em oferta";
    subtitle = products.length
      ? `${products.length === 1 ? "1 modelo" : `${products.length} modelos`} com preço de oferta e prazo real`
      : "Nenhuma oferta ativa no momento";
    activeTab = "oferta";
  }
  if (filtro === "edicao-limitada") {
    products = products.filter((p) => p.isLimitedEdition);
    title = "Edições Limitadas";
    subtitle = "Modelos sinalizados como edição limitada";
  }
  if (busca?.trim()) {
    const term = busca.trim().toLocaleLowerCase("pt-BR");
    products = products.filter((product) =>
      [product.name, product.category, product.description].join(" ").toLocaleLowerCase("pt-BR").includes(term)
    );
    title = `Resultados para “${busca.trim()}”`;
    subtitle = products.length
      ? products.length === 1
        ? "1 modelo encontrado"
        : `${products.length} modelos encontrados`
      : "Nenhum modelo encontrado. Tente outra cor ou nome.";
    activeTab = "";
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: `${SITE.url}/colecao`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 24).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/produto/${p.slug}`,
      name: p.name,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Coleção", item: `${SITE.url}/colecao` },
    ],
  };

  // Busca ativa esconde os chips (o resultado é específico)
  const showTabs = !busca?.trim();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 pt-10 md:px-8">
        <nav className="breadcrumb" aria-label="Trilha de navegação">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Coleção</span>
        </nav>

        {showTabs && (
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoria">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <Link
                  key={tab.key}
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-sm"
                      : "border-border bg-white text-stone-600 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <ProductGrid title={title} subtitle={subtitle} products={products} headingAs="h1" />
    </>
  );
}
