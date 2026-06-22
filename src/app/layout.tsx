import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieBanner from "@/components/ui/CookieBanner";
import { SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Keeus — Chinelos e Sandálias Premium | Entrega Rápida",
    template: `%s | Keeus`,
  },
  description:
    "Keeus Store: chinelos tratorados, sandálias e slides premium com design exclusivo. Linha Bahamas, Toledo e Malibú. Entrega rápida para todo o Brasil. Parcele em 3x sem juros.",
  keywords: [
    "chinelo", "sandália", "slide", "keeus", "bahamas", "toledo", "malibú",
    "chinelo tratorado", "sandália masculina", "sandália feminina", "calçado premium",
  ],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon-32x32.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Keeus — Chinelos Premium",
    description: "Chinelos e sandálias premium com design exclusivo. Linha Bahamas, Toledo e Malibú.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Keeus Store" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keeus — Chinelos Premium",
    description: "Design, conforto e atitude em cada par.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Valdecikeeus Comércio de Calçados Ltda",
    alternateName: "Keeus Store",
    url: SITE.url,
    logo: `${SITE.url}/assets/real/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-99999-9999",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    sameAs: [SITE.instagram, SITE.facebook, "https://shopee.com.br/keeusstore"],
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
