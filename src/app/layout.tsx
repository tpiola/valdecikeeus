import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { SITE } from "@/lib/constants";
import { PRODUCTS } from "@/lib/products";

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
    default: "Keeus — Chinelos Premium",
    template: `%s | Keeus`,
  },
  description:
    "Keeus: loja oficial de chinelos premium. Modelos exclusivos com design esportivo e conforto superior. Frete grátis Brasil e garantia de 7 dias.",
  keywords: [
    "chinelos premium", "keeus chinelos", "chinelo slide",
    "chinelo esportivo", "chinelo conforto", "chinelo masculino",
    "chinelo frete grátis", "chinelo EVA", "chinelo memory foam",
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
    title: "Keeus — Chinelos Premium",
    description: "Chinelos premium com design esportivo e conforto superior. Frete grátis Brasil.",
    url: SITE.url,
    siteName: "Keeus",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Keeus Chinelos Premium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keeus — Chinelos Premium",
    description: "Chinelos premium. Do vestiário para a rua.",
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
    alternateName: "Keeus Chinelos Premium",
    url: SITE.url,
    logo: `${SITE.url}/assets/real/logo.png`,
    description:
      "Keeus: loja oficial de chinelos premium. Modelos exclusivos com design esportivo e conforto superior.",
    sameAs: [
      "https://instagram.com/keeus",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+55-11-99999-9999",
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
    },
  };

  const productCatalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo Keeus — Chinelos Premium",
    url: `${SITE.url}/colecao`,
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.slice(0, 12).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        description: p.description,
        image: `${SITE.url}${p.image}`,
        offers: {
          "@type": "Offer",
          price: p.price.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/produto/${p.slug}`,
        },
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Coleção",
        item: `${SITE.url}/colecao`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contato",
        item: `${SITE.url}/contato`,
      },
    ],
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
        <Script
          id="schema-product-catalog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productCatalogJsonLd) }}
        />
        <Script
          id="schema-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
