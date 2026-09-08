import { Metadata } from "next";
import { SITE, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description: "Tamanhos, frete pelo CEP, Pix/cartão, trocas e cuidados — respostas diretas Keeus.",
  alternates: { canonical: SITE.url + "/faq" },
  openGraph: {
    title: "Perguntas frequentes | Keeus",
    description: "Respostas sobre tamanhos, frete, pagamento e trocas Keeus.",
    url: SITE.url + "/faq",
  },
};

function slugify(q: string) {
  return q
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}

export default function FaqPage() {
  const faqUrl = SITE.url + "/faq";
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "FAQ", item: faqUrl },
    ],
  };
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav className="breadcrumb mb-8" aria-label="Trilha">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">FAQ</span>
      </nav>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Perguntas frequentes</h1>
      <p className="mt-2 text-sm text-foreground-mid">Respostas curtas e citáveis.</p>
      <div className="mt-8 space-y-4">
        {FAQ_ITEMS.map((faq) => {
          const id = slugify(faq.question);
          return (
            <details key={id} id={id} className="group rounded-2xl border border-border bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold">
                <span>{faq.question}</span>
                <span className="text-muted group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <div className="border-t border-border px-6 pb-5 pt-4 text-sm leading-relaxed text-foreground-mid">
                <p>{faq.answer}</p>
              </div>
            </details>
          );
        })}
      </div>
      <p className="mt-10 text-center text-sm text-muted">
        Dúvidas? <a href="/contato" className="font-semibold text-[var(--accent)] underline">Contato</a>
      </p>
    </main>
  );
}
