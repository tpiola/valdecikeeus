"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";

export default function ProductCard({ product }: { product: Product }) {
  const isFav = useWishlistStore((s) => s.has(product.slug));
  const toggleFav = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card group relative flex flex-col">
      {/* ── Image area ── */}
      <Link href={`/produto/${product.slug}`} className="relative block overflow-hidden rounded-t-2xl">
        <div className="relative aspect-square bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/products/placeholder.svg";
            }}
          />
        </div>

        {/* Badges — canto superior esquerdo */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {discount && discount > 0 && (
            <span className="badge">-{discount}% OFF</span>
          )}
          {product.isNew && !product.isLowStock && (
            <span className="badge badge-new">Novo</span>
          )}
          {product.isLimitedEdition && (
            <span className="badge badge-limited">Ed. Limitada</span>
          )}
          {product.isLowStock && (
            <span className="badge animate-pulse-soft">Últimas</span>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={(e) => { e.preventDefault(); toggleFav(product.slug); }}
        aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110 hover:shadow-md"
      >
        <Heart
          size={15}
          className={isFav ? "fill-accent text-accent" : "text-foreground-mid"}
        />
      </button>

      {/* ── Info area ── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category badge */}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-accent mb-1">
          {product.category === "slides" ? "Slide" : product.category === "flipflops" ? "Flip Flop" : "Premium"}
        </span>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        {/* Rating stars placeholder */}
        <div className="mt-1.5 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-border"} />
          ))}
          <span className="text-[10px] text-muted ml-1">(28)</span>
        </div>

        {/* Color dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((color) => (
              <div
                key={color}
                className="h-3.5 w-3.5 rounded-full border border-border shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex-1">
          {product.originalPrice && (
            <p className="text-xs text-muted line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <p className="text-xl font-extrabold text-foreground">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-muted">
            em até {product.installments}x de{" "}
            <span className="font-semibold text-foreground-mid">
              R$ {product.installmentPrice.toFixed(2).replace(".", ",")}
            </span>{" "}
            sem juros
          </p>
        </div>

        {/* Stock indicator */}
        {product.isLowStock && product.stock <= 5 && (
          <div className="mt-2">
            <div className="mb-1 flex items-center justify-between text-[10px]">
              <span className="text-accent font-semibold">Estoque limitado</span>
              <span className="text-muted">Restam {product.stock}</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-dark">
              <div
                className="h-full rounded-full bg-accent transition-all"
                style={{ width: `${(product.stock / 10) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => addItem(product, product.sizes[0] ?? 0)}
          className="btn-primary mt-4 w-full gap-2 rounded-full py-3 text-xs font-semibold"
        >
          <ShoppingCart size={14} />
          Adicionar
        </button>
      </div>
    </div>
  );
}
