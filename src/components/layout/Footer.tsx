"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { ArrowUpRight, Ruler, RotateCcw, ShieldCheck } from "lucide-react";

const productLinks = [
  { label: "Todos os modelos", href: "/colecao" },
  { label: "Slides", href: "/colecao?categoria=slides" },
  { label: "Chinelos de dedo", href: "/colecao?categoria=flipflops" },
  { label: "Kits", href: "/colecao?categoria=kits" },
  { label: "Lançamentos", href: "/colecao?filtro=novos" },
];

const supportLinks = [
  { label: "Guia e dúvidas", href: "/faq" },
  { label: "Trocas e devoluções", href: "/trocas" },
  { label: "Contato", href: "/contato" },
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#171512] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.25fr_1fr_1fr] md:px-8">
        <div>
          <Image src="/assets/real/logo.png" alt={`${SITE.name} Logo`} width={110} height={88} className="h-auto w-24 rounded-xl bg-white p-2" />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            Keeus vende slides e chinelos de dedo com fotos reais, numeração clara e pagamento via Pix ou cartão. Políticas de troca, privacidade e termos estão no menu de atendimento.
          </p>
          <Link href="/sobre" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#ff8a55] hover:text-white">
            Conheça a Keeus <ArrowUpRight size={16} />
          </Link>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-white/45">Comprar</h2>
          <ul className="mt-5 space-y-3">
            {productLinks.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-white/75 hover:text-white">{item.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-white/45">Atendimento</h2>
          <ul className="mt-5 space-y-3">
            {supportLinks.map((item) => <li key={item.href}><Link href={item.href} className="text-sm text-white/75 hover:text-white">{item.label}</Link></li>)}
          </ul>
        </div>
      </div>

      <div className="border-y border-white/10">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 py-7 sm:grid-cols-3 md:px-8">
          <div className="flex items-center gap-3"><Ruler className="text-[#ff8a55]" size={22} /><div><p className="text-sm font-semibold">Tamanho primeiro</p><p className="text-xs text-white/50">Escolha antes de adicionar</p></div></div>
          <div className="flex items-center gap-3"><RotateCcw className="text-[#ff8a55]" size={22} /><div><p className="text-sm font-semibold"><Link href="/trocas" className="hover:text-white">Trocas com regras</Link></p><p className="text-xs text-white/50">Leia antes de fechar o pedido</p></div></div>
          <div className="flex items-center gap-3"><ShieldCheck className="text-[#ff8a55]" size={22} /><div><p className="text-sm font-semibold">Pix e cartão</p><p className="text-xs text-white/50">Pedido pago só após confirmação</p></div></div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {new Date().getFullYear()} Keeus. Todos os direitos reservados.</p>
        <p>Experiência digital por <a href="https://reidasvendas.com.br" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/70 hover:text-white">Rei das Vendas</a></p>
      </div>
    </footer>
  );
}
