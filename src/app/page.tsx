"use client";
import Script from "next/script";
import { ScrollReveal, TiltCard } from "@/components/motion/ScrollReveal";
import ProductStrip from "@/components/home/ProductStrip";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import SocialProof from "@/components/home/SocialProof";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import SummerDivider from "@/components/ui/SummerDivider";
import { PRODUCTS, getFeaturedProducts, getNewArrivals, getChinelos } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 8);
  const featured = getFeaturedProducts();
  const chinelos = getChinelos();

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
    name: "Catálogo de Chuteiras",
    itemListElement: PRODUCTS.slice(0, 6).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        description: p.description,
        image: `${SITE.url}${p.image}`,
        offers: {
          "@type": "Offer",
          price: p.price.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/produto/${p.slug}`,
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

      {/* Strip de chuteiras */}
      <ProductStrip />

      {/* Hero */}
      <Hero />

      {/* Barra de confiança */}
      <TrustBar />

      <SummerDivider />

      {/* Lançamentos */}
      <ProductGrid
        title="Lançamentos"
        subtitle="As chuteiras mais recentes do mercado"
        products={newArrivals}
        viewAllHref="/colecao?filtro=lancamentos"
      />

      {/* Depoimentos */}
      <SocialProof />

      <SummerDivider />

      {/* Destaques */}
      <ProductGrid
        title="Mais Vendidas"
        subtitle="As preferidas de quem joga bola todo fim de semana"
        products={featured}
        viewAllHref="/colecao"
      />

      <SummerDivider />

      {/* Chinelos */}
      <ProductGrid
        title="Chinelos Premium"
        subtitle="Do vestiário para a rua — conforto que vai além do campo"
        products={chinelos}
        viewAllHref="/colecao?categoria=chinelo"
      />

      <SummerDivider />

      {/* Newsletter */}
      <LeadCapture />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
