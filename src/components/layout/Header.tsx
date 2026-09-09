"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { FLASH_SALE, NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { getCountdownParts } from "@/components/conversion/Countdown";
import { getFlashSaleProducts } from "@/lib/products";

export default function Header() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [flashAlive, setFlashAlive] = useState(() => {
    if (!FLASH_SALE.enabled) return false;
    return !getCountdownParts(FLASH_SALE.endsAt).expired;
  });
  const count = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!FLASH_SALE.enabled) return;
    const tick = () => setFlashAlive(!getCountdownParts(FLASH_SALE.endsAt).expired);
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, searchOpen]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/colecao?busca=${encodeURIComponent(value)}` : "/colecao");
    setSearchOpen(false);
  }

  const flashItems = flashAlive ? getFlashSaleProducts() : [];
  const flashCountText =
    flashItems.length === 0
      ? ""
      : flashItems.length === 1
        ? " · 1 modelo em oferta"
        : ` · ${flashItems.length} modelos em oferta`;
  const notice = flashAlive
    ? `${FLASH_SALE.label}${flashCountText} · Pix e cartão · Trocas claras`
    : "Keeus — slide e chinelo de dedo · Pix e cartão · Trocas com regras claras";

  return (
    <>
      <div className="store-notice-bar">
        {flashAlive ? (
          <Link href={FLASH_SALE.href} className="underline-offset-2 hover:underline">
            {notice}
          </Link>
        ) : (
          <span>{notice}</span>
        )}
      </div>

      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.06)]" : "border-b border-border"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={22} />
          </button>

          <Link href="/" className="flex-shrink-0" aria-label="Ir para a página inicial">
            <Image
              src="/assets/real/logo.png"
              alt={`${SITE.name} Logo`}
              width={90}
              height={72}
              className="h-auto w-[60px] md:w-[72px]"
              priority
            />
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-8 lg:flex"
            aria-label="Navegação principal"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-normal text-stone-600 transition-colors hover:text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
                <span
                  className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setSearchOpen((value) => !value)}
              aria-expanded={searchOpen}
              aria-controls="site-search"
              aria-label="Buscar produtos"
              className="flex h-11 w-11 items-center justify-center rounded-full text-stone-600 hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Search size={19} />
            </button>
            <Link
              href="/favoritos"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-stone-600 hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={`Favoritos: ${wishlistCount} item(ns)`}
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={`Sacola: ${count} item(ns)`}
            >
              <ShoppingBag size={19} />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              id="site-search"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border bg-white"
            >
              <form
                onSubmit={handleSearch}
                className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4"
                role="search"
              >
                <Search size={18} className="shrink-0 text-muted" />
                <label htmlFor="header-search" className="sr-only">
                  Buscar por modelo ou cor
                </label>
                <input
                  id="header-search"
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Ex.: Malibu, preto ou slide"
                  className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
                >
                  Buscar
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-surface"
                  aria-label="Fechar busca"
                >
                  <X size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-white"
            initial={reduceMotion ? false : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "-100%" }}
            transition={{ type: "tween", duration: reduceMotion ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <Image
                  src="/assets/real/logo.png"
                  alt={`${SITE.name} Logo`}
                  width={80}
                  height={64}
                  className="h-auto w-[60px]"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col divide-y divide-border" aria-label="Menu móvel">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-6 py-5 text-lg font-medium hover:text-[var(--accent)]"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
