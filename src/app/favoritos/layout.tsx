import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Seus modelos Keeus salvos para comparar e comprar depois.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Favoritos | Keeus",
    description: "Lista de chinelos salvos na Keeus.",
  },
};

export default function FavoritosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
