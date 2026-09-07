import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sobre | ${SITE.name}`,
  description:
    "Como a Keeus vende chinelo: modelos com foto real, tamanho pra conferir antes de comprar e atendimento direto pra tirar dúvida.",
  openGraph: {
    title: "Sobre a Keeus",
    description: "A Keeus vende chinelo do jeito que loja de verdade vende: com foto real, tamanho certo e atendimento direto.",
  },
};

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <nav className="breadcrumb mb-8" aria-label="Trilha de navegação">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">Sobre</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Sobre a Keeus
      </h1>
      <p className="mt-3 text-base leading-7 text-foreground-mid">
        A Keeus vende slide e chinelo de dedo. Parece simples, e é — a gente
        acha que comprar chinelo online não devia ser loteria.
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground-mid">
        <p>
          Por isso, cada modelo desta loja tem <strong className="text-foreground">foto real do produto</strong>,
          numeração do 34 ao 45 e uma tabela de tamanho com medida em
          centímetros. Você confere o que vai receber antes de fechar o pedido.
        </p>

        <p>
          A sacola é montada no atendimento: a gente confirma o modelo, o
          número, o prazo e a forma de pagamento com você antes de qualquer
          cobrança. Se algo não servir, as condições de troca estão escritas na
          página de trocas — sem letra miúda.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-foreground">
          O que você encontra aqui
        </h2>

        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-foreground">Slide de faixa larga</strong>{" "}
            — modelos Bahamas e Toledo, pro dia a dia e pós-banho.
          </li>
          <li>
            <strong className="text-foreground">Chinelo de dedo</strong> —
            modelos Malibu, pra praia, piscina e dia quente.
          </li>
          <li>
            <strong className="text-foreground">Numeração do 34 ao 45</strong>{" "}
            — com guia de tamanho em cada página de produto.
          </li>
          <li>
            <strong className="text-foreground">Atendimento direto</strong> —
            dúvida de número, de pedido ou de troca, é só chamar pelo WhatsApp.
          </li>
        </ul>

        <h2 className="font-display mt-10 text-xl font-bold text-foreground">
          Dúvida antes de comprar?
        </h2>
        <p>
          A página de perguntas frequentes cobre tamanho, pagamento, entrega,
          troca e limpeza. Se a sua dúvida não estiver lá, o{" "}
          <a href="/contato" className="font-semibold text-accent underline underline-offset-2">
            contato
          </a>{" "}
          responde — sem robô, sem enrolação.
        </p>
      </div>
    </main>
  );
}
