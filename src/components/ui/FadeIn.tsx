"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Entrada suave única ao montar (hero) — fade + leve subida.
 * Respeita prefers-reduced-motion. delay em ms.
 */
export default function FadeIn({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"hidden" | "show">("hidden");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setState("show");
      return;
    }
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => setState("show"), 60);
    return () => clearTimeout(t);
  }, []);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: state === "show" ? 1 : 0,
        transform:
          state === "show" || from === "none"
            ? "translateY(0)"
            : "translateY(16px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
