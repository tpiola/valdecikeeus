import Script from "next/script";
import Link from "next/link";
import { Ruler, Camera, RefreshCcw, Truck } from "lucide-react";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import FaqSection from "@/components/home/FaqSection";
import LeadCapture from "@/components/home/LeadCapture";
import ScrollStory from "@/components/home/ScrollStory";
import ProductMarquee from "@/components/home/ProductMarquee";
import FlashSaleBanner from "@/components/conversion/FlashSaleBanner";
import TrustStrip from "@/components/conversion/TrustStrip";
import Reveal from "@/components/ui/Reveal";
import { PRODUCTS, getKits } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

export default function Home() {
  const allProducts = PRODUCTS.filter((p) => p.category !== "kits");
  const kits = getKits();

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }),
        }}
      />

      <Hero />

      <FlashSaleBanner />

      <ProductMarquee />

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {[
            {
              icon: Ruler,
              title: "Tamanho antes da compra",
              text: "Guia com medidas em centímetros em cada produto.",
            },
            {
              icon: Camera,
              title: "Foto real do modelo",
              text: "O par que você vê é o par que chega.",
            },
            {
              icon: Truck,
              title: "Frete pelo CEP",
              text: "SEDEX e PAC com prazo em dias úteis na hora.",
            },
            {
              icon: RefreshCcw,
              title: "Troca explicada",
              text: "Regras claras na página de trocas, antes de fechar.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#ff5f1f]" />
                <div>
                  <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                  <p className="mt-0.5 text-[13px] leading-5 text-stone-500">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f6f3ef]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <TrustStrip />
          <p className="mt-5 text-center text-xs text-stone-500">
            Dúvidas?{" "}
            <a href="/faq" className="font-semibold text-stone-800 underline underline-offset-2">
              FAQ
            </a>
            ,{" "}
            <a href="/trocas" className="font-semibold text-stone-800 underline underline-offset-2">
              trocas
            </a>{" "}
            ou{" "}
            <a href="/contato" className="font-semibold text-stone-800 underline underline-offset-2">
              contato
            </a>
            .
          </p>
        </div>
      </section>

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
            <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e04e0e]">
                    Kits
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
                    Dois pares, um preço de kit
                  </h2>
                  <p className="mt-2 max-w-lg text-sm text-stone-600">
                    Viagem ou presente — modelos reais do catálogo.
                  </p>
                </div>
                <Link
                  href="/colecao?categoria=kits"
                  className="text-sm font-semibold text-stone-900 underline-offset-4 hover:text-[#e04e0e] hover:underline"
                >
                  Ver kits →
                </Link>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {kits.map((kit) => (
                  <Link
                    key={kit.slug}
                    href={`/produto/${kit.slug}`}
                    className="group flex gap-5 border border-stone-200 bg-white p-5 transition hover:border-stone-300"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#f5f2ee]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={kit.image}
                        alt=""
                        className="h-full w-full object-contain p-2 transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ff5f1f]">
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
                ))}
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
              className="group relative flex min-h-40 items-end overflow-hidden bg-[#1a1a1a] p-6"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Slide
                </p>
                <h2 className="font-display mt-1 text-2xl font-extrabold text-white">
                  Faixa larga, pé firme
                </h2>
                <p className="mt-1 text-sm text-white/70">Do dia a dia ao pós-banho.</p>
              </div>
              <span
                className="absolute bottom-6 right-6 text-white/50 transition group-hover:text-white"
                aria-hidden
              >
                →
              </span>
            </Link>
            <Link
              href="/colecao?categoria=flipflops"
              className="group relative flex min-h-40 items-end overflow-hidden bg-[#ff5f1f] p-6"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Chinelo de dedo
                </p>
                <h2 className="font-display mt-1 text-2xl font-extrabold text-white">
                  O clássico do verão
                </h2>
                <p className="mt-1 text-sm text-white/90">Leve, seca rápido, vai pra tudo.</p>
              </div>
              <span
                className="absolute bottom-6 right-6 text-white/70 transition group-hover:text-white"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 md:px-8">
        <h2 className="font-display text-center text-2xl font-extrabold tracking-tight text-stone-900 md:text-3xl">
          Como comprar
        </h2>
        <Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              [
                "1",
                "Escolha modelo e tamanho",
                "Use o guia em centímetros. Na dúvida entre dois números, vá no maior.",
              ],
              [
                "2",
                "Calcule o frete e pague",
                "CEP mostra SEDEX/PAC com prazo. No checkout: Pix ou cartão — sem boleto.",
              ],
              [
                "3",
                "Receba e confira",
                "Chegou e algo não serviu? Veja as condições de troca e a gente resolve.",
              ],
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

      <Script
        id="home-org-extra"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Chinelos Keeus — Destaques",
            itemListElement: allProducts.slice(0, 6).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE.url}/produto/${p.slug}`,
              name: p.name,
            })),
          }),
        }}
      />
    </>
  );
}
