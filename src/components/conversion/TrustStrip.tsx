import Link from "next/link";
import { CreditCard, QrCode, RotateCcw, Ruler } from "lucide-react";

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
    label: "Tamanho primeiro",
    detail: "Guia em cm em cada produto",
  },
  {
    icon: RotateCcw,
    label: "Trocas",
    detail: "Regras claras antes de fechar",
    href: "/trocas",
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
        const body = (
          <div className="flex items-start gap-3">
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
        if ("href" in item && item.href) {
          return (
            <Link key={item.label} href={item.href} className="block transition hover:opacity-90">
              {body}
            </Link>
          );
        }
        return <div key={item.label}>{body}</div>;
      })}
    </div>
  );
}
