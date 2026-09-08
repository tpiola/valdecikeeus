import Link from "next/link";
import Image from "next/image";
import { Ruler, Camera, RefreshCcw, Truck } from "lucide-react";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/home/ProductGrid";
import FaqSection from "@/components/home/FaqSection";
import LeadCapture from "@/components/home/LeadCapture";
import ScrollStory from "@/components/home/ScrollStory";
import TrustStrip from "@/components/conversion/TrustStrip";
import Reveal from "@/components/ui/Reveal";
import { PRODUCTS, getKits } from "@/lib/products";
import type { Metadata } from "next";
import { FAQ_ITEMS, SITE } from "@/lib/constants";


export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
  openGraph: {
    url: SITE.url,
  },
};

export default function Home() {
  const allProducts = PRODUCTS.filter((p) => p.category !== "kits");
  const kits = getKits();
  const slideTile = PRODUCTS.find((p) => p.category === "slides") ?? PRODUCTS[0];
  const flipTile = PRODUCTS.find((p) => p.category === "flipflops") ?? PRODUCTS[0];

  return (
    <>
      <script
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
        subtitle={`${allProducts.length} modelos de slide e chinelo de dedo — numeração conforme o modelo`}
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
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
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
                      <h3 className="mt-1 font-display text-xl font-semibold text-stone-900 group-hover:text-[#e04e0e]">
                        {kit.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-stone-600">{kit.description}</p>
                      <p className="mt-3 text-lg font-semibold text-stone-900">
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
              className="group relative flex min-h-44 items-end overflow-hidden bg-stone-900 p-6"
            >
              <Image src={slideTile.image} alt="" fill className="object-contain p-6 opacity-40 transition duration-500 group-hover:scale-105 group-hover:opacity-55" sizes="(max-width:640px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Slide
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
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
              className="group relative flex min-h-44 items-end overflow-hidden bg-[var(--accent)] p-6"
            >
              <Image src={flipTile.image} alt="" fill className="object-contain p-6 opacity-35 transition duration-500 group-hover:scale-105 group-hover:opacity-50" sizes="(max-width:640px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Chinelo de dedo
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
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
        <h2 className="font-display text-center text-2xl font-semibold tracking-tight text-stone-900 md:text-3xl">
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
                <span className="font-display text-3xl font-semibold text-[#ff5f1f]">{num}</span>
                <h3 className="mt-2 text-sm font-bold text-stone-900">{title}</h3>
                <p className="mt-1.5 text-[13px] leading-6 text-stone-500">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <LeadCapture />

      <FaqSection />

      <script
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
