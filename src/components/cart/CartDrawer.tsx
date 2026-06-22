"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, updateQuantity, total } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-surface border-l border-border"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-sm uppercase tracking-[0.2em]">
                Sua Sacola ({items.length})
              </h2>
              <button onClick={close} aria-label="Fechar sacola">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted">
                  <ShoppingBag size={32} />
                  <p className="text-sm">Sua sacola está vazia.</p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li
                      key={`${item.product.slug}-${item.size}`}
                      className="flex gap-4"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-light">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted">
                            Tam. {item.size}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.slug,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Diminuir quantidade"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-4 text-center text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.slug,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Aumentar quantidade"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-accent">
                            R$ {(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.slug, item.size)
                        }
                        className="self-start text-muted hover:text-foreground"
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
              <div className="border-t border-border px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted">Subtotal</span>
                  <span className="font-display text-lg">
                    R$ {total().toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-full bg-accent py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Finalizar Compra
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
