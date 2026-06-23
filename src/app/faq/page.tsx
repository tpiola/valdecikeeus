import { Metadata } from "next";
import { SITE, FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Perguntas Frequentes | ${SITE.name}`,
  description: "Tire suas dúvidas sobre chuteiras, entrega, troca e pagamento na Keeus Chuteiras.",
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Perguntas Frequentes
      </h1>
      <p className="mt-3 text-sm text-muted">
        Tudo que você precisa saber sobre comprar chuteira na Keeus.
      </p>

      <div className="mt-8 space-y-6">
        {FAQ_ITEMS.map((faq) => (
          <div
            key={faq.question}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <h2 className="font-bold text-foreground">{faq.question}</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
