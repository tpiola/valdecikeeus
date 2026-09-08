"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQuantity, total } = useCartStore();
  const reduceMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => titleRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={close}
          />
          <motion.aside
            ref={panelRef}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }
            }
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2
                id="cart-drawer-title"
                ref={titleRef}
                tabIndex={-1}
                className="text-sm font-semibold tracking-wide text-stone-900 outline-none"
              >
                Sacola ({items.length})
              </h2>
              <button
                onClick={close}
                aria-label="Fechar sacola"
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted">
                  <ShoppingBag size={32} />
                  <p className="text-sm">Sua sacola está vazia.</p>
                  <Link
                    href="/colecao"
                    onClick={close}
                    className="mt-2 text-sm font-semibold text-[var(--accent)] underline underline-offset-2"
                  >
                    Ver coleção
                  </Link>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li key={`${item.product.slug}-${item.size}`} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <p className="truncate text-sm font-semibold text-stone-900">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted">Tam. {item.size}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1 rounded-full border border-border px-1 py-1">
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center"
                              onClick={() =>
                                updateQuantity(item.product.slug, item.size, item.quantity - 1)
                              }
                              aria-label="Diminuir quantidade"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center"
                              onClick={() =>
                                updateQuantity(item.product.slug, item.size, item.quantity + 1)
                              }
                              aria-label="Aumentar quantidade"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-stone-900">
                            R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.slug, item.size)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center self-start text-muted hover:text-foreground"
                        aria-label="Remover item"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-drawer-footer border-t border-border px-5 pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted">Subtotal</span>
                  <span className="text-lg font-semibold text-stone-900">
                    R$ {total().toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <p className="mb-4 flex items-start gap-2 text-[11px] leading-4 text-muted">
                  <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                  <span>
                    Frete e prazo no checkout · Pix e cartão ·{" "}
                    <Link href="/trocas" onClick={close} className="underline underline-offset-2">
                      trocas
                    </Link>
                  </span>
                </p>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]"
                >
                  Finalizar compra
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
