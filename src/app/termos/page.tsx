import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Termos de Uso | ${SITE.name}`,
  description: "Termos e condições de uso da loja Keeus Chinelos Premium. Leia antes de realizar sua compra.",
};

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <nav className="breadcrumb mb-8">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">Termos de Uso</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Termos de Uso
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground-mid">
        <div className="rounded-2xl bg-surface border border-border p-6">
          <p>
            Ao acessar e utilizar o site <strong className="text-foreground">Keeus Chinelos Premium</strong>, 
            você concorda com os termos e condições descritos abaixo. Leia atentamente antes de realizar qualquer compra.
          </p>
        </div>

        <h2 className="font-display text-lg font-bold text-foreground">1. Uso do site</h2>
        <p>
          O site é destinado a maiores de 18 anos ou menores acompanhados por responsável legal. 
          Você se compromete a fornecer informações verdadeiras e precisas ao realizar seu cadastro e compra.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">2. Produtos e preços</h2>
        <p>
          Todos os preços são exibidos em reais (BRL) e podem ser alterados sem aviso prévio. 
          As imagens dos produtos são ilustrativas — pequenas variações de cor podem ocorrer dependendo da tela do seu dispositivo. 
          As especificações técnicas de cada chinelo são detalhadas na página do produto.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">3. Pagamento e entrega</h2>
        <p>
          O pedido é processado após confirmação do pagamento. Os prazos de entrega são estimados e podem variar 
          conforme a região e a disponibilidade dos Correios ou transportadora. O código de rastreamento é enviado 
          por e-mail após a postagem.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">4. Propriedade intelectual</h2>
        <p>
          Todo o conteúdo do site — textos, imagens, logotipo e layout — é de propriedade da Keeus Chinelos Premium. 
          É proibida a reprodução total ou parcial sem autorização expressa.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">5. Limitação de responsabilidade</h2>
        <p>
          A Keeus não se responsabiliza por danos indiretos decorrentes do uso do site ou dos produtos adquiridos. 
          Nossa responsabilidade limita-se ao valor do produto adquirido.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">6. Alterações nos termos</h2>
        <p>
          Reservamo-nos o direito de alterar estes termos a qualquer momento. As alterações entram em vigor 
          imediatamente após sua publicação no site.
        </p>

        <p className="mt-8 text-muted">
          Última atualização: junho de 2026.
        </p>
      </div>
    </main>
  );
}
