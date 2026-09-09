import { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A Keeus vende slide e chinelo de dedo com foto real do modelo, tamanho em centímetros e frete cotado pelo CEP antes de você fechar o pedido.",
  alternates: { canonical: `${SITE.url}/sobre` },
  openGraph: {
    title: "Sobre a Keeus",
    description:
      "Como a Keeus vende chinelo: foto real do modelo, tamanho conferido em centímetros e frete pelo CEP antes de fechar.",
    url: `${SITE.url}/sobre`,
  },
};

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <nav className="breadcrumb mb-8" aria-label="Trilha de navegação">
        <Link href="/">Home</Link>
        <span>/</span>
        <span className="text-foreground">Sobre</span>
      </nav>

      {/* Abertura — a dor que todo mundo conhece */}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
        Sobre a Keeus
      </p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
        Chinelo se compra com o pé, não com a sorte.
      </h1>
      <p className="mt-6 text-lg leading-8 text-foreground-mid">
        Quem nunca escolheu um chinelo pela foto, acertou o tamanho na
        confiança e recebeu outra coisa em casa? Ou pagou o frete mais caro
        que o próprio chinelo, sem saber o prazo? A Keeus nasceu pra acabar
        com essa parte da compra online.
      </p>

      <div className="mt-10 space-y-6 text-base leading-8 text-foreground-mid">
        {/* A virada — o que a gente faz diferente */}
        <h2 className="font-display mt-12 text-2xl font-bold tracking-tight text-foreground">
          O que a gente faz diferente
        </h2>
        <p>
          Aqui, o anúncio mostra <strong className="text-foreground">o par real que você vai receber</strong> —
          nada de foto de banco de imagem ou de outro produto. Cada modelo tem
          a própria numeração, com guia de tamanho em centímetros, porque pé
          não se mede por achismo.
        </p>
        <p>
          E antes de fechar o pedido, você já sabe o que vem pela frente: o
          frete é calculado pelo CEP com prazo em dias úteis, o pagamento é
          com Pix ou cartão e as condições de troca estão escritas na página
          própria, sem letra miúda. O valor final aparece antes de você
          confirmar qualquer coisa.
        </p>

        {/* O que tem na coleção */}
        <h2 className="font-display mt-12 text-2xl font-bold tracking-tight text-foreground">
          O que você encontra aqui
        </h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong className="text-foreground">Slide de faixa larga</strong> — modelos
            Bahamas e Toledo, do dia a dia ao pós-banho.
          </li>
          <li>
            <strong className="text-foreground">Chinelo de dedo</strong> — modelos Malibu,
            para praia, piscina e dias quentes.
          </li>
          <li>
            <strong className="text-foreground">Numeração por modelo</strong>, do 34 ao 45,
            com guia de tamanho em cada página de produto.
          </li>
          <li>
            <strong className="text-foreground">Kits com dois pares</strong> — para viagem ou
            presente, com preço de kit.
          </li>
        </ul>

        {/* Fechamento — prova na prática */}
        <h2 className="font-display mt-12 text-2xl font-bold tracking-tight text-foreground">
          Na prática, é assim
        </h2>
        <p>
          Você escolhe o modelo, confere o tamanho no guia, calcula o frete
          pelo CEP e paga com Pix ou cartão. O pedido sai com o número do
          modelo e do tamanho que você escolheu. Se algo não servir, as trocas
          seguem o que está escrito na{" "}
          <Link href="/trocas" className="font-semibold text-accent underline underline-offset-2">
            política de trocas
          </Link>
          .
        </p>
        <p>
          Dúvida de tamanho, de prazo ou de pedido? O{" "}
          <Link href="/contato" className="font-semibold text-accent underline underline-offset-2">
            contato
          </Link>{" "}
          responde antes de você fechar a compra.
        </p>
      </div>
    </main>
  );
}
