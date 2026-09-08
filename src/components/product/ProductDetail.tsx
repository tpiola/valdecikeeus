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

  const soldOutSelected = Boolean(size && availableFor(size) < 1);
  const ctaLabel = added
    ? "Adicionado à sacola"
    : soldOutSelected
      ? "Tamanho esgotado"
      : size
        ? `Adicionar tamanho ${size}`
        : "Escolha o tamanho";

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-8 pb-28 md:px-8 md:py-14 md:pb-14 lg:grid-cols-2 lg:gap-16">
        <ProductGallery slug={product.slug} gallery={product.gallery} alt={product.name} />
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{tipo}</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                {product.name}
              </h1>
            </div>
            <button
              onClick={() => toggleFav(product.slug)}
              aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Heart
                size={20}
                className={`transition ${isFav ? "fill-accent text-accent" : "text-foreground"}`}
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
              <p className="text-3xl font-extrabold text-stone-900">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </p>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="mb-1 rounded bg-[#FF5F1F] px-2 py-0.5 text-[11px] font-bold text-white">
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
              <p className="mt-3 text-xs text-stone-600">
                Preço promocional até{" "}
                <Countdown endsAt={product.flashSaleEndsAt} compact className="font-semibold text-stone-900" />
              </p>
            )}
          </div>

          <p className="mt-6 text-base leading-7 text-stone-600">{product.description}</p>

          {kitContents.length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                Este kit inclui
              </p>
              <ul className="mt-4 space-y-3">
                {kitContents.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/produto/${item.slug}`}
                      className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-surface"
                    >
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface">
                        <Image src={item.image} alt="" fill className="object-contain p-1" sizes="56px" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-stone-900">{item.name}</span>
                        <span className="block text-xs text-muted">
                          {item.category === "slides" ? "Slide" : "Chinelo de dedo"} · R${" "}
                          {item.price.toFixed(2).replace(".", ",")}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-5 text-muted">
                O tamanho vale para os dois pares. Na dúvida, escolha o maior.
              </p>
            </div>
          )}

          <div className="mt-8">
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm font-bold text-stone-900" id="size-label">
                <Ruler size={18} className="text-accent" />{" "}
                {product.category === "kits" ? "Tamanho dos dois pares" : "Escolha o tamanho"}
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
                    className={`flex h-12 min-w-12 items-center justify-center rounded-full border px-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      soldOut
                        ? "cursor-not-allowed border-border/60 bg-surface text-muted line-through opacity-50"
                        : size === itemSize
                          ? "border-accent bg-accent text-white"
                          : "border-border bg-white hover:border-accent"
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
              <ScarcityNote available={availableFor(size)} isLowStock={product.isLowStock} />
            )}
          </div>

          <button
            onClick={handleClick}
            disabled={soldOutSelected}
            className={`mt-6 hidden w-full rounded-full py-4 text-sm font-bold text-white transition md:block ${
              added
                ? "bg-green-600"
                : size
                  ? "bg-accent hover:bg-accent-hover"
                  : "bg-accent/90 hover:bg-accent"
            } ${nudge ? "keeus-shake" : ""} disabled:cursor-not-allowed disabled:opacity-50`}
            aria-live="polite"
          >
            {added ? (
              <span className="inline-flex items-center gap-2">
                <Check size={17} /> Adicionado à sacola
              </span>
            ) : (
              ctaLabel
            )}
          </button>
          {nudge && (
            <p className="mt-2 hidden text-center text-xs font-medium text-accent md:block">
              Escolha um tamanho acima primeiro
            </p>
          )}

          <div className="mt-4">
            <ShippingCutoff />
          </div>

          <ShippingCalculator productPrice={product.price} />

          <ul className="mt-8 space-y-4 border-t border-border pt-6 text-sm text-stone-600">
            <li className="flex gap-3">
              <Truck className="mt-0.5 shrink-0 text-accent" size={18} />
              <div>
                <p className="font-semibold text-stone-900">Frete com prazo real</p>
                <p className="mt-0.5 text-xs leading-5">
                  Calcule SEDEX ou PAC pelo CEP acima. No checkout você confirma o serviço — o prazo
                  em dias úteis vem da cotação, não inventamos.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <RotateCcw className="mt-0.5 shrink-0 text-accent" size={18} />
              <div>
                <p className="font-semibold text-stone-900">Trocas</p>
                <p className="mt-0.5 text-xs leading-5">
                  Regras em{" "}
                  <Link href="/trocas" className="font-semibold text-accent underline underline-offset-2">
                    trocas e devoluções
                  </Link>
                  .
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 shrink-0 text-accent" size={18} />
              <div>
                <p className="font-semibold text-stone-900">Pix e cartão</p>
                <p className="mt-0.5 text-xs leading-5">
                  Pagamento via Mercado Pago. O pedido só consta como pago após confirmação.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile sticky ATC — large taps, thumb zone */}
      <div className="pdp-sticky-bar fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pt-3 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted">{product.name}</p>
            <p className="text-base font-extrabold text-stone-900">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClick}
            disabled={soldOutSelected}
            className={`min-h-12 flex-1 rounded-full px-4 text-sm font-bold text-white transition ${
              added ? "bg-green-600" : "bg-accent active:bg-accent-hover"
            } ${nudge ? "keeus-shake" : ""} disabled:opacity-50`}
          >
            {added ? (
              <span className="inline-flex items-center justify-center gap-1.5">
                <Check size={16} /> Sacola
              </span>
            ) : size ? (
              soldOutSelected ? "Esgotado" : "Adicionar"
            ) : (
              "Escolher tamanho"
            )}
          </button>
        </div>
        {nudge && (
          <p className="mx-auto mt-1.5 max-w-lg text-center text-[11px] font-medium text-accent">
            Selecione o tamanho acima
          </p>
        )}
      </div>
    </>
  );
}
