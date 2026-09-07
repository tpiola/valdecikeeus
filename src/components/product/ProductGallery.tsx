"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  slug,
  gallery,
  alt,
}: {
  slug: string;
  gallery?: string[];
  alt: string;
}) {
  const images = gallery && gallery.length > 0 ? gallery : [];
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface">
        <Image src={`/products/${slug}/angles/angle-01.png`} alt={alt} fill className="object-contain p-6" />
      </div>
    );
  }

  return (
    <div>
      {/* Foto principal */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
        <Image
          src={images[active]}
          alt={`${alt} — foto ${active + 1} de ${images.length}`}
          fill
          priority={active === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6 md:p-10"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white">
          {active + 1}/{images.length}
        </span>
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2" role="tablist" aria-label="Fotos do produto">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-surface transition-all ${
                active === i
                  ? "ring-2 ring-accent ring-offset-2"
                  : "opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="160px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
