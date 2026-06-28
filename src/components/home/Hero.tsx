"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 80, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
      );

      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.4 }
      );

      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );

      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 }
      );

      // Parallax on scroll
      if (sectionRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(textRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[95vh] overflow-hidden bg-white">
      {/* Cinematic background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-orange-50 to-orange-100/40" />
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 40%, #FF5F1F 0%, transparent 50%), radial-gradient(circle at 80% 60%, #FF5F1F 0%, transparent 40%)",
          }}
        />
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[95vh] max-w-7xl flex-col-reverse items-center px-6 md:flex-row md:px-12">
        {/* ── Left Content ── */}
        <div className="w-full pb-8 pt-4 md:w-1/2 md:pb-24 md:pt-20 md:pr-16">
          <div ref={badgeRef}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF5F1F] shadow-sm backdrop-blur-sm">
              <Truck size={12} />
              Frete Grátis para todo Brasil
            </span>
          </div>

          <div ref={textRef} className="mt-8" style={{ perspective: 1000 }}>
            <h1 className="font-display text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight text-stone-900">
              <span className="block">Conforto Que</span>
              <span className="block text-[#FF5F1F]">Define Seu</span>
              <span className="block">Verão</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-500">
              Chinelos premium com design contemporâneo, palmilha anatômica e a qualidade que seus pés merecem. Coleção Verão 2026.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/colecao"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#FF5F1F] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Explorar Coleção
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/colecao?categoria=slides"
                className="inline-flex items-center rounded-full border border-stone-200 bg-white/80 px-8 py-4 text-sm font-semibold text-stone-700 backdrop-blur-sm transition-all hover:border-stone-300 hover:bg-white"
              >
                Slides
              </Link>
            </div>
          </div>

          <div ref={statsRef} className="mt-14 flex gap-8 border-t border-stone-100 pt-8">
            {[
              { value: "+5.000", label: "Clientes" },
              { value: "30 Dias", label: "Garantia" },
              { value: "Grátis", label: "Frete BR" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-black text-stone-900">{stat.value}</p>
                <p className="text-[11px] text-stone-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Cinematic Product Showcase ── */}
        <div ref={imageRef} className="relative flex w-full items-center justify-center md:w-1/2 md:min-h-[95vh]">
          {/* Glow orb */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-[400px] w-[400px] rounded-full bg-[#FF5F1F] opacity-[0.06] blur-3xl" />
          </div>

          {/* Main product image */}
          <div className="relative z-10 flex items-center justify-center py-12 md:py-0">
            <div className="relative h-[320px] w-[320px] md:h-[480px] md:w-[480px]">
              <Image
                src="/assets/real/produtos/toledo-preto-laranja/2k/1.png"
                alt="Keeus Toledo Preto Laranja"
                fill
                className="object-contain drop-shadow-[0_20px_60px_rgba(255,95,31,0.12)]"
                priority
                sizes="(max-width: 768px) 320px, 480px"
              />
            </div>
          </div>

          {/* Floating price badge */}
          <div className="absolute bottom-16 left-4 z-20 hidden rounded-2xl border border-orange-100 bg-white/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-sm md:block">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">A partir de</p>
            <p className="text-xl font-black text-stone-900">R$ 139</p>
            <p className="flex items-center gap-1 text-[10px] font-bold text-[#FF5F1F]">
              <Shield size={11} />
              até 4x sem juros
            </p>
          </div>

          {/* Floating trust badge */}
          <div className="absolute right-4 top-20 z-20 hidden rounded-2xl border border-orange-100 bg-white/90 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-sm md:block">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 w-5 rounded-full border-2 border-white bg-stone-200" />
                ))}
              </div>
              <div>
                <p className="text-[10px] font-bold text-stone-900">Joia!</p>
                <p className="text-[9px] text-stone-400">+500 avaliações</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
