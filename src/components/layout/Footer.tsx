"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import {
  MessageCircle, MapPin, Phone, Mail, Shield, Award, Truck, RefreshCw
} from "lucide-react";

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
  { icon: Truck, label: "Frete Rápido" },
  { icon: RefreshCw, label: "Troca Grátis" },
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
              {SITE.tagline}. Chinelos premium com design exclusivo, conforto superior e entrega rápida para todo o Brasil.
            </p>
            {/* Social */}
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#25D366]"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Col 2 — Navegação */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              Coleções
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Linha Bahamas", href: "/colecao?linha=bahamas" },
                { label: "Linha Toledo", href: "/colecao?linha=toledo" },
                { label: "Linha Malibú", href: "/colecao?linha=malibu" },
                { label: "Lançamentos", href: "/colecao?filtro=lancamentos" },
                { label: "Edição Limitada", href: "/colecao?filtro=edicao-limitada" },
                { label: "Ver tudo", href: "/colecao" },
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
                { label: "Trocas e devoluções", href: "/trocas-e-devolucoes" },
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

          {/* Col 4 — Contato */}
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
              Atendimento
            </p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MessageCircle size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                <a
                  href={`https://wa.me/${SITE.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  WhatsApp · Seg–Sex 9h–18h
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>contato@keeus.com.br</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-accent" />
                <span>São Paulo – SP, Brasil</span>
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
            <p>© {year} <strong>VALDECIKEEUS Comércio de Calçados Ltda</strong> — CNPJ: 00.000.000/0001-00</p>
            <p className="mt-0.5">Franca – SP / Brasil · Todos os direitos reservados.</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <span className="text-accent">♥</span>
            <span>no Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
