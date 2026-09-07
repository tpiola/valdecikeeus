import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";

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
  return (
    <section className="bg-white px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1.5 text-sm text-muted">{subtitle}</p>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Ver todos <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
