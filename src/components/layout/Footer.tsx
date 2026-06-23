"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { Shield, Award, Truck } from "lucide-react";

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
  { icon: Truck, label: "Frete Grátis" },
  { icon: Shield, label: "Garantia 7 dias" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-[#00FF41] bg-surface shadow-[0_-4px_24px_rgba(0,255,65,0.03)]">
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
            <p className="mt-4 text-sm leading-relaxed text-foreground/60">
              {SITE.tagline}. Loja oficial de chuteiras e chinelos premium. Do campo ao rolê. Frete grátis para todo Brasil.
            </p>
          </div>

          {/* Col 2 — Categorias */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-foreground/30">
              Categorias
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Chuteiras Campo", href: "/colecao?categoria=campo" },
                { label: "Chuteiras Society", href: "/colecao?categoria=society" },
                { label: "Chuteiras Futsal", href: "/colecao?categoria=futsal" },
                { label: "Chinelos", href: "/colecao?categoria=chinelo" },
                { label: "Lançamentos", href: "/colecao?filtro=novos" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Institucional */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-foreground/30">
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
                    className="text-foreground/60 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Diferenciais */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-foreground/30">
              Por que Keeus?
            </p>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Frete grátis para todo Brasil</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Chuteiras e chinelos 100% originais</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Troca grátis em até 7 dias</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Suporte rápido via WhatsApp</span>
              </li>
            </ul>

            {/* Security badges */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {SECURITY_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg bg-foreground/5 px-2.5 py-2"
                >
                  <Icon size={13} className="flex-shrink-0 text-accent" />
                  <span className="text-[10px] font-semibold text-foreground/40">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment section ── */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-widest text-foreground/20">
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
          <p className="mt-3 text-center text-[11px] text-foreground/20">
            Ambiente 100% seguro · Certificado SSL · Pagamento processado com criptografia
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-[11px] text-foreground/20 md:flex-row md:px-8">
          <div>
            <p>© {year} <strong className="text-foreground/40">Keeus</strong> — Chuteiras e Chinelos Premium</p>
            <p className="mt-0.5">Brasil · Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Criado por</span>
            <a
              href="https://reidasvendas.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-accent transition-colors hover:text-foreground"
            >
              Rei das Vendas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
