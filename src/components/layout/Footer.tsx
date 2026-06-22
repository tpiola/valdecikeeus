"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="mb-4">
            <Image
              src="/assets/real/logo.png"
              alt={`${SITE.name} Logo`}
              width={120}
              height={100}
              className="h-auto w-[120px]"
            />
          </div>
          <p className="mt-4 text-sm text-muted">{SITE.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            Institucional
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/sobre" className="hover:text-accent">Sobre a Keeus</Link></li>
            <li><Link href="/trocas-e-devolucoes" className="hover:text-accent">Trocas e devoluções</Link></li>
            <li><Link href="/perguntas-frequentes" className="hover:text-accent">Perguntas frequentes</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            Atendimento
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            Pagamento e segurança
          </p>
          <p className="mt-4 text-sm text-muted">
            Pix, cartão de crédito em até 3x sem juros e boleto bancário.
            Ambiente 100% seguro.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted md:px-8">
        © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
