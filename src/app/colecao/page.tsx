import { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/constants";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata: Metadata = {
  title: `Coleção | ${SITE.name}`,
  description: "Explore toda a coleção Keeus de chinelos premium. Slides, flip flops e lançamentos exclusivos. Frete grátis Brasil.",
  openGraph: {
    title: "Coleção Keeus — Chinelos Premium",
    description: "Slides, flip flops e lançamentos exclusivos.",
  },
};

export default async function ColecaoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; filtro?: string }>;
}) {
  const { categoria, filtro } = await searchParams;

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
  }
  if (filtro === "novos") {
    products = products.filter((p) => p.isNew);
    title = "Lançamentos";
    subtitle = "Os mais recentes chinelos Keeus";
  }
  if (filtro === "edicao-limitada") {
    products = products.filter((p) => p.isLimitedEdition);
    title = "Edições Limitadas";
    subtitle = "Exclusividade em cada par";
  }

  return (
    <ProductGrid
      title={title}
      subtitle={subtitle}
      products={products}
    />
  );
}
