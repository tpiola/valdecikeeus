import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sobre | ${SITE.name}`,
  description: "Conheça a história da Keeus — chinelos premium com design exclusivo, conforto superior e o espírito do verão brasileiro.",
  openGraph: {
    title: "Sobre a Keeus — Nossa História",
    description: "Chinelos premium com design exclusivo e espírito de verão.",
  },
};

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      {/* Breadcrumb */}
      <nav className="breadcrumb mb-8">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">Sobre</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Nossa História
      </h1>
      <p className="mt-2 text-accent font-semibold">Keeus — O Verão Começa Aqui</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground-mid">
        <p>
          A <strong className="text-foreground">Keeus</strong> nasceu de um sentimento simples e poderoso: o amor pelo verão brasileiro. 
          Somos uma marca de chinelos premium que acredita que cada passo deve ser leve, confortável e cheio de estilo — 
          da areia da praia ao rooftop no fim de tarde.
        </p>

        <p>
          Nossa história começou em 2023, quando percebemos que o mercado de chinelos tratava o produto como 
          algo descartável. A gente via diferente — o chinelo é o calçado mais democrático do Brasil, 
          e merecia o mesmo cuidado e qualidade de um tênis premium.
        </p>

        <p>
          Investimos em materiais de alta performance: EVA de densidade premium, TPU flexível e resistente, 
          tecnologia memory foam em 3 camadas. Cada Keeus é projetado para durar, sem perder o conforto 
          e o estilo — temporada após temporada.
        </p>

        <h2 className="font-display text-xl font-bold text-foreground mt-10">Nossos Pilares</h2>

        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-foreground">Conforto Premium</strong> — Palmilhas anatômicas, 
            solados amortecidos e materiais que abraçam seus pés como ninguém.
          </li>
          <li>
            <strong className="text-foreground">Design Exclusivo</strong> — Cada coleção é pensada 
            nos mínimos detalhes. Cores vibrantes, acabamento impecável e a icônica identidade laranja que 
            todo mundo reconhece.
          </li>
          <li>
            <strong className="text-foreground">Sustentabilidade</strong> — Materiais recicláveis, 
            processos de baixo impacto ambiental e embalagem ecológica. Cuidamos do planeta enquanto 
            cuidamos de você.
          </li>
          <li>
            <strong className="text-foreground">Atendimento Humano</strong> — Somos gente que ama 
            o que faz. Tem dúvida? Chama no WhatsApp. Resposta rápida, sem robô.
          </li>
        </ul>

        <h2 className="font-display text-xl font-bold text-foreground mt-10">O time Keeus</h2>
        <p>
          Somos uma equipe pequena, apaixonada e 100% focada em criar os melhores chinelos do Brasil. 
          Do design à entrega, cada etapa é pensada para você ter a melhor experiência — do primeiro 
          clique ao último passo.
        </p>

        <div className="mt-10 rounded-2xl bg-surface border border-border p-8 text-center">
          <p className="text-lg font-bold text-foreground">
            Obrigado por escolher a Keeus.
          </p>
          <p className="mt-2 text-foreground-mid">
            O verão começa aqui — e a gente vai junto com você. 🧡
          </p>
        </div>
      </div>
    </main>
  );
}
