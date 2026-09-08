import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { COMPANY, SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Keeus — Slide e Chinelo de Dedo | Loja Oficial",
    template: `%s | Keeus`,
  },
  description:
    "Slide e chinelo de dedo Keeus. Foto real de cada modelo e tabela de tamanho (conforme o modelo) para escolher antes de comprar.",
  keywords: [
    "chinelos Keeus",
    "chinelo slide",
    "chinelo de dedo",
    "flip flop",
    "chinelo verão",
    "chinelo EVA",
    "kit chinelo",
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
    title: "Keeus — Slide e Chinelo de Dedo | Loja Oficial",
    description: "Slides e chinelos Keeus com fotos reais, frete pelo CEP e Pix ou cartão.",
    url: SITE.url,
    siteName: "Keeus",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Keeus Chinelos Premium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keeus — Slide e Chinelo de Dedo | Loja Oficial",
    description: "Slide e chinelo de dedo Keeus, com foto real e escolha de tamanho antes de comprar.",
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
    name: COMPANY.legalName || "Keeus",
    alternateName: "Keeus Chinelos",
    url: SITE.url,
    logo: `${SITE.url}/assets/real/logo.png`,
    email: COMPANY.email || undefined,
    description:
      "Keeus — slides e chinelos de dedo com fotos reais, frete cotado pelo CEP e pagamento via Pix ou cartão.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
    ...(COMPANY.cnpj
      ? { taxID: COMPANY.cnpj, identifier: COMPANY.cnpj }
      : {}),
  };



  const scrollObserverScript = `
    (function() {
      var bar = document.querySelector('.progress-bar');
      if (bar) {
        window.addEventListener('scroll', function() {
          var docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
          bar.style.width = pct + '%';
        }, { passive: true });
      }

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
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <meta name="theme-color" content="#FF5F1F" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-full focus:bg-[#FF5F1F] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Ir para o conteúdo
        </a>
        <div className="progress-bar" style={{ width: "0%" }} aria-hidden="true" />

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
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Keeus",
              alternateName: "Keeus Chinelos",
              url: SITE.url,
              description:
                "Catálogo Keeus de slides e chinelos de dedo com fotos reais e informações de produto.",
              inLanguage: "pt-BR",
              potentialAction: {
                "@type": "SearchAction",
                target: SITE.url + "/colecao?busca={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <Header />
        <main className="flex-1" id="conteudo">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
