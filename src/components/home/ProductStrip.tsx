"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const TOP_PRODUCTS = PRODUCTS.slice(0, 6);

export default function ProductStrip() {
  return (
    <section className="border-b border-border bg-[#FAFAFA]">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8 md:py-6">
        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-foreground/20">
            Novos lançamentos
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Product row — horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible">
          {TOP_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              <Link
                href={`/produto/${product.slug}`}
                className="group flex w-[140px] flex-shrink-0 flex-col md:w-auto"
              >
                {/* Image */}
                <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-shadow group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 140px, 180px"
                    className="object-cover p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Badges */}
                  <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="badge px-2 py-0.5 text-[9px]">Novo</span>
                    )}
                    {product.isLimitedEdition && (
                      <span className="badge-limited px-2 py-0.5 text-[9px]">
                        Limitado
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="line-clamp-1 text-xs font-bold text-foreground group-hover:text-accent">
                  {product.name}
                </h3>
                <div className="mt-0.5 flex items-center gap-1">
                  <Star size={10} fill="#FF5F00" className="text-accent" />
                  <span className="text-[10px] font-semibold text-muted">4.9</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-sm font-extrabold text-foreground">
                    R$ {product.price.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-[10px] text-muted line-through">
                    R$ {(product.price * 1.4).toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <span className="mt-0.5 text-[10px] font-bold text-success">
                  {product.installments}x de R$ {product.installmentPrice.toFixed(2).replace(".", ",")} sem juros
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-3 text-center">
          <Link
            href="/colecao"
            className="text-xs font-bold text-foreground underline underline-offset-4 hover:text-accent"
          >
            Ver todos os modelos →
          </Link>
        </div>
      </div>
    </section>
  );
}
