"use client";

import Link from "next/link";
import Image from "next/image";
import { COMPANY, SITE } from "@/lib/constants";

const shopLinks = [
  { label: "Coleção", href: "/colecao" },
  { label: "Slides", href: "/colecao?categoria=slides" },
  { label: "Chinelos de dedo", href: "/colecao?categoria=flipflops" },
  { label: "Kits", href: "/colecao?categoria=kits" },
  { label: "Lançamentos", href: "/colecao?filtro=novos" },
];

const helpLinks = [
  { label: "Guia e dúvidas", href: "/faq" },
  { label: "Trocas e devoluções", href: "/trocas" },
  { label: "Contato", href: "/contato" },
  { label: "Sobre a Keeus", href: "/sobre" },
];

const legalLinks = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
];

/**
 * Footer editorial — quiet luxury, clear columns, honest trust.
 * Orange used sparingly. No invented CNPJ / Mercado Pago claims beyond Pix+card.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#111110] text-white">
      {/* Main editorial grid */}
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          {/* Brand column */}
          <div className="md:col-span-5 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF5F1F]"
              aria-label={`${SITE.name} — início`}
            >
              <Image
                src="/assets/real/logo.png"
                alt=""
                width={96}
                height={76}
                className="h-auto w-[4.5rem] rounded-lg bg-white/95 p-1.5"
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/55">
              Slides e chinelos de dedo com fotos reais, numeração clara e frete
              cotado pelo CEP. Pagamento via Pix ou cartão.
            </p>
            {COMPANY.email ? (
              <a
                href={`mailto:${COMPANY.email}`}
                className="mt-5 inline-block text-sm text-white/70 transition hover:text-white"
              >
                {COMPANY.email}
              </a>
            ) : null}
            <p className="mt-5 max-w-sm text-xs leading-5 text-white/35">
              {COMPANY.cnpj
                ? `${COMPANY.legalName} · CNPJ ${COMPANY.cnpj}`
                : COMPANY.policiesNote}
            </p>
          </div>

          {/* Shop */}
          <nav className="md:col-span-2 md:col-start-7" aria-label="Comprar">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Comprar
            </h2>
            <ul className="mt-5 space-y-3.5">
              {shopLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help */}
          <nav className="md:col-span-2" aria-label="Atendimento">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Ajuda
            </h2>
            <ul className="mt-5 space-y-3.5">
              {helpLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal + trust */}
          <div className="md:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Legal
            </h2>
            <ul className="mt-5 space-y-3.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-2 border-t border-white/[0.08] pt-6">
              <p className="text-sm font-medium text-white/80">Pix e cartão</p>
              <p className="text-xs leading-5 text-white/40">
                Total e frete visíveis antes de pagar. Trocas com regras claras em{" "}
                <Link href="/trocas" className="text-white/55 underline-offset-2 hover:text-white hover:underline">
                  trocas e devoluções
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet trust rail — no icon clutter */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-[12px] text-white/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            <span>Tamanho antes de adicionar</span>
            <span className="hidden text-white/20 sm:inline" aria-hidden>
              ·
            </span>
            <span>Frete cotado pelo CEP</span>
            <span className="hidden text-white/20 sm:inline" aria-hidden>
              ·
            </span>
            <span>Pix e cartão no checkout</span>
          </p>
          <Link
            href="/colecao"
            className="text-[12px] font-semibold text-[#FF5F1F] transition hover:text-[#ff8a55]"
          >
            Ir à coleção →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[11px] text-white/35 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <p>
            Experiência digital por{" "}
            <a
              href="https://reidasvendas.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 transition hover:text-white"
            >
              Rei das Vendas
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
