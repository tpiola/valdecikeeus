"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/store/wishlist";

export default function ProductCard({ product }: { product: Product }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isFav = useWishlistStore((s) => s.has(product.slug));
  const toggleFav = useWishlistStore((s) => s.toggle);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const hoverImage = product.gallery && product.gallery.length > 1 ? product.gallery[1] : null;

  // Single badge priority: Kit > Off > Novo (never stack 5 pills)
  const badge =
    product.category === "kits"
      ? { label: "Kit", tone: "dark" as const }
      : discount && discount > 0
        ? { label: `−${discount}%`, tone: "dark" as const }
        : product.isNew
          ? { label: "Novo", tone: "accent" as const }
          : product.isLowStock
            ? { label: "Poucas unidades", tone: "muted" as const }
            : null;

  return (
    <div className="group relative flex h-full flex-col bg-white">
      <Link
        href={`/produto/${product.slug}`}
        className="relative block overflow-hidden bg-[#f5f2ee]"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="keeus-img-zoom object-contain p-5 md:p-6"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              className="absolute inset-0 object-contain p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              aria-hidden="true"
            />
          )}
        </div>

        {badge && (
          <div className="absolute left-3 top-3 z-10">
            <span
              className={`inline-block px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${
                badge.tone === "accent"
                  ? "bg-[var(--accent)]"
                  : badge.tone === "muted"
                    ? "bg-stone-500"
                    : "bg-[var(--foreground)]"
              }`}
            >
              {badge.label}
            </span>
          </div>
        )}
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFav(product.slug);
        }}
        aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
      >
        <Heart
          size={15}
          className={`transition-colors ${
            mounted && isFav ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--foreground-mid)]"
          }`}
        />
      </button>

      <div className="flex flex-1 flex-col px-1 pt-4 pb-2">
        <span className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-500">
          {product.category === "slides"
            ? "Slide"
            : product.category === "flipflops"
              ? "Chinelo de dedo"
              : product.category === "kits"
                ? "Kit"
                : "Edição"}
        </span>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-stone-900 transition-colors group-hover:text-[var(--accent-hover)]">
            {product.name}
          </h3>
        </Link>

        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        <div className="mt-3 flex-1">
          {product.originalPrice && (
            <p className="text-xs text-stone-400 line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <p className="text-lg font-semibold text-stone-900">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-stone-500">
            {product.installments}x R$ {product.installmentPrice.toFixed(2).replace(".", ",")} s/ juros
          </p>
        </div>

        <Link
          href={`/produto/${product.slug}`}
          aria-label={
            product.category === "kits"
              ? `Ver ${product.name}`
              : `Selecionar tamanho de ${product.name}`
          }
          className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 border border-stone-900 bg-transparent text-xs font-semibold text-stone-900 transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
        >
          {product.category === "kits" ? "Ver kit" : "Selecionar tamanho"}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
