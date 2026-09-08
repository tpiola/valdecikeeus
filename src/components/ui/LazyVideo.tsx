"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  mp4: string;
  webm?: string;
  poster?: string;
  className?: string;
  /** When true, starts only after intersecting viewport */
  lazy?: boolean;
};

/**
 * Muted, playsInline, lazy autoplay. Honors prefers-reduced-motion (shows poster only).
 */
export default function LazyVideo({
  mp4,
  webm,
  poster,
  className = "",
  lazy = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(!lazy);

  useEffect(() => {
    if (!lazy || reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { rootMargin: "120px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [lazy, reduceMotion]);

  useEffect(() => {
    if (!active || reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    void el.play().catch(() => undefined);
  }, [active, reduceMotion]);

  if (reduceMotion) {
    return poster ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={poster} alt="" className={className} />
    ) : (
      <div className={className} aria-hidden />
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      muted
      playsInline
      loop
      autoPlay={active}
      preload={active ? "metadata" : "none"}
      poster={poster}
      aria-hidden
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
