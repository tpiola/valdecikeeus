"use client";

import Link from "next/link";

export default function SocialChannels() {
  const whatsappMsg = encodeURIComponent("Olá Keeus! Vim pelo site e quero saber mais sobre a coleção. 😊");

  return (
    <section className="border-y border-border bg-surface py-14 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
            Conecte-se
          </p>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
            Também vendemos por aqui
          </h2>
          <p className="mt-2 text-sm text-muted">
            Escolha o canal preferido — atendimento rápido e entrega garantida.
          </p>
        </div>

        {/* Channels grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Shopee */}
          <a
            href="https://shopee.com.br/keeusstore"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EE4D2D]">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="white">
                <path d="M85 45c0-19.3-15.7-35-35-35S15 25.7 15 45c0 14.5 8.9 27 21.6 32.4L33 90h34l-3.6-12.6C75.1 72 85 59.5 85 45z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">Shopee Keeus</p>
              <p className="mt-1 text-xs text-muted">Loja oficial · frete grátis</p>
            </div>
            <span className="mt-1 inline-block rounded-full bg-[#EE4D2D] px-4 py-1.5 text-xs font-bold text-white transition-opacity group-hover:opacity-90">
              🛒 Comprar na Shopee
            </span>
          </a>

          {/* Facebook */}
          <div className="group relative">
            <a
              href="https://www.facebook.com/keeusoficial/?locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1877F2]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div>
                <p className="font-bold text-foreground">Keeus no Facebook</p>
                <p className="mt-1 text-xs text-muted">Novidades e promoções</p>
              </div>
              <span className="mt-1 inline-block rounded-full bg-[#1877F2] px-4 py-1.5 text-xs font-bold text-white">
                🔵 Seguir página
              </span>
            </a>

            {/* QR Code hover balloon */}
            <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-44 -translate-x-1/2 flex-col items-center rounded-xl border border-border bg-white p-3 shadow-2xl transition-all group-hover:pointer-events-auto group-hover:flex">
              <p className="mb-2 text-center text-[10px] font-bold text-muted">
                Acesse pelo celular:
              </p>
              {/* QR Code gerado via API pública */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.facebook.com/keeusoficial&bgcolor=ffffff&color=1877F2&format=png"
                alt="QR Code Facebook Keeus"
                width={120}
                height={120}
                className="rounded-lg"
              />
              {/* Triangle pointer */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/5511999999999?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">WhatsApp Keeus</p>
              <p className="mt-1 text-xs text-muted">Atendimento Seg–Sex 9h–18h</p>
            </div>
            <span className="mt-1 inline-block rounded-full bg-[#25D366] px-4 py-1.5 text-xs font-bold text-white">
              💬 Falar agora
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
