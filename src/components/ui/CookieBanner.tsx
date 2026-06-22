"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("keeus_cookies_accepted");
    if (!accepted) {
      // Pequeno delay para não aparecer imediatamente no carregamento
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("keeus_cookies_accepted", "true");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("keeus_cookies_accepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="lgpd-cookie-banner"
      role="dialog"
      aria-label="Aviso de cookies e privacidade"
      className="fixed bottom-0 left-0 right-0 z-[999] border-t-4 border-accent bg-[#111111] shadow-2xl"
      style={{ animation: "fadeUp 0.4s ease-out" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-5 py-5 md:flex-row md:items-center md:px-8">
        {/* Text */}
        <div className="flex-1">
          <p className="mb-1 text-sm font-bold text-white">
            🍪 Cookies e Privacidade
          </p>
          <p className="text-xs leading-relaxed text-gray-400">
            Utilizamos cookies para personalizar sua experiência, melhorar nossos serviços e exibir anúncios
            relevantes. Ao continuar navegando, você concorda com nossa{" "}
            <Link
              href="/privacidade"
              className="font-semibold text-accent underline underline-offset-2 hover:text-white"
            >
              Política de Privacidade
            </Link>{" "}
            e com os{" "}
            <Link
              href="/termos"
              className="font-semibold text-accent underline underline-offset-2 hover:text-white"
            >
              Termos de Uso
            </Link>{" "}
            da{" "}
            <span className="font-bold text-accent">Keeus</span>.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-shrink-0 gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-white/20 px-5 py-2.5 text-xs font-semibold text-gray-400 transition-colors hover:border-white/40 hover:text-white"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-accent px-6 py-2.5 text-xs font-bold text-white transition-colors hover:bg-accent-hover"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
