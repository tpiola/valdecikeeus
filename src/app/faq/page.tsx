import { Metadata } from "next";
import { SITE, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Perguntas Frequentes | ${SITE.name}`,
  description: "Tire suas dúvidas sobre chinelos Keeus: tamanhos, entrega, troca, pagamento, cuidados e muito mais.",
  openGraph: {
    title: "FAQ — Perguntas Frequentes | Keeus",
    description: "Tudo sobre chinelos Keeus: tamanhos, pagamento, entrega e trocas.",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <nav className="breadcrumb mb-8">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">FAQ</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Perguntas Frequentes
      </h1>
      <p className="mt-2 text-foreground-mid">
        Tudo que você precisa saber sobre chinelos Keeus.
      </p>

      <div className="mt-8 space-y-4">
        {FAQ_ITEMS.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-2xl border border-border bg-white transition-all hover:border-accent/30"
          >
            <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-semibold text-foreground list-none">
              <span>{faq.question}</span>
              <span className="ml-4 text-muted text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="px-6 pb-5 text-sm leading-relaxed text-foreground-mid border-t border-border pt-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-accent-light border border-accent/20 p-6 text-center">
        <p className="font-bold text-foreground">Não encontrou sua dúvida?</p>
        <p className="mt-1 text-sm text-foreground-mid">
          Fale com a gente no{" "}
          <a href="https://wa.me/5511999999999" className="text-accent font-semibold hover:underline">
            WhatsApp
          </a>{" "}
          — respondemos rapidinho!
        </p>
      </div>
    </main>
  );
}
