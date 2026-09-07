"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/colecao?busca=${encodeURIComponent(value)}` : "/colecao");
    setSearchOpen(false);
  }

  return (
    <>
      <div className="store-notice-bar">
        Slide e chinelo de dedo · Foto real em cada anúncio · Escolha o tamanho antes de comprar
      </div>

      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-[0_1px_20px_rgba(0,0,0,0.06)]" : "border-b border-border"}`}>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          <button className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>

          <Link href="/" className="flex-shrink-0" aria-label="Ir para a página inicial">
            <Image src="/assets/real/logo.png" alt={`${SITE.name} Logo`} width={90} height={72} className="h-auto w-[60px] md:w-[80px]" priority />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group relative text-sm font-semibold text-foreground-mid transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen((value) => !value)} aria-expanded={searchOpen} aria-controls="site-search" aria-label="Buscar produtos" className="flex h-11 w-11 items-center justify-center rounded-full text-foreground-mid hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent">
              <Search size={19} />
            </button>
            <Link href="/favoritos" className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground-mid hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent" aria-label={`Favoritos: ${wishlistCount} item(ns)`}>
              <Heart size={19} />
              {wishlistCount > 0 && <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">{wishlistCount}</span>}
            </Link>
            <button onClick={openCart} className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground-mid transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent" aria-label={`Sacola: ${count} item(ns)`}>
              <ShoppingBag size={19} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </button>
            <Link href="/colecao" className="ml-2 hidden rounded-full bg-accent px-5 py-3 text-xs font-bold text-white hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:block">
              Ver coleção
            </Link>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div id="site-search" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border bg-white">
              <form onSubmit={handleSearch} className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4" role="search">
                <Search size={18} className="shrink-0 text-muted" />
                <label htmlFor="header-search" className="sr-only">Buscar por modelo ou cor</label>
                <input id="header-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: Malibu, preto ou slide" className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted" />
                <button type="submit" className="rounded-full bg-accent px-4 py-2 text-xs font-bold text-white">Buscar</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-surface" aria-label="Fechar busca"><X size={18} /></button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[80] flex flex-col bg-white" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.25 }} role="dialog" aria-modal="true" aria-label="Menu">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <Link href="/" onClick={() => setMenuOpen(false)}><Image src="/assets/real/logo.png" alt={`${SITE.name} Logo`} width={80} height={64} className="h-auto w-[60px]" /></Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-surface"><X size={22} /></button>
            </div>
            <nav className="flex flex-col divide-y divide-border" aria-label="Menu móvel">
              {NAV_LINKS.map((link, index) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between px-6 py-5 text-lg font-semibold hover:text-accent">{link.label}<span aria-hidden="true">→</span></Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto p-6">
              <Link href="/colecao" onClick={() => setMenuOpen(false)} className="btn-primary w-full rounded-full py-4 text-sm">Ver coleção completa</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
