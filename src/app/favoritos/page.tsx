"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { useWishlistStore } from "@/lib/store/wishlist";

export default function FavoritosPage() {
  const slugs = useWishlistStore((state) => state.slugs);
  const products = PRODUCTS.filter((product) => slugs.includes(product.slug));

  return (
    <section className="mx-auto min-h-[60vh] max-w-7xl px-4 py-12 md:px-8 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Sua seleção</p>
      <h1 className="mt-2 text-3xl font-bold md:text-5xl">Favoritos</h1>
      <p className="mt-3 text-muted">{products.length ? `${products.length} modelo(s) salvo(s)` : "Você ainda não salvou nenhum modelo."}</p>

      {products.length ? (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <Heart size={36} className="text-accent" />
          <h2 className="mt-4 text-xl font-bold">Salve os modelos que mais combinam com você</h2>
          <p className="mt-2 max-w-md text-sm text-muted">Use o botão de coração nos produtos para montar uma lista e comparar depois.</p>
          <Link href="/colecao" className="btn-primary mt-7 rounded-full">Ver coleção</Link>
        </div>
      )}
    </section>
  );
}
