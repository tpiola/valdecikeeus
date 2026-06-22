import Script from "next/script";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import SocialProof from "@/components/home/SocialProof";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import { PRODUCTS } from "@/lib/products";
import { FAQ_ITEMS } from "@/lib/constants";

export default function Home() {
  const newArrivals = PRODUCTS.filter((p) => p.isNew);
  const bestSellers = PRODUCTS.slice(0, 3);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <TrustBar />
      <ProductGrid
        title="Lançamentos"
        subtitle="Os modelos mais recentes da Keeus"
        products={newArrivals}
      />
      <SocialProof />
      <ProductGrid
        title="Mais vendidos"
        subtitle="Escolhidos por quem já é Keeus"
        products={bestSellers}
      />
      <LeadCapture />
      <FaqSection />
    </>
  );
}
