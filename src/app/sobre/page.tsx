import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sobre | ${SITE.name}`,
  description: "Conheça a história da Keeus Chuteiras, sua loja especializada em chuteiras de futebol.",
};

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Sobre a Keeus Chuteiras
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <p>
          A <strong>Keeus Chuteiras</strong> nasceu da paixão pelo futebol. Somos uma loja
          online 100% focada em chuteiras — porque acreditamos que cada jogador merece o
          equipamento certo para brilhar em campo, na quadra ou no society.
        </p>

        <p>
          Nossa história começou em 2023, quando um grupo de amigos jogadores de futebol
          amador percebeu como era difícil encontrar chuteiras originais com preço justo e
          variedade de tamanhos na internet. Decidimos criar um espaço onde o jogador
          encontra modelos das melhores marcas — Nike, Adidas, Puma, Mizuno, Umbro e Penalty
          — com a segurança de produto original e entrega garantida.
        </p>

        <p>
          Não somos uma loja de departamento que vende de tudo. Somos especialistas em
          chuteiras. Isso significa que conhecemos cada modelo, cada tecnologia e podemos
          ajudar você a escolher a chuteira ideal para o seu tipo de jogo, posição e
          superfície.
        </p>

        <h2 className="mt-10 font-display text-xl uppercase tracking-tight">
          Nossos compromissos
        </h2>

        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Produtos 100% originais</strong> — trabalhamos apenas com fabricantes oficiais, tudo com nota fiscal.</li>
          <li><strong>Preço justo</strong> — buscamos oferecer as melhores chuteiras com valores competitivos e parcelamento acessível.</li>
          <li><strong>Entrega rápida</strong> — enviamos para todo o Brasil com código de rastreio e prazo realista.</li>
          <li><strong>Atendimento humano</strong> — somos jogadores também. Se tiver dúvida, chama no WhatsApp que a gente responde.</li>
        </ul>

        <p className="mt-8">
          A Keeus Chuteiras é uma loja independente, tocada por gente que ama futebol.
          Obrigado por escolher a gente. Nos vemos em campo! ⚽
        </p>
      </div>
    </main>
  );
}
