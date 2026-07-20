"use client";

import { useState } from "react";
import { Heart, PackageCheck, Ruler, Truck } from "lucide-react";
import { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import Product360Viewer from "./Product360Viewer";
import SizeFinder from "./SizeFinder";

export default function ProductDetail({ product }: { product: Product }) {
  const [size, setSize] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const isFav = useWishlistStore((state) => state.has(product.slug));
  const toggleFav = useWishlistStore((state) => state.toggle);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-8 md:px-8 md:py-14 lg:grid-cols-2 lg:gap-16">
      <Product360Viewer slug={product.slug} gallery={product.gallery} totalImages={product.angleCount} />
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{product.category === "slides" ? "Slide" : "Chinelo de dedo"}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">{product.name}</h1>
          </div>
          <button onClick={() => toggleFav(product.slug)} aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border hover:border-accent">
            <Heart size={22} className={isFav ? "fill-accent text-accent" : "text-foreground"} />
          </button>
        </div>

        <div className="mt-6">
          {product.originalPrice && <p className="text-sm text-muted line-through">R$ {product.originalPrice.toFixed(2).replace(".", ",")}</p>}
          <p className="text-3xl font-extrabold">R$ {product.price.toFixed(2).replace(".", ",")}</p>
          <p className="mt-1 text-sm text-muted">até {product.installments}x de R$ {product.installmentPrice.toFixed(2).replace(".", ",")} sem juros</p>
        </div>

        <p className="mt-7 text-base leading-7 text-foreground/75">{product.description}</p>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm font-bold" id="size-label"><Ruler size={18} className="text-accent" /> Escolha o tamanho</label>
            <span className="text-xs text-muted">{size ? `Selecionado: ${size}` : "Obrigatório"}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
            {product.sizes.map((itemSize) => (
              <button key={itemSize} type="button" onClick={() => setSize(itemSize)} aria-pressed={size === itemSize} className={`flex h-12 min-w-12 items-center justify-center rounded-full border px-3 text-sm font-bold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${size === itemSize ? "border-accent bg-accent text-white" : "border-border bg-white hover:border-accent"}`}>
                {itemSize}
              </button>
            ))}
          </div>
          <div className="mt-4"><SizeFinder sizes={product.sizes} /></div>
        </div>

        <button disabled={!size} onClick={() => size && addItem(product, size)} className="mt-6 w-full rounded-full bg-accent py-4 text-sm font-bold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-45">
          {size ? `Adicionar tamanho ${size} à sacola` : "Escolha um tamanho para continuar"}
        </button>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-border p-4"><PackageCheck className="shrink-0 text-accent" size={21} /><div><p className="text-sm font-bold">Fotos do produto</p><p className="mt-1 text-xs leading-5 text-muted">Use a galeria para conferir os ângulos disponíveis.</p></div></div>
          <div className="flex gap-3 rounded-xl border border-border p-4"><Truck className="shrink-0 text-accent" size={21} /><div><p className="text-sm font-bold">Entrega e pagamento</p><p className="mt-1 text-xs leading-5 text-muted">Condições são confirmadas antes do fechamento.</p></div></div>
        </div>
      </div>
    </div>
  );
}
