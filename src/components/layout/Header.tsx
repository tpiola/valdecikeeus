"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const count = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>

        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/assets/real/logo.png"
            alt={`${SITE.name} Logo`}
            width={100}
            height={80}
            className="h-auto w-[80px] md:w-[100px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button aria-label="Buscar" className="hidden md:block">
            <Search size={20} />
          </button>
          <Link href="/favoritos" className="relative hidden md:block" aria-label="Favoritos">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button onClick={openCart} className="relative" aria-label="Abrir sacola">
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between px-4 py-4">
              <span className="flex items-center">
                <Image
                  src="/assets/real/logo.png"
                  alt={`${SITE.name} Logo`}
                  width={80}
                  height={60}
                  className="h-auto w-[80px]"
                />
              </span>
              <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-6 py-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
