import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Termos de Uso | ${SITE.name}`,
  description: "Termos e condições de uso da loja Keeus Chuteiras.",
};

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Termos de Uso
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <p>
          Ao acessar e utilizar o site <strong>Keeus Chuteiras</strong>, você concorda com
          os termos e condições descritos abaixo. Leia atentamente antes de realizar qualquer
          compra.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Uso do site</h2>
        <p>
          O site é destinado a maiores de 18 anos ou menores acompanhados por responsável
          legal. Você se compromete a fornecer informações verdadeiras e precisas ao realizar
          seu cadastro e compra.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Produtos e preços</h2>
        <p>
          Todos os preços são exibidos em reais (BRL) e podem ser alterados sem aviso
          prévio. As imagens dos produtos são ilustrativas — pequenas variações de cor podem
          ocorrer dependendo da tela do seu dispositivo. As especificações técnicas de cada
          chuteira são fornecidas pelo fabricante.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Pagamento e entrega</h2>
        <p>
          O pedido é processado após confirmação do pagamento. Os prazos de entrega são
          estimados e podem variar conforme a região e a disponibilidade dos Correios ou
          transportadora. O código de rastreamento é enviado por e-mail após a postagem.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Propriedade intelectual</h2>
        <p>
          Todo o conteúdo do site — textos, imagens, logotipo e layout — é de propriedade da
          Keeus Chuteiras. As marcas Nike, Adidas, Puma, Mizuno, Umbro e Penalty são
          propriedade de seus respectivos titulares e são exibidas apenas para identificação
          dos produtos.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Limitação de responsabilidade</h2>
        <p>
          A Keeus Chuteiras não se responsabiliza por danos indiretos decorrentes do uso do
          site ou dos produtos adquiridos. Nossa responsabilidade limita-se ao valor do
          produto adquirido.
        </p>

        <p className="mt-8 text-muted">
          Última atualização: junho de 2026.
        </p>
      </div>
    </main>
  );
}
