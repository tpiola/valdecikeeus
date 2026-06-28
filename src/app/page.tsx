"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from "next/script";
import ProductStrip from "@/components/home/ProductStrip";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import { PRODUCTS, getFeaturedProducts, getNewArrivals, getSlides, getFlipFlops } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

function CinematicSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      }
    );
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 6);
  const featured = getFeaturedProducts();
  const slides = getSlides();
  const flipflops = getFlipFlops();
  const allProducts = PRODUCTS;

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question", name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      }} />
      <Script id="product-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "ItemList",
          name: "Chinelos Premium Keeus — Coleção Verão",
          itemListElement: allProducts.slice(0, 6).map((p, i) => ({
            "@type": "ListItem", position: i + 1,
            item: {
              "@type": "Product", name: p.name, brand: { "@type": "Brand", name: p.brand },
              description: p.description, image: `${SITE.url}${p.image}`,
              offers: {
                "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "BRL",
                availability: "https://schema.org/InStock", url: `${SITE.url}/produto/${p.slug}`,
              },
            },
          })),
        }),
      }} />

      <ProductStrip />
      <Hero />

      {/* Seção única de produtos — cinematográfica */}
      <CinematicSection>
        <ProductGrid
          title="Coleção Verão 2026"
          subtitle="Slides e flip flops premium para todos os momentos"
          products={allProducts}
          viewAllHref="/colecao"
        />
      </CinematicSection>

      {/* Diferenciais — estilo Apple */}
      <CinematicSection className="bg-stone-50">
        <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5F1F]">
              Por que Keeus
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-stone-900 md:text-5xl">
              Feito para quem não abre mão do conforto
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                svg: <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M12 4v16"/><path d="M8 10l4-4 4 4"/><circle cx="12" cy="18" r="2"/><path d="M6 14c-1 2-1 4 2 6"/><path d="M18 14c1 2 1 4-2 6"/></svg>,
                title: "Conforto Premium",
                desc: "Palmilha anatômica em EVA de alta densidade com tecnologia memory foam. Seus pés merecem o melhor.",
              },
              {
                svg: <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M12 3c.5 0 1 .4 1 1v2c0 .6-.5 1-1 1s-1-.4-1-1V4c0-.6.5-1 1-1z"/><path d="M8 7c.5 0 1 .4 1 1v2c0 .6-.5 1-1 1s-1-.4-1-1V8c0-.6.5-1 1-1z"/><path d="M16 7c.5 0 1 .4 1 1v2c0 .6-.5 1-1 1s-1-.4-1-1V8c0-.6.5-1 1-1z"/><path d="M6 13c.5 0 1 .4 1 1v2c0 .6-.5 1-1 1s-1-.4-1-1v-2c0-.6.5-1 1-1z"/><path d="M18 13c.5 0 1 .4 1 1v2c0 .6-.5 1-1 1s-1-.4-1-1v-2c0-.6.5-1 1-1z"/><path d="M10 18c.5 0 1 .4 1 1v1c0 .6-.5 1-1 1s-1-.4-1-1v-1c0-.6.5-1 1-1z"/><path d="M14 18c.5 0 1 .4 1 1v1c0 .6-.5 1-1 1s-1-.4-1-1v-1c0-.6.5-1 1-1z"/></svg>,
                title: "Design Exclusivo",
                desc: "Cada Keeus é pensado nos mínimos detalhes. Cores vibrantes, acabamento impecável e a icônica identidade laranja.",
              },
              {
                svg: <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7"><path d="M12 22c4.2 0 7-1.7 7-5 0-3.3-3.1-5-7-5s-7 1.7-7 5c0 3.3 2.8 5 7 5z"/><path d="M12 17c-2.2 0-4-.7-4-2 0-1.3 1.8-2 4-2s4 .7 4 2c0 1.3-1.8 2-4 2z"/><path d="M12 7V2"/><path d="M10 4l2-2 2 2"/><path d="M6 10c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2"/></svg>,
                title: "Sustentabilidade",
                desc: "Materiais recicláveis, processos de baixo impacto e embalagem ecológica. Cuidamos do planeta enquanto cuidamos de você.",
              },
            ].map((item) => (
              <div key={item.title}
                className="group rounded-2xl bg-white p-8 text-center transition-all hover:shadow-[0_12px_48px_rgba(255,95,31,0.06)] hover:-translate-y-1"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5F1F]/5 text-[#FF5F1F] transition-colors group-hover:bg-[#FF5F1F] group-hover:text-white">
                  {item.svg}
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </CinematicSection>

      {/* Mais Vendidos */}
      <CinematicSection>
        <ProductGrid
          title="Mais Vendidos"
          subtitle="Os preferidos da comunidade Keeus"
          products={featured}
          viewAllHref="/colecao"
        />
      </CinematicSection>

      {/* Newsletter + FAQ combinados */}
      <CinematicSection>
        <div className="border-t border-stone-100">
          <LeadCapture />
        </div>
      </CinematicSection>

      <CinematicSection>
        <FaqSection />
      </CinematicSection>
    </>
  );
}
