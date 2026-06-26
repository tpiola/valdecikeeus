"use client";
import Script from "next/script";
import ProductStrip from "@/components/home/ProductStrip";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import SocialProof from "@/components/home/SocialProof";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import SummerDivider from "@/components/ui/SummerDivider";
import { PRODUCTS, getFeaturedProducts, getNewArrivals, getSlides, getFlipFlops } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 4);
  const featured = getFeaturedProducts();
  const slides = getSlides();
  const flipflops = getFlipFlops();

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
    name: "Chinelos Premium Keeus — Coleção Verão",
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

      {/* Strip de chinelos */}
      <ProductStrip />

      {/* Hero premium */}
      <Hero />

      {/* Barra de confiança */}
      <TrustBar />

      <SummerDivider />

      {/* Lançamentos */}
      <ProductGrid
        title="Lançamentos"
        subtitle="Os chinelos mais desejados da temporada"
        products={newArrivals}
        viewAllHref="/colecao?filtro=novos"
      />

      {/* Categoria Slides */}
      <ProductGrid
        title="Slides"
        subtitle="Conforto e estilo em cada passo"
        products={slides}
        viewAllHref="/colecao?categoria=slides"
      />

      {/* Categoria Flip Flops */}
      <ProductGrid
        title="Flip Flops"
        subtitle="Leveza e frescor para o verão"
        products={flipflops}
        viewAllHref="/colecao?categoria=flipflops"
      />

      {/* Depoimentos */}
      <SocialProof />

      <SummerDivider />

      {/* Por que Keeus — seção de diferenciais */}
      <section className="bg-white px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-foreground md:text-4xl">
            Por que <span className="text-accent">Keeus</span>?
          </h2>
          <p className="mt-3 text-muted">Conforto, design e sustentabilidade em cada chinelo</p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: "🦶",
                title: "Conforto Premium",
                desc: "Palmilha anatômica em EVA de alta densidade e tecnologia memory foam. Seus pés merecem o melhor.",
              },
              {
                icon: "🎨",
                title: "Design Exclusivo",
                desc: "Cada Keeus é pensado nos mínimos detalhes. Cores vibrantes, acabamento impecável e a icônica identidade laranja.",
              },
              {
                icon: "🌱",
                title: "Sustentabilidade",
                desc: "Materiais recicláveis, processos de baixo impacto e embalagem ecológica. Cuidamos do planeta enquanto cuidamos de você.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-surface p-8 text-center border border-border transition-all hover:shadow-[0_8px_32px_rgba(255,95,31,0.06)]"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-foreground-mid leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SummerDivider />

      {/* Mais Vendidos */}
      <ProductGrid
        title="Mais Vendidos"
        subtitle="Os preferidos da comunidade Keeus"
        products={featured}
        viewAllHref="/colecao"
      />

      <SummerDivider />

      {/* Newsletter */}
      <LeadCapture />

      {/* FAQ */}
      <FaqSection />
    </>
  );
}
