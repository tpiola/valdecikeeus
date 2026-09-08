import { Metadata } from "next";
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

export default async function ColecaoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; filtro?: string; busca?: string }>;
}) {
  const { categoria, filtro, busca } = await searchParams;

  let products = PRODUCTS;
  let title = "Coleção Completa";
  let subtitle = `${PRODUCTS.length} produtos disponíveis`;

  if (categoria === "slides") {
    products = products.filter((p) => p.category === "slides");
    title = "Slides";
    subtitle = "Faixa larga, do 34 ao 45";
  } else if (categoria === "flipflops") {
    products = products.filter((p) => p.category === "flipflops");
    title = "Flip Flops";
    subtitle = "Chinelo de dedo, do 34 ao 45";
  } else if (categoria === "premium") {
    products = products.filter((p) => p.category === "premium");
    title = "Premium";
    subtitle = "Edições especiais Keeus";
  } else if (categoria === "kits") {
    products = products.filter((p) => p.category === "kits");
    title = "Kits Keeus";
    subtitle = "Dois pares com preço de kit — viagem ou presente";
  }
  if (filtro === "novos") {
    products = products.filter((p) => p.isNew);
    title = "Lançamentos";
    subtitle = "Os mais recentes chinelos Keeus";
  }
  if (filtro === "oferta") {
    const now = Date.now();
    products = products.filter(
      (p) =>
        Boolean(p.flashSaleEndsAt) &&
        Boolean(p.originalPrice) &&
        new Date(p.flashSaleEndsAt!).getTime() > now
    );
    title = "Oferta relâmpago";
    subtitle = products.length
      ? `${products.length} modelo(s) com preço de oferta e prazo real`
      : "Nenhuma oferta ativa no momento";
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
    subtitle = products.length ? `${products.length} modelo(s) encontrado(s)` : "Nenhum modelo encontrado. Tente outra cor ou nome.";
  }

  return (
    <ProductGrid
      title={title}
      subtitle={subtitle}
      products={products}
    />
  );
}
