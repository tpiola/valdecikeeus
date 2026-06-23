import { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/constants";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata: Metadata = {
  title: `Coleção | ${SITE.name}`,
  description: "Toda a coleção Keeus. Chuteiras e chinelos premium: Nike, Adidas, Puma, Mizuno, Umbro, Penalty e linha própria Keeus.",
};

export default async function ColecaoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; filtro?: string }>;
}) {
  const { categoria, filtro } = await searchParams;

  let products = PRODUCTS;
  if (categoria === "campo" || categoria === "society" || categoria === "futsal" || categoria === "chinelo") {
    products = products.filter((p) => p.category === categoria);
  }
  if (filtro === "lancamentos") {
    products = products.filter((p) => p.isNew);
  }
  if (filtro === "edicao-limitada") {
    products = products.filter((p) => p.isLimitedEdition);
  }

  return (
    <ProductGrid
      title="Coleção Keeus"
      subtitle={`${products.length} produtos disponíveis`}
      products={products}
    />
  );
}
