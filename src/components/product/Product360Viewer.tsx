"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCw, Pause, Play, ZoomIn } from "lucide-react";
import Image from "next/image";

export default function Product360Viewer({
  slug,
  gallery,
  totalImages,
}: {
  slug: string;
  gallery?: string[];
  totalImages?: number;
}) {
  const images = gallery && gallery.length > 0 ? gallery : [];
  const count = images.length || totalImages || 4;

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(false);
  const startX = useRef<number | null>(null);
  const lastIndex = useRef(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, count]);

  const getSrc = (i: number) => {
    if (images[i]) return images[i];
    return `/products/${slug}/angles/angle-${String(i + 1).padStart(2, "0")}.png`;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    lastIndex.current = index;
    setIsDragging(true);
    setIsPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || startX.current === null) return;
    const delta = e.clientX - startX.current;
    const sensitivity = 40;
    const steps = Math.floor(Math.abs(delta) / sensitivity);
    if (steps === 0) return;
    const dir = delta > 0 ? -1 : 1;
    const newIndex = ((lastIndex.current + dir * steps) % count + count) % count;
    setIndex(newIndex);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    startX.current = null;
  };

  return (
    <div className="group relative select-none overflow-hidden rounded-2xl bg-[#0e0e12]">
      {/* Main image */}
      <div
        className={`relative aspect-square ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {images.length > 0 ? (
          <Image
            src={getSrc(index)}
            alt={`${slug} - ângulo ${index + 1}`}
            fill
            className={`object-contain transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
            draggable={false}
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/products/placeholder-angle.svg";
            }}
          />
        ) : (
          // Fallback angle images
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getSrc(index)}
            alt={`${slug} - ângulo ${index + 1}`}
            className={`h-full w-full object-contain transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
            draggable={false}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/products/placeholder-angle.svg";
            }}
          />
        )}

        {/* 360 badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
          <RotateCw size={11} className={`text-[#d8ff4f] ${isPlaying ? "animate-spin" : ""}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#d8ff4f]">360°</span>
        </div>

        {/* Zoom button */}
        <button
          onClick={() => setZoom((z) => !z)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/60 backdrop-blur-sm transition-all hover:text-white"
          aria-label="Zoom"
        >
          <ZoomIn size={14} />
        </button>

        {/* Drag hint (only first time) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isDragging ? 0 : 1 }}
          className="absolute inset-x-0 bottom-14 flex justify-center"
        >
          <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] text-white/50 backdrop-blur-sm">
            ← Arraste para girar →
          </span>
        </motion.div>
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between border-t border-white/5 bg-[#0a0a0d] px-4 py-3">
        {/* Thumbnail strip */}
        <div className="flex gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => { setIndex(i); setIsPlaying(false); }}
              className="relative h-8 w-8 overflow-hidden rounded-md border transition-all"
              style={{
                borderColor: i === index ? "#d8ff4f" : "rgba(255,255,255,0.08)",
              }}
            >
              {images[i] ? (
                <Image src={images[i]} alt="" fill className="object-contain" sizes="32px" />
              ) : (
                <div className="h-full w-full bg-white/5" />
              )}
            </button>
          ))}
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8ff4f] text-[#050506] transition-transform hover:scale-110"
          aria-label={isPlaying ? "Pausar rotação" : "Girar automaticamente"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
