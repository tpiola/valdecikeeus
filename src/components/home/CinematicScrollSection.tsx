"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 360° rotation pinned scroll
      gsap.to(productRef.current, {
        rotation: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Floating scale effect on the product
      gsap.to(productRef.current, {
        scale: 1.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "center center",
          scrub: 1,
        },
      });

      // Text parallax
      gsap.fromTo(textRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center center",
          scrub: 1,
        }}
      );

      // Specs fade in
      gsap.fromTo(specsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom 60%",
          scrub: 1,
        }}
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[200vh] bg-[#0A0A0A] overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="sticky top-0 flex min-h-screen items-center justify-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6 md:flex-row md:px-12">
          {/* Product — 360 spin */}
          <div ref={productRef} className="flex w-full items-center justify-center md:w-1/2" style={{ transformOrigin: "center center" }}>
            <div className="relative h-[300px] w-[300px] md:h-[450px] md:w-[450px]">
              <Image
                src="/assets/real/produtos/toledo-preto-laranja/2k/1.png"
                alt="Keeus Toledo em rotação 360"
                fill
                className="object-contain drop-shadow-[0_20px_60px_rgba(255,95,31,0.08)]"
                priority
                sizes="(max-width: 768px) 300px, 450px"
              />
            </div>
          </div>

          {/* Text that reveals on scroll */}
          <div ref={textRef} className="mt-8 w-full md:mt-0 md:w-1/2 md:pl-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF5F1F]">
              Conforto em cada passo
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white md:text-5xl">
              Conforto que<br />
              <span className="text-[#FF5F1F]">define</span><br />
              seu verão
            </h2>

            <div ref={specsRef} className="mt-8 space-y-4 border-t border-white/[0.06] pt-6">
              {[
                { label: "Palmilha", value: "EVA Memory Foam" },
                { label: "Peso", value: "180g" },
                { label: "Solado", value: "Antiderrapante" },
                { label: "Tecnologia", value: "Anatômica 3D" },
              ].map((spec) => (
                <div key={spec.label} className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                  <span className="text-sm text-[#555]">{spec.label}</span>
                  <span className="text-sm font-bold text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
