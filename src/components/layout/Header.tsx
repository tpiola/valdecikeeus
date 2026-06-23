"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X, ChevronDown } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Frete grátis bar ── */}
      <div className="free-shipping-bar">
        🚚 Frete GRÁTIS para todo Brasil · Parcelamos em até 6x sem juros
      </div>

      {/* ── Header principal ── */}
      <header
        className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_12px_rgba(0,255,65,0.06)]" : "border-b border-border"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/real/logo.png"
              alt={`${SITE.name} Logo`}
              width={90}
              height={72}
              className="h-auto w-[72px] md:w-[90px] brightness-0 invert"
              priority
            />
          </Link>

          {/* Nav desktop */}
          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-1 text-sm font-semibold text-foreground-mid transition-colors hover:text-accent"
              >
                {link.label}
                <ChevronDown size={13} className="text-muted transition-transform group-hover:rotate-180" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-3 md:gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Buscar"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
            >
              <Search size={19} />
            </button>

            {/* Wishlist */}
            <Link
              href="/favoritos"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
              aria-label="Favoritos"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-fore">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
              aria-label="Sacola"
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-fore">
                  {count}
                </span>
              )}
            </button>

            {/* CTA desktop */}
            <Link
              href="/colecao"
              className="hidden rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-accent-fore transition-colors hover:bg-accent-hover lg:block"
            >
              Ver Coleção
            </Link>
          </div>
        </div>

        {/* Search bar expandable */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-background"
            >
              <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
                <Search size={16} className="text-muted flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar chuteiras, chinelos, marcas, modelos..."
                  className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-muted hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-background"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Image
                src="/assets/real/logo.png"
                alt={`${SITE.name} Logo`}
                width={80}
                height={64}
                className="h-auto w-[72px] brightness-0 invert"
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile nav */}
            <nav className="flex flex-col divide-y divide-border">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-6 py-5 text-base font-bold text-foreground hover:text-accent"
                  >
                    {link.label}
                    <ChevronDown size={16} className="-rotate-90 text-muted" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-auto p-6">
              <Link
                href="/colecao"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center py-4 text-sm"
              >
                Ver Coleção Completa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
