"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { Shield, Award } from "lucide-react";

const PAYMENT_METHODS = [
  { name: "Visa", color: "#1A1F71", abbr: "VISA", textColor: "#fff" },
  { name: "Mastercard", color: "#EB001B", abbr: "MC", textColor: "#fff" },
  { name: "Pix", color: "#32BCAD", abbr: "PIX", textColor: "#fff" },
  { name: "Elo", color: "#FFD700", abbr: "ELO", textColor: "#111" },
  { name: "Hipercard", color: "#B22222", abbr: "HIPER", textColor: "#fff" },
  { name: "Amex", color: "#007BC1", abbr: "AMEX", textColor: "#fff" },
  { name: "Boleto", color: "#444", abbr: "BOLETO", textColor: "#fff" },
  { name: "PicPay", color: "#21C25E", abbr: "PICPAY", textColor: "#fff" },
];

const SECURITY_BADGES = [
  { icon: Shield, label: "Site Seguro SSL" },
  { icon: Award, label: "Marca Registrada" },
  { icon: Shield, label: "Certificado" },
  { icon: Award, label: "Suporte" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-accent bg-[#111111] text-white">
      {/* ── Top section ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/assets/real/logo-white.png"
              alt={`${SITE.name} Logo`}
              width={120}
              height={96}
              className="h-auto w-[100px] brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {SITE.tagline}. Marketplace de cursos online com certificado, aulas gravadas e acesso vitalício.
            </p>
          </div>

          {/* Col 2 — Categorias */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              Categorias
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Farmácia", href: "/cursos?categoria=farmacia" },
                { label: "Negócios", href: "/cursos?categoria=negocios" },
                { label: "Tecnologia", href: "/cursos?categoria=tecnologia" },
                { label: "Marketing", href: "/cursos?categoria=marketing" },
                { label: "Gastronomia", href: "/cursos?categoria=gastronomia" },
                { label: "Design", href: "/cursos?categoria=design" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Institucional */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              Ajuda & Empresa
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Sobre a Keeus", href: "/sobre" },
                { label: "Perguntas frequentes", href: "/perguntas-frequentes" },
                { label: "Política de privacidade", href: "/privacidade" },
                { label: "Termos de uso", href: "/termos" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Diferenciais */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              Por que Keeus?
            </p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Cursos 100% online e gravados</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Certificado digital de conclusão</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Acesso vitalício ao conteúdo</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Suporte direto com instrutores</span>
              </li>
            </ul>

            {/* Security badges */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {SECURITY_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-2"
                >
                  <Icon size={13} className="flex-shrink-0 text-accent" />
                  <span className="text-[10px] font-semibold text-white/50">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment section ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-widest text-white/30">
            Formas de pagamento aceitas
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PAYMENT_METHODS.map((pm) => (
              <div
                key={pm.name}
                className="flex h-8 min-w-[52px] items-center justify-center rounded-md px-2 text-[10px] font-black tracking-wide"
                style={{ background: pm.color, color: pm.textColor }}
                title={pm.name}
              >
                {pm.abbr}
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-white/30">
            Ambiente 100% seguro · Certificado SSL · Pagamento processado com criptografia
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-[11px] text-white/30 md:flex-row md:px-8">
          <div>
            <p>© {year} <strong>Keeus</strong> — Marketplace de Cursos Online</p>
            <p className="mt-0.5">Brasil · Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Criado por</span>
            <a
              href="https://reidasvendas.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent transition-colors hover:text-white"
            >
              Rei das Vendas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
