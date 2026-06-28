"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  quote: string;
  author: string;
  role?: string;
  accent?: string;
}

export default function CinematicQuote({ quote, author, role, accent = "#16A34A" }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote scale + fade entrance
      gsap.fromTo(quoteRef.current,
        { scale: 0.85, opacity: 0, rotateX: 10 },
        {
          scale: 1, opacity: 1, rotateX: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Subtle float animation
      gsap.to(quoteRef.current, {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-80 w-80 rounded-full opacity-[0.03] blur-3xl" style={{ backgroundColor: accent }} />
      </div>

      <div ref={quoteRef} className="mx-auto max-w-4xl px-6 text-center md:px-12" style={{ perspective: 1000 }}>
        {/* Opening mark */}
        <svg className="mx-auto mb-6 h-10 w-10 opacity-20" style={{ color: accent }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <blockquote className="font-display text-2xl font-light leading-relaxed text-white/80 md:text-3xl md:leading-relaxed">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="mt-8">
          <cite className="text-sm font-bold not-italic text-white">{author}</cite>
          {role && (
            <p className="mt-1 text-xs" style={{ color: accent }}>{role}</p>
          )}
        </div>

        {/* Decorative line */}
        <div className="mx-auto mt-10 h-px w-16" style={{ backgroundColor: accent }} />
      </div>
    </section>
  );
}
