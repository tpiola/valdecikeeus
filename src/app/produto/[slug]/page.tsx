import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/constants";
import ProductDetail from "@/components/product/ProductDetail";
import { getProductRepository, stockAvailable } from "@/lib/commerce";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const tipo =
    product.category === "slides"
      ? "Slide"
      : product.category === "flipflops"
        ? "Chinelo de dedo"
        : product.category === "kits"
          ? "Kit"
          : "Produto";
  return {
    title: `${product.name}`,
    description: `${tipo} Keeus — ${product.description.slice(0, 140)}`,
    alternates: { canonical: `${SITE.url}/produto/${product.slug}` },
    openGraph: {
      title: `${product.name} | Keeus`,
      description: product.description,
      url: `${SITE.url}/produto/${product.slug}`,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  let sizeStock: Record<number, number> | undefined;
  try {
    const variants = await getProductRepository().getStockBySlug(slug);
    if (variants.length) {
      sizeStock = Object.fromEntries(
        variants.map((v) => [v.size, stockAvailable(v)])
      );
    }
  } catch {
    sizeStock = undefined;
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE.url}${product.image}`,
    sku: String(product.id),
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/produto/${product.slug}`,
      priceCurrency: "BRL",
      price: product.price.toFixed(2),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Keeus",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Coleção",
        item: `${SITE.url}/colecao`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${SITE.url}/produto/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetail product={product} sizeStock={sizeStock} />
    </>
  );
}
