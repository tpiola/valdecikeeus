"use client";

import { useEffect, useRef } from "react";

// Tipos para o web component model-viewer do Google
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          "ios-src"?: string;
          alt?: string;
          ar?: boolean | string;
          "ar-modes"?: string;
          "camera-controls"?: boolean | string;
          poster?: string;
          "shadow-intensity"?: string;
          "auto-rotate"?: boolean | string;
          style?: React.CSSProperties;
          "environment-image"?: string;
          exposure?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface ModelViewer3DProps {
  slug: string;
  productName: string;
  posterImage?: string;
}

export default function ModelViewer3D({
  slug,
  productName,
  posterImage,
}: ModelViewer3DProps) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    // Carrega o script do Google model-viewer dinamicamente
    const script = document.createElement("script");
    script.type = "module";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js";
    document.head.appendChild(script);
  }, []);

  const modelSrc = `/assets/models/${slug}.glb`;
  const iosSrc = `/assets/models/${slug}.usdz`;
  const poster = posterImage || `/assets/real/produtos/${slug}/2k/1.png`;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-light">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5F00" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-foreground">
            Visualização 3D
          </span>
        </div>
        <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-black uppercase text-white">
          Powered by Google
        </span>
      </div>

      {/* model-viewer */}
      <div className="relative" style={{ height: 400 }}>
        {/* @ts-expect-error - custom web component */}
        <model-viewer
          src={modelSrc}
          ios-src={iosSrc}
          alt={`Visualização 3D - ${productName}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          poster={poster}
          shadow-intensity="1.2"
          auto-rotate
          exposure="0.9"
          environment-image="neutral"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F8F9FA",
          }}
        >
          {/* AR Button — estilo Google */}
          <button
            slot="ar-button"
            style={{
              background: "#FF5F00",
              color: "white",
              borderRadius: 8,
              border: "none",
              position: "absolute",
              bottom: 16,
              right: 16,
              padding: "10px 18px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 4px 16px rgba(255,95,0,0.35)",
            }}
          >
            👋 Ver no seu Espaço (RA)
          </button>

          {/* Placeholder quando modelo não existe ainda */}
          <div slot="poster" className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={poster}
              alt={productName}
              className="h-60 w-60 object-contain"
            />
            <p className="text-xs text-muted">Carregando modelo 3D…</p>
          </div>
          {/* @ts-expect-error - custom web component */}
        </model-viewer>
      </div>

      {/* Info footer */}
      <div className="border-t border-border bg-surface px-4 py-3">
        <p className="text-center text-[11px] text-muted">
          🖱️ Arraste para girar · 📱 Suporte a Realidade Aumentada no iPhone e Android
        </p>
      </div>
    </div>
  );
}
