import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Finalize sua compra Keeus: frete pelo CEP, Pix ou cartão — sem boleto.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Checkout | Keeus",
    description: "Frete cotado + Pix ou cartão.",
    url: `${SITE.url}/checkout`,
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
