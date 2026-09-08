import { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/constants";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata: Metadata = {
  title: `Coleção | ${SITE.name}`,
  description: "Explore a coleção Keeus de slides e chinelos de dedo. Compare modelos, cores, tamanhos e preços.",
  openGraph: {
    title: "Coleção Keeus — Slide e Chinelo de Dedo",
    description: "Slides, flip flops e lançamentos exclusivos.",
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
    subtitle = "Conforto e estilo premium em cada passo";
  } else if (categoria === "flipflops") {
    products = products.filter((p) => p.category === "flipflops");
    title = "Flip Flops";
    subtitle = "Leveza e frescor para o verão";
  } else if (categoria === "premium") {
    products = products.filter((p) => p.category === "premium");
    title = "Premium";
    subtitle = "Edições exclusivas e limitadas";
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
