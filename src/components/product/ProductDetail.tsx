"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Heart, Ruler, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { getKitContents } from "@/lib/products";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import ProductGallery from "./ProductGallery";
import SizeFinder from "./SizeFinder";
import ShippingCalculator from "./ShippingCalculator";
import ScarcityNote from "@/components/conversion/ScarcityNote";
import ShippingCutoff from "@/components/conversion/ShippingCutoff";
import Countdown from "@/components/conversion/Countdown";

export type SizeAvailability = Record<number, number>;

export default function ProductDetail({
  product,
  sizeStock,
}: {
  product: Product;
  /** available units per size; missing key = use catalog fallback */
  sizeStock?: SizeAvailability;
}) {
  const [size, setSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);
  const [nudge, setNudge] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const isFav = useWishlistStore((state) => state.has(product.slug));
  const toggleFav = useWishlistStore((state) => state.toggle);

  const tipo =
    product.category === "slides"
      ? "Slide"
      : product.category === "flipflops"
        ? "Chinelo de dedo"
        : product.category === "kits"
          ? "Kit"
          : "Edição especial";
  const kitContents = product.category === "kits" ? getKitContents(product) : [];

  function availableFor(sizeNum: number): number {
    if (sizeStock && Object.prototype.hasOwnProperty.call(sizeStock, sizeNum)) {
      return sizeStock[sizeNum] ?? 0;
    }
    // Fallback: products.ts aggregate stock — treat size as available if product has stock
    return product.stock > 0 ? product.stock : 0;
  }

  const handleClick = () => {
    if (!size) {
      setNudge(true);
      setTimeout(() => setNudge(false), 450);
      return;
    }
    if (availableFor(size) < 1) return;
    addItem(product, size);
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 2200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-8 md:px-8 md:py-12 lg:grid-cols-2 lg:gap-14">
      <ProductGallery slug={product.slug} gallery={product.gallery} alt={product.name} />
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{tipo}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>
          </div>
          <button
            onClick={() => toggleFav(product.slug)}
            aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-200 hover:scale-110 hover:border-accent"
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${isFav ? "scale-110 fill-accent text-accent" : "text-foreground"}`}
            />
          </button>
        </div>

        <div className="mt-5">
          {product.originalPrice && (
            <p className="text-sm text-muted line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </p>
          )}
          <div className="flex flex-wrap items-end gap-3">
            <p className="text-3xl font-extrabold">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="mb-1 rounded-full bg-[#FF5F1F] px-2.5 py-1 text-[11px] font-bold text-white">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted">
            em até {product.installments}x de R${" "}
            {product.installmentPrice.toFixed(2).replace(".", ",")} sem juros
          </p>
          {product.flashSaleEndsAt &&
            new Date(product.flashSaleEndsAt).getTime() > Date.now() && (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-600">
                Preço promocional até
              </span>
              <Countdown endsAt={product.flashSaleEndsAt} compact className="text-sm font-semibold text-stone-900" />
            </div>
          )}
        </div>

        <p className="mt-6 text-base leading-7 text-foreground/75">{product.description}</p>

        {kitContents.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Este kit inclui</p>
            <ul className="mt-4 space-y-3">
              {kitContents.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/produto/${item.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-white"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                      <Image src={item.image} alt="" fill className="object-contain p-1" sizes="56px" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-foreground">{item.name}</span>
                      <span className="block text-xs text-muted">
                        {item.category === "slides" ? "Slide" : "Chinelo de dedo"} · R${" "}
                        {item.price.toFixed(2).replace(".", ",")}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-muted">
              O tamanho escolhido vale para os dois pares do kit. Na dúvida entre números, escolha o maior.
            </p>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm font-bold" id="size-label">
              <Ruler size={18} className="text-accent" /> {product.category === "kits" ? "Tamanho dos dois pares" : "Escolha o tamanho"}
            </label>
            <span className="text-xs text-muted">
              {size ? `Selecionado: ${size}` : "Obrigatório"}
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-labelledby="size-label">
            {product.sizes.map((itemSize) => {
              const avail = availableFor(itemSize);
              const soldOut = avail < 1;
              return (
                <button
                  key={itemSize}
                  type="button"
                  disabled={soldOut}
                  onClick={() => setSize(itemSize)}
                  aria-pressed={size === itemSize}
                  title={soldOut ? "Esgotado" : `${avail} disponível(is)`}
                  className={`flex h-12 min-w-12 items-center justify-center rounded-full border px-3 text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    soldOut
                      ? "cursor-not-allowed border-border/60 bg-surface text-muted line-through opacity-50"
                      : size === itemSize
                        ? "scale-105 border-accent bg-accent text-white shadow-[0_6px_16px_-6px_rgba(255,95,31,0.5)]"
                        : "border-border bg-white hover:-translate-y-0.5 hover:border-accent hover:shadow-sm"
                  }`}
                >
                  {itemSize}
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <SizeFinder sizes={product.sizes} />
          </div>
          {size != null && (
            <ScarcityNote
              available={availableFor(size)}
              isLowStock={product.isLowStock}
            />
          )}
        </div>

        <button
          onClick={handleClick}
          disabled={Boolean(size && availableFor(size) < 1)}
          className={`mt-6 w-full rounded-full py-4 text-sm font-bold text-white transition-all duration-300 ${
            added
              ? "bg-green-600 shadow-[0_10px_24px_-8px_rgba(22,163,74,0.5)]"
              : size
                ? "bg-accent shadow-[0_10px_24px_-8px_rgba(255,95,31,0.45)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_14px_28px_-8px_rgba(255,95,31,0.55)] active:translate-y-0"
                : "bg-accent/85 shadow-none hover:bg-accent hover:shadow-[0_10px_24px_-8px_rgba(255,95,31,0.45)]"
          } ${nudge ? "keeus-shake" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
          aria-live="polite"
        >
          {added ? (
            <span className="inline-flex items-center gap-2">
              <Check size={17} /> Adicionado à sacola!
            </span>
          ) : size ? (
            availableFor(size) < 1 ? (
              "Tamanho esgotado"
            ) : (
              `Adicionar tamanho ${size} à sacola`
            )
          ) : (
            "Escolha um tamanho para continuar"
          )}
        </button>
        {nudge && (
          <p className="mt-2 text-center text-xs font-medium text-accent">
            Escolha um tamanho acima primeiro
          </p>
        )}

        <div className="mt-4">
          <ShippingCutoff />
        </div>

        <ShippingCalculator productPrice={product.price} />

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-border p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-sm">
            <Truck className="shrink-0 text-accent" size={20} />
            <div>
              <p className="text-sm font-bold">Entrega</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Prazo e valor confirmados no atendimento, antes de fechar o pedido.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-border p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-sm">
            <RotateCcw className="shrink-0 text-accent" size={20} />
            <div>
              <p className="text-sm font-bold">Troca</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                Errou o número? Veja as condições em{" "}
                <Link href="/trocas" className="font-semibold text-accent underline underline-offset-2">
                  trocas e devoluções
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-border p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-sm sm:col-span-2">
            <ShieldCheck className="shrink-0 text-accent" size={20} />
            <div>
              <p className="text-sm font-bold">Pagamento só depois de confirmar</p>
              <p className="mt-1 text-xs leading-5 text-muted">
                O pedido fica pendente até o Mercado Pago (ou atendimento) confirmar — não inventamos
                sucesso de cobrança.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
