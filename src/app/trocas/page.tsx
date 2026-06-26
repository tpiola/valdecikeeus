import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Trocas e Devoluções | ${SITE.name}`,
  description: "Política de troca e devolução da Keeus. Troque seu chinelo em até 30 dias. Primeira troca grátis.",
  openGraph: {
    title: "Trocas e Devoluções | Keeus",
    description: "Troque seu chinelo Keeus em até 30 dias.",
  },
};

export default function TrocasPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <nav className="breadcrumb mb-8">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">Trocas e Devoluções</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Trocas e Devoluções
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground-mid">
        <div className="rounded-2xl bg-surface border border-border p-6">
          <p>
            Queremos que você fique 100% satisfeito com seu chinelo Keeus. Se por qualquer motivo o produto 
            não atender suas expectativas, temos uma política de troca simples, transparente e sem burocracia.
          </p>
        </div>

        <h2 className="font-display text-lg font-bold text-foreground">Prazo para troca</h2>
        <p>
          Você tem até <strong className="text-foreground">30 dias corridos</strong> após o recebimento do produto para 
          solicitar a troca. O produto deve estar em perfeito estado, sem sinais de uso, 
          na embalagem original com todos os acessórios.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">Motivos aceitos</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong className="text-foreground">Tamanho incorreto</strong> — o chinelo não serviu no seu pé.</li>
          <li><strong className="text-foreground">Defeito de fabricação</strong> — qualquer problema de qualidade coberto pela garantia.</li>
          <li><strong className="text-foreground">Arrependimento</strong> — você mudou de ideia sobre o modelo ou cor.</li>
          <li><strong className="text-foreground">Produto diferente do pedido</strong> — recebeu um modelo ou cor errada.</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-foreground">Como solicitar a troca</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>Entre em contato pelo <strong className="text-foreground">WhatsApp (11) 99999-9999</strong> ou e-mail <strong className="text-foreground">contato@keeus.com.br</strong> informando o número do pedido.</li>
          <li>Nossa equipe enviará um <strong className="text-foreground">código de postagem reversa gratuito</strong> em até 24 horas.</li>
          <li>Leve o produto até uma agência dos Correios com a embalagem original.</li>
          <li>Após o recebimento e conferência, enviaremos o novo produto em até <strong className="text-foreground">5 dias úteis</strong>.</li>
        </ol>

        <h2 className="font-display text-lg font-bold text-foreground">Reembolso</h2>
        <p>
          Caso prefira o reembolso, o valor será estornado em até <strong className="text-foreground">10 dias úteis</strong> após a 
          devolução do produto. O estorno é feito na mesma forma de pagamento utilizada na compra.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">Garantia</h2>
        <p>
          Todos os chinelos Keeus possuem <strong className="text-foreground">garantia de 90 dias</strong> contra defeitos de 
          fabricação. Guarde a nota fiscal para acionar a garantia quando necessário.
        </p>

        <div className="mt-10 rounded-2xl bg-accent-light border border-accent/20 p-6 text-center">
          <p className="font-bold text-foreground">Dúvidas sobre trocas?</p>
          <p className="mt-1 text-sm text-foreground-mid">
            Fale com a gente no WhatsApp — respondemos rapidinho. 🧡
          </p>
        </div>
      </div>
    </main>
  );
}
