import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Seus modelos Keeus salvos para comparar e comprar depois.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Favoritos | Keeus",
    description: "Lista de chinelos salvos na Keeus.",
    url: `${SITE.url}/favoritos`,
  },
};

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
