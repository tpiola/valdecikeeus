"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/store/wishlist";
import ProductImage from "@/components/ui/ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const isFav = useWishlistStore((s) => s.has(product.slug));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <div className="group relative">
      <Link href={`/produto/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface-light">
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isLowStock && (
              <span className="animate-pulse-soft rounded-full bg-accent px-2 py-1 text-[10px] font-black uppercase tracking-wide text-accent-foreground">
                Estoque baixo
              </span>
            )}
            {product.isNew && !product.isLowStock && (
              <span className="rounded-full bg-signal px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                Novo
              </span>
            )}
            {product.isLimitedEdition && (
              <span className="rounded-full bg-foreground px-2 py-1 text-[10px] font-black uppercase tracking-wide text-background">
                Edição limitada
              </span>
            )}
          </div>
        </div>
      </Link>

      <button
        onClick={() => toggle(product.slug)}
        aria-label="Favoritar"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 backdrop-blur-md transition-transform hover:scale-110"
      >
        <Heart
          size={16}
          className={isFav ? "fill-accent text-accent" : "text-foreground"}
        />
      </button>

      <Link href={`/produto/${product.slug}`} className="mt-3 block">
        <h3 className="font-display text-base">{product.name}</h3>
        <p className="mt-1 font-bold text-accent">
          R$ {product.price.toFixed(2)}
        </p>
        <p className="text-xs text-muted">
          ou {product.installments}x de R$ {product.installmentPrice.toFixed(2)} sem juros
        </p>
      </Link>
    </div>
  );
}
