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
    default: "Keeus — Chuteiras e Chinelos Premium",
    template: `%s | Keeus`,
  },
  description:
    "Keeus: loja oficial de chuteiras e chinelos premium. Modelos exclusivos para campo, society, futsal e lifestyle. Frete grátis Brasil e garantia de 7 dias.",
  keywords: [
    "chuteiras premium", "chinelos premium", "chuteiras campo", "chuteiras society", "chuteiras futsal",
    "keeus chinelos", "keeus chuteiras", "loja de chuteiras", "chinelo slide",
    "chinelo esportivo", "chuteiras frete grátis",
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
    title: "Keeus — Chuteiras e Chinelos Premium",
    description: "Chuteiras e chinelos premium para campo, society, futsal e lifestyle. Frete grátis Brasil.",
    url: SITE.url,
    siteName: "Keeus",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Keeus Chuteiras e Chinelos Premium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keeus — Chuteiras e Chinelos Premium",
    description: "Chuteiras e chinelos premium. Do campo ao rolê.",
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
    name: "Keeus",
    alternateName: "Keeus Chuteiras e Chinelos Premium",
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
