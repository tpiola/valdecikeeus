"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { useWishlistStore } from "@/lib/store/wishlist";

export default function ProductCard({ product }: { product: Product }) {
  const isFav = useWishlistStore((s) => s.has(product.slug));
  const toggleFav = useWishlistStore((s) => s.toggle);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Segunda foto do produto para o hover (se existir)
  const hoverImage = product.gallery && product.gallery.length > 1 ? product.gallery[1] : null;

  return (
    <div className="group relative flex h-full flex-col rounded-2xl bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)]">
      {/* ── Imagem ── */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative block overflow-hidden rounded-t-2xl bg-[#f5f2ee]"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-5 transition-all duration-500 ease-out group-hover:scale-[1.12] group-hover:opacity-0 md:p-6"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {hoverImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              className="absolute inset-0 object-contain p-5 opacity-0 transition-all duration-500 ease-out group-hover:scale-[1.12] group-hover:opacity-100 md:p-6"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Badges — canto superior esquerdo */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {discount && discount > 0 && (
            <span className="rounded-full bg-[#1a1a1a] px-2.5 py-1 text-[10px] font-bold text-white">
              -{discount}% OFF
            </span>
          )}
          {product.flashSaleEndsAt &&
            product.originalPrice &&
            new Date(product.flashSaleEndsAt).getTime() > Date.now() && (
            <span className="rounded-full bg-[#FF5F1F] px-2.5 py-1 text-[10px] font-bold text-white">
              Oferta
            </span>
          )}
          {product.category === "kits" && (
            <span className="rounded-full bg-[#1a1a1a] px-2.5 py-1 text-[10px] font-bold text-white">
              Kit
            </span>
          )}
          {product.isNew && !product.isLowStock && product.category !== "kits" && (
            <span className="rounded-full bg-[#ff5f1f] px-2.5 py-1 text-[10px] font-bold text-white">
              Novo
            </span>
          )}
          {product.isNew && product.category === "kits" && (
            <span className="rounded-full bg-[#ff5f1f] px-2.5 py-1 text-[10px] font-bold text-white">
              Novo
            </span>
          )}
          {product.isLowStock && (
            <span className="rounded-full bg-[#8a8a8a] px-2.5 py-1 text-[10px] font-bold text-white">
              Últimas unidades
            </span>
          )}
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={(e) => { e.preventDefault(); toggleFav(product.slug); }}
        aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
      >
        <Heart
          size={15}
          className={`transition-colors ${isFav ? "fill-[#ff5f1f] text-[#ff5f1f]" : "text-[#4a4a4a]"}`}
        />
      </button>

      {/* ── Info ── */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#ff5f1f]">
          {product.category === "slides"
            ? "Slide"
            : product.category === "flipflops"
              ? "Chinelo de dedo"
              : product.category === "kits"
                ? "Kit"
                : "Edição especial"}
        </span>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="line-clamp-1 text-sm font-bold leading-tight text-[#1a1a1a] transition-colors group-hover:text-[#e04e0e]">
            {product.name}
          </h3>
        </Link>

        {/* Cores */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color}
                className="h-3.5 w-3.5 rounded-full border border-black/10"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
            ))}
          </div>
        )}

        {/* Preço */}
        <div className="mt-3 flex-1">
          {product.originalPrice && (
            <p className="text-xs text-[#8a8a8a] line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <p className="text-lg font-extrabold text-[#1a1a1a]">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-[#8a8a8a]">
            em até {product.installments}x de{" "}
            <span className="font-semibold text-[#4a4a4a]">
              R$ {product.installmentPrice.toFixed(2).replace(".", ",")}
            </span>{" "}
            sem juros
          </p>
        </div>

        {/* CTA — aparece com movimento no hover */}
        <Link
          href={`/produto/${product.slug}`}
          aria-label={product.category === "kits" ? `Ver ${product.name}` : `Selecionar tamanho de ${product.name}`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-[#1a1a1a] bg-transparent py-2.5 text-xs font-bold text-[#1a1a1a] transition-all duration-300 group-hover:border-[#ff5f1f] group-hover:bg-[#ff5f1f] group-hover:text-white"
        >
          {product.category === "kits" ? "Ver kit" : "Selecionar tamanho"}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
