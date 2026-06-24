"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.8 };

export function ScrollReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
      transition={spring}
      className={className}
    >
      {children}
    </motion.div>
  );
}
