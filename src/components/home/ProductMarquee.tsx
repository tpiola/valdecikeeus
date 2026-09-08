"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";

/** Marquee de fotos de produto (não buzzwords). */
export default function ProductMarquee() {
  const reduceMotion = useReducedMotion();
  const items = PRODUCTS.filter((p) => p.category !== "kits").slice(0, 10);
  const loop = [...items, ...items];

  return (
    <section
      className="border-y border-stone-200 bg-white py-8"
      aria-label="Modelos em destaque"
    >
      <div className="mb-5 px-4 text-center md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e04e0e]">
          A coleção em movimento
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className={`flex w-max gap-4 px-4 ${reduceMotion ? "" : "keeus-marquee"}`}
        >
          {loop.map((product, i) => (
            <Link
              key={`${product.slug}-${i}`}
              href={`/produto/${product.slug}`}
              className="group relative h-28 w-40 shrink-0 overflow-hidden rounded-xl bg-[#f5f2ee] transition-transform duration-300 hover:-translate-y-0.5 sm:h-32 sm:w-48"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="192px"
                className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
