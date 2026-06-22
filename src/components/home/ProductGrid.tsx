"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductGrid({
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".product-card-item");
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 88%",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-background px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex items-center gap-1.5 text-sm font-bold text-accent transition-all hover:gap-2.5"
            >
              Ver todos <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <div key={product.id} className="product-card-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
