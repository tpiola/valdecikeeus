import { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/constants";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata: Metadata = {
  title: `Coleção | ${SITE.name}`,
  description: "Conheça todos os calçados da Keeus disponíveis para compra.",
};

export default async function ColecaoPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; filtro?: string }>;
}) {
  const { categoria, filtro } = await searchParams;

  let products = PRODUCTS;
  if (categoria) {
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
      subtitle={`${products.length} modelos disponíveis`}
      products={products}
    />
  );
}
