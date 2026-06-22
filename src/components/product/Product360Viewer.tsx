"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { RotateCw, Pause, Play } from "lucide-react";

export default function Product360Viewer({
  slug,
  totalImages = 12,
}: {
  slug: string;
  totalImages?: number;
}) {
  const [index, setIndex] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev >= totalImages ? 1 : prev + 1));
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying, totalImages]);

  const handleDrag = (_: unknown, info: { offset: { x: number } }) => {
    const sensitivity = 20;
    const steps = Math.floor(Math.abs(info.offset.x) / sensitivity) % totalImages;
    if (steps === 0) return;
    if (info.offset.x > 0) {
      setIndex((prev) => ((prev - steps + totalImages - 1) % totalImages) + 1);
    } else {
      setIndex((prev) => ((prev + steps - 1) % totalImages) + 1);
    }
  };

  return (
    <div className="relative flex aspect-square cursor-grab items-center justify-center overflow-hidden rounded-xl bg-surface-light active:cursor-grabbing">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        style={{ x: dragX }}
        onDrag={handleDrag}
        className="flex h-full w-full items-center justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/products/${slug}/angles/angle-${String(index).padStart(2, "0")}.png`}
          alt={`Visualização 360 graus, ângulo ${index}`}
          className="max-h-full select-none object-contain"
          draggable={false}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/products/placeholder-angle.svg";
          }}
        />
      </motion.div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-background/70 p-2 backdrop-blur-md">
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-110"
          aria-label={isPlaying ? "Pausar rotação" : "Girar automaticamente"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="flex items-center gap-2 px-2 text-[10px] font-bold uppercase tracking-widest text-muted">
          <RotateCw size={12} className={isPlaying ? "animate-spin" : ""} />
          360° View
        </div>
      </div>
    </div>
  );
}
