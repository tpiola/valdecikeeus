"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SoccerParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // IntersectionObserver for smooth activation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  if (!isVisible) {
    return (
      <div ref={containerRef} className="flex items-center justify-center py-24">
        <div className="text-8xl opacity-30 select-none">⚽</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center py-24 overflow-hidden"
    >
      {/* Green glow behind the ball */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.2, 0.08]) }}
        className="absolute w-64 h-64 rounded-full bg-accent blur-3xl"
      />

      {/* Soccer ball with parallax */}
      <motion.div
        style={{ y, rotate, scale, opacity }}
        className="text-8xl select-none filter drop-shadow-[0_0_30px_rgba(0,255,65,0.4)]"
      >
        ⚽
      </motion.div>

      {/* Decorative grass line */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.5, 0.5, 0]),
        }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
      />
    </div>
  );
}
