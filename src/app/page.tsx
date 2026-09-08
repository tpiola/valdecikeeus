import Script from "next/script";
import Link from "next/link";
import { Ruler, Camera, RefreshCcw, MessageCircle, Gift, Plane } from "lucide-react";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import FaqSection from "@/components/home/FaqSection";
import LeadCapture from "@/components/home/LeadCapture";
import ScrollStory from "@/components/home/ScrollStory";
import ProductMarquee from "@/components/home/ProductMarquee";
import Reveal from "@/components/ui/Reveal";
import { PRODUCTS, getKits } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

export default function Home() {
  const allProducts = PRODUCTS.filter((p) => p.category !== "kits");
  const kits = getKits();

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

      <ProductMarquee />

      <Reveal>
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
      </Reveal>

      <ScrollStory />

      <ProductGrid
        title="A coleção"
        subtitle={`${allProducts.length} modelos de slide e chinelo de dedo, do 34 ao 45`}
        products={allProducts}
        viewAllHref="/colecao"
      />

      {kits.length > 0 && (
        <section className="border-t border-stone-100 bg-[#f6f3ef]">
          <Reveal>
            <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e04e0e]">
                    Kits Keeus
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                    Dois pares, um preço de kit
                  </h2>
                  <p className="mt-2 max-w-lg text-sm text-stone-600">
                    Viagem ou presente — montados com modelos reais do catálogo, sem surpresa.
                  </p>
                </div>
                <Link
                  href="/colecao?categoria=kits"
                  className="text-sm font-bold text-stone-900 underline-offset-4 hover:text-[#e04e0e] hover:underline"
                >
                  Ver todos os kits →
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {kits.map((kit) => {
                  const Icon = kit.slug.includes("viagem") ? Plane : Gift;
                  return (
                    <Link
                      key={kit.slug}
                      href={`/produto/${kit.slug}`}
                      className="group flex gap-5 rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ff5f1f]/10 text-[#ff5f1f]">
                        <Icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ff5f1f]">
                          Kit
                        </p>
                        <h3 className="mt-1 font-display text-xl font-extrabold text-stone-900 group-hover:text-[#e04e0e]">
                          {kit.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-stone-600">{kit.description}</p>
                        <p className="mt-3 text-lg font-extrabold text-stone-900">
                          R$ {kit.price.toFixed(2).replace(".", ",")}
                          {kit.originalPrice ? (
                            <span className="ml-2 text-sm font-medium text-stone-400 line-through">
                              R$ {kit.originalPrice.toFixed(2).replace(".", ",")}
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="border-t border-stone-100 bg-white">
        <Reveal>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-14 sm:grid-cols-2 md:px-8">
          <Link
            href="/colecao?categoria=slides"
            className="group relative flex min-h-44 items-end overflow-hidden rounded-2xl bg-[#1a1a1a] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)]"
          >
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Slide</p>
              <h2 className="font-display mt-1 text-2xl font-extrabold text-white">Faixa larga, pé firme</h2>
              <p className="mt-1 text-sm text-white/70">Do dia a dia ao pós-banho.</p>
            </div>
            <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/60 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#ff5f1f] group-hover:text-white group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/colecao?categoria=flipflops"
            className="group relative flex min-h-44 items-end overflow-hidden rounded-2xl bg-[#ff5f1f] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(255,95,31,0.4)]"
          >
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Chinelo de dedo</p>
              <h2 className="font-display mt-1 text-2xl font-extrabold text-white">O clássico do verão</h2>
              <p className="mt-1 text-sm text-white/90">Leve, seca rápido, vai pra tudo.</p>
            </div>
            <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-white/80 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-[#ff5f1f] group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </Link>
        </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <h2 className="font-display text-center text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
          Como comprar na Keeus
        </h2>
        <Reveal>
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
        </Reveal>
      </section>

      <LeadCapture />

      <FaqSection />
    </>
  );
}
