import Link from "next/link";
import { CreditCard, QrCode, Ruler, Camera } from "lucide-react";

const ITEMS = [
  {
    icon: QrCode,
    label: "Pix",
    detail: "Aprovação na hora",
  },
  {
    icon: CreditCard,
    label: "Cartão",
    detail: "Via Mercado Pago",
  },
  {
    icon: Ruler,
    label: "Tamanho por modelo",
    detail: "Guia em cm em cada produto",
  },
  {
    icon: Camera,
    label: "Foto real",
    detail: "O par que você vê é o que chega",
  },
] as const;

/** Faixa de confiança — só afirmações alinhadas às políticas da loja. */
export default function TrustStrip({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-4 ${className}`}
      aria-label="Informações de confiança"
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="flex items-start gap-3">
            <Icon
              size={18}
              className={`mt-0.5 shrink-0 ${dark ? "text-[#ff8a55]" : "text-[#FF5F1F]"}`}
            />
            <div>
              <p className={`text-sm font-semibold ${dark ? "text-white" : "text-stone-900"}`}>
                {item.label}
              </p>
              <p className={`mt-0.5 text-xs leading-4 ${dark ? "text-white/55" : "text-stone-500"}`}>
                {item.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
