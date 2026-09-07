import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { PRODUCTS } from "@/lib/products";

export default function Hero() {
  // Foto real do produto em destaque (usada também no card da coleção)
  const heroProduct = PRODUCTS.find((p) => p.slug === "toledo-preto-laranja") ?? PRODUCTS[0];

  return (
    <section className="bg-[#f6f3ef]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-16">
        {/* Texto — lado esquerdo */}
        <div className="order-2 md:order-1">
          <FadeIn delay={0}>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e04e0e]">
              Slide e chinelo de dedo
            </p>
          </FadeIn>
          <FadeIn delay={80}>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-stone-900 md:text-6xl">
              Chinelo Keeus.
              <br />
              Feito pro seu pé.
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-600">
              Onze modelos, do 34 ao 45. Cada par com foto de verdade, tamanho pra conferir antes
              de comprar e preço sem surpresa.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/colecao"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ff5f1f] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#e04e0e] hover:shadow-[0_10px_24px_-8px_rgba(255,95,31,0.5)] hover:-translate-y-0.5"
              >
                Ver a coleção
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/trocas"
                className="inline-flex items-center rounded-full border border-stone-300 bg-white px-7 py-3.5 text-sm font-semibold text-stone-700 transition-all duration-300 hover:border-stone-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.15)]"
              >
                Como funciona a troca
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={320}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-stone-200 pt-6 text-sm text-stone-600">
              <li>
                <strong className="font-bold text-stone-900">11</strong> modelos
              </li>
              <li>
                <strong className="font-bold text-stone-900">34–45</strong> numerações
              </li>
              <li>
                <strong className="font-bold text-stone-900">Foto real</strong> em cada anúncio
              </li>
            </ul>
          </FadeIn>
        </div>

        {/* Foto real — lado direito */}
        <div className="order-1 md:order-2">
          <FadeIn delay={140} from="none">
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-20px_rgba(26,26,26,0.25)]">
              <Image
                src={heroProduct.image}
                alt={heroProduct.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-[1.05] md:p-12"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-stone-700 shadow-sm">
                {heroProduct.name}
              </span>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
