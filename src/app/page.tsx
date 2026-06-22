import Script from "next/script";
import ProductStrip from "@/components/home/ProductStrip";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import SocialProof from "@/components/home/SocialProof";
import SocialChannels from "@/components/home/SocialChannels";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import { PRODUCTS, getFeaturedProducts, getNewArrivals } from "@/lib/products";
import { FAQ_ITEMS } from "@/lib/constants";

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 8);
  const featured = getFeaturedProducts();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Coleção Keeus 2025",
    itemListElement: PRODUCTS.slice(0, 6).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.description,
        image: `https://www.keeus.com.br${p.image}`,
        offers: {
          "@type": "Offer",
          price: p.price.toFixed(2),
          priceCurrency: "BRL",
          availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `https://www.keeus.com.br/produto/${p.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="product-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />

      {/* Strip de produtos — montagem acima da hero */}
      <ProductStrip />

      {/* Hero com slider cinematográfico */}
      <Hero />

      {/* Barra de confiança */}
      <TrustBar />

      {/* Lançamentos */}
      <ProductGrid
        title="Lançamentos"
        subtitle="Os modelos mais recentes da coleção Keeus 2025"
        products={newArrivals}
        viewAllHref="/colecao?filtro=lancamentos"
      />

      {/* Depoimentos */}
      <SocialProof />

      {/* Mais vendidos */}
      <ProductGrid
        title="Mais Vendidos"
        subtitle="Os preferidos de quem já é Keeus"
        products={featured}
        viewAllHref="/colecao"
      />

      {/* Canais de venda: Shopee, Facebook, WhatsApp */}
      <SocialChannels />

      {/* Newsletter */}
      <LeadCapture />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
