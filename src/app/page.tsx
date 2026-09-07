import Script from "next/script";
import Link from "next/link";
import { Ruler, Camera, RefreshCcw, MessageCircle } from "lucide-react";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import FaqSection from "@/components/home/FaqSection";
import { PRODUCTS } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

export default function Home() {
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
          name: "Chinelos Keeus — Catálogo",
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

      <Hero />

      {/* Compra sem surpresa — o que a loja garante de verdade */}
      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          <div className="flex items-start gap-3">
            <Ruler className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5f1f]" />
            <div>
              <p className="text-sm font-bold text-stone-900">Tamanho antes da compra</p>
              <p className="mt-0.5 text-[13px] leading-5 text-stone-500">
                Guia com medidas em centímetros em cada produto.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Camera className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5f1f]" />
            <div>
              <p className="text-sm font-bold text-stone-900">Foto real do modelo</p>
              <p className="mt-0.5 text-[13px] leading-5 text-stone-500">
                O par que você vê é o par que chega.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCcw className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5f1f]" />
            <div>
              <p className="text-sm font-bold text-stone-900">Troca explicada</p>
              <p className="mt-0.5 text-[13px] leading-5 text-stone-500">
                Regras claras na página de trocas, antes de fechar.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5f1f]" />
            <div>
              <p className="text-sm font-bold text-stone-900">Atendimento direto</p>
              <p className="mt-0.5 text-[13px] leading-5 text-stone-500">
                Dúvida de número ou de pedido, a gente responde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo — uma grade só, sem repetição */}
      <ProductGrid
        title="A coleção"
        subtitle={`${allProducts.length} modelos de slide e chinelo de dedo, do 34 ao 45`}
        products={allProducts}
        viewAllHref="/colecao"
      />

      {/* Navegar por tipo — como loja de calçado de verdade */}
      <section className="border-t border-stone-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-14 sm:grid-cols-2 md:px-8">
          <Link
            href="/colecao?categoria=slides"
            className="group relative flex min-h-44 items-end overflow-hidden rounded-2xl bg-[#1a1a1a] p-6"
          >
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Slide</p>
              <h2 className="font-display mt-1 text-2xl font-extrabold text-white">Faixa larga, pé firme</h2>
              <p className="mt-1 text-sm text-white/70">Do dia a dia ao pós-banho.</p>
            </div>
            <span className="absolute bottom-6 right-6 text-4xl text-white/25 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/colecao?categoria=flipflops"
            className="group relative flex min-h-44 items-end overflow-hidden rounded-2xl bg-[#ff5f1f] p-6"
          >
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Chinelo de dedo</p>
              <h2 className="font-display mt-1 text-2xl font-extrabold text-white">O clássico do verão</h2>
              <p className="mt-1 text-sm text-white/80">Leve, seca rápido, vai pra tudo.</p>
            </div>
            <span className="absolute bottom-6 right-6 text-4xl text-white/30 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Como funciona — curto e direto */}
      <section className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <h2 className="font-display text-center text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
          Como comprar na Keeus
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            ["1", "Escolha o modelo e o tamanho", "Use o guia com as medidas do seu pé. Na dúvida entre dois números, vai no maior."],
            ["2", "Fale com a gente", "O pedido é confirmado no atendimento, com prazo e forma de pagamento antes de fechar."],
            ["3", "Receba e confira", "Chegou, conferiu e algo não serviu? Veja as condições de troca e a gente resolve."],
          ].map(([num, title, text]) => (
            <div key={num} className="text-center sm:text-left">
              <span className="font-display text-3xl font-extrabold text-[#ff5f1f]">{num}</span>
              <h3 className="mt-2 text-sm font-bold text-stone-900">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-6 text-stone-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqSection />
    </>
  );
}
