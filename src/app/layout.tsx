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
    default: "Keeus Chuteiras — Loja Oficial de Chuteiras Premium",
    template: `%s | Keeus Chuteiras`,
  },
  description:
    "Keeus Chuteiras: loja oficial de chuteiras premium para campo, society e futsal. Modelos exclusivos, frete grátis Brasil e garantia de 7 dias.",
  keywords: [
    "chuteiras premium", "chuteiras campo", "chuteiras society", "chuteiras futsal",
    "loja de chuteiras", "keeus", "chuteiras frete grátis",
    "chuteiras profissional", "chuteira nike", "chuteira adidas",
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
  themeColor: "#00FF41",
  openGraph: {
    title: "Keeus Chuteiras — Loja Oficial de Chuteiras Premium",
    description: "Domine o campo com estilo. Chuteiras premium para campo, society e futsal. Frete grátis Brasil.",
    url: SITE.url,
    siteName: "Keeus Chuteiras",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Keeus Chuteiras Premium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keeus Chuteiras — Loja Oficial de Chuteiras Premium",
    description: "Domine o campo com estilo. Chuteiras premium para futebol.",
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
    name: "Keeus Chuteiras",
    alternateName: "Keeus Loja de Chuteiras Premium",
    url: SITE.url,
    logo: `${SITE.url}/assets/real/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  const scrollObserverScript = `
    (function() {
      // Scroll progress bar
      var bar = document.querySelector('.progress-bar');
      if (bar) {
        window.addEventListener('scroll', function() {
          var docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
          bar.style.width = pct + '%';
        }, { passive: true });
      }

      // IntersectionObserver for reveal animations
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-fade, .reveal-scale').forEach(function(el) {
        observer.observe(el);
      });
    })();
  `;

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#00FF41" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Scroll progress bar */}
        <div className="progress-bar" style={{ width: "0%" }} />

        <Script
          id="scroll-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: scrollObserverScript }}
        />
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
