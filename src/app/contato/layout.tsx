import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Keeus: pedidos, trocas, dúvidas de tamanho e atendimento.",
  alternates: { canonical: `${SITE.url}/contato` },
  openGraph: {
    title: "Contato | Keeus",
    description: "Atendimento Keeus para pedidos e trocas.",
    url: `${SITE.url}/contato`,
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
