"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import Product360Viewer from "./Product360Viewer";
import ShippingCalculator from "./ShippingCalculator";
import PaymentOptions from "./PaymentOptions";
import SizeFinder from "./SizeFinder";

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<number | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const isFav = useWishlistStore((s) => s.has(product.slug));
  const toggleFav = useWishlistStore((s) => s.toggle);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-12 md:px-8 lg:grid-cols-2">
      <Product360Viewer slug={product.slug} totalImages={product.angleCount} />

      <div>
        {product.isLowStock && (
          <span className="mb-3 inline-block animate-pulse-soft rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-wide text-accent-foreground">
            Restam apenas {product.stock} unidades
          </span>
        )}

        <div className="flex items-start justify-between">
          <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
            {product.name}
          </h1>
          <button
            onClick={() => toggleFav(product.slug)}
            aria-label="Favoritar"
            className="shrink-0"
          >
            <Heart
              size={24}
              className={isFav ? "fill-accent text-accent" : "text-foreground"}
            />
          </button>
        </div>

        <p className="mt-3 font-display text-2xl text-accent">
          R$ {product.price.toFixed(2)}
        </p>
        <p className="text-sm text-muted">
          ou {product.installments}x de R$ {product.installmentPrice.toFixed(2)} sem juros
        </p>

        <p className="mt-6 text-sm leading-relaxed text-foreground/80">
          {product.description}
        </p>

        <div className="mt-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
            Tamanho
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold transition-colors ${
                  size === s
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border hover:border-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <SizeFinder sizes={product.sizes} />
        </div>

        <button
          disabled={!size}
          onClick={() => size && addItem(product, size)}
          className="mt-6 w-full rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100"
        >
          {size ? "Adicionar à sacola" : "Selecione um tamanho"}
        </button>

        <ShippingCalculator />

        <div className="mt-8">
          <PaymentOptions price={product.price} />
        </div>
      </div>
    </div>
  );
}
