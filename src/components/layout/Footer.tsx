"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { Shield, Award, Truck } from "lucide-react";

// SVG icons for real credit card flags
const CreditCardIcon = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div
    className="flex h-9 w-14 items-center justify-center rounded-lg bg-white border border-gray-200 px-1.5 py-1 shadow-sm"
    title={label}
    aria-label={label}
  >
    {children}
  </div>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      {/* ── Top section ── */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/assets/real/logo.png"
              alt={`${SITE.name} Logo`}
              width={120}
              height={96}
              className="h-auto w-[90px]"
            />
            <p className="mt-4 text-sm leading-relaxed text-foreground-mid">
              Chinelos premium com design exclusivo. Do beach club ao pôr do sol — conforto e estilo em cada passo. Frete grátis para todo Brasil.
            </p>
            {/* Redes sociais */}
            <div className="mt-4 flex gap-3">
              {[
                { name: "Instagram", href: "https://instagram.com/keeus", icon: "📷" },
                { name: "WhatsApp", href: "https://wa.me/5511999999999", icon: "💬" },
                { name: "TikTok", href: "https://tiktok.com/@keeus", icon: "🎵" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-border text-sm transition-all hover:border-accent hover:text-accent"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Produtos */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted">
              Produtos
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Slides", href: "/colecao?categoria=slides" },
                { label: "Flip Flops", href: "/colecao?categoria=flipflops" },
                { label: "Lançamentos", href: "/colecao?filtro=novos" },
                { label: "Todos os Produtos", href: "/colecao" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground-mid transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Ajuda & Empresa */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted">
              Ajuda & Empresa
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Sobre a Keeus", href: "/sobre" },
                { label: "Perguntas Frequentes", href: "/faq" },
                { label: "Trocas e Devoluções", href: "/trocas" },
                { label: "Política de Privacidade", href: "/privacidade" },
                { label: "Termos de Uso", href: "/termos" },
                { label: "Contato", href: "/contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-foreground-mid transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Diferenciais */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted">
              Por que Keeus?
            </p>
            <ul className="space-y-3 text-sm text-foreground-mid">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Frete grátis para todo Brasil</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Chinelos 100% originais com garantia</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Troca grátis em até 30 dias</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Suporte rápido via WhatsApp</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 text-accent">✓</span>
                <span>Pague com Pix e ganhe 5% OFF</span>
              </li>
            </ul>

            {/* Security badges */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {[
                { icon: Shield, label: "Site Seguro SSL" },
                { icon: Award, label: "Marca Registrada" },
                { icon: Truck, label: "Frete Grátis" },
                { icon: Shield, label: "Garantia 30 dias" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-2 border border-border"
                >
                  <Icon size={13} className="flex-shrink-0 text-accent" />
                  <span className="text-[10px] font-semibold text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment section with REAL credit card icons ── */}
      <div className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-widest text-muted">
            Formas de Pagamento
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Visa */}
            <CreditCardIcon label="Visa">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                <path d="M19.5 10.5L15 21h3l2.7-6.5 1.8 6.5h3l-3.5-10.5H19.5zM29 10.5l-2.5 10.5h3l2.5-10.5H29zM33.5 10.5l-3.5 7 1.3 3.5h3.2l-1-10.5zM13 10.5L10 21h3l3-10.5H13z" fill="white"/>
              </svg>
            </CreditCardIcon>

            {/* Mastercard */}
            <CreditCardIcon label="Mastercard">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#1A1A1A"/>
                <circle cx="20" cy="16" r="8" fill="#EB001B"/>
                <circle cx="28" cy="16" r="8" fill="#F79E1B" opacity="0.85"/>
                <path d="M24 10.5c-2 2-2 5 0 8v-8z" fill="#FF5F00"/>
              </svg>
            </CreditCardIcon>

            {/* Elo */}
            <CreditCardIcon label="Elo">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#00A4E0"/>
                <path d="M14 10h6l-2 6 2 6h-6l2-6-2-6zM22 16l3-6h7v12H25l-3-6z" fill="#F9A51A"/>
                <path d="M28 10h7v2h-5v2h4v2h-4v2h5v2h-7V10z" fill="white"/>
              </svg>
            </CreditCardIcon>

            {/* American Express */}
            <CreditCardIcon label="American Express">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#007BC1"/>
                <path d="M12 16l2-4h4v8h-4l-2-4zM22 12h4l2 4-2 4h-4v-8zM30 12h6v2h-5v1h4v2h-4v1h5v2h-6V12z" fill="white"/>
              </svg>
            </CreditCardIcon>

            {/* Hipercard */}
            <CreditCardIcon label="Hipercard">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#D42027"/>
                <circle cx="20" cy="16" r="7" fill="white" fillOpacity="0.2"/>
                <text x="30" y="20" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">HIPER</text>
              </svg>
            </CreditCardIcon>

            {/* PIX */}
            <CreditCardIcon label="PIX">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#32BCAD"/>
                <path d="M14 10l6 12L14 22h4l4-8 6 8h4l-6-12L32 10h-4l-4 8-6-8h-4z" fill="white"/>
              </svg>
            </CreditCardIcon>

            {/* Boleto */}
            <CreditCardIcon label="Boleto">
              <svg viewBox="0 0 48 32" fill="none" className="h-5 w-auto">
                <rect width="48" height="32" rx="4" fill="#6366F1"/>
                <path d="M12 12h24M12 16h18M12 20h24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </CreditCardIcon>
          </div>
          <p className="mt-5 text-center text-[11px] text-muted">
            Ambiente 100% seguro · Certificado SSL · Pagamento processado com criptografia
          </p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-[12px] text-muted md:flex-row md:px-8">
          <div>
            <p>© {year} <strong className="text-foreground">Keeus</strong> — Chinelos Premium</p>
            <p className="mt-0.5">Brasil · CNPJ: 00.000.000/0001-00 · Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted">Criado por</span>
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
