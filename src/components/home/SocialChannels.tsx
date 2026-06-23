"use client";

import Link from "next/link";

export default function SocialChannels() {
  return (
    <section className="border-y border-border bg-surface py-14 px-4 md:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
            Conecte-se
          </p>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-foreground md:text-3xl">
            Estude onde e quando quiser
          </h2>
          <p className="mt-2 text-sm text-muted">
            Cursos 100% online com certificado digital — acesso vitalício em todos os dispositivos.
          </p>
        </div>

        {/* Channels grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Web */}
          <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">Site Keeus</p>
              <p className="mt-1 text-xs text-muted">Acesso ilimitado · qualquer dispositivo</p>
            </div>
            <Link
              href="/cursos"
              className="mt-1 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
            >
              🎓 Explorar cursos
            </Link>
          </div>

          {/* Certificado */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10B981]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15l-2 5l-4-3l2-6H5l7-8l2 8h-4z"></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">Certificado Digital</p>
              <p className="mt-1 text-xs text-muted">Emitido ao concluir o curso</p>
            </div>
            <span className="mt-1 inline-block rounded-full bg-[#10B981] px-4 py-1.5 text-xs font-bold text-white">
              🏆 Reconhecido
            </span>
          </div>

          {/* Suporte */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-hover)] hover:-translate-y-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6366F1]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div>
              <p className="font-bold text-foreground">Suporte Direto</p>
              <p className="mt-1 text-xs text-muted">Tire dúvidas com o instrutor</p>
            </div>
            <span className="mt-1 inline-block rounded-full bg-[#6366F1] px-4 py-1.5 text-xs font-bold text-white">
              💬 Fale conosco
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
