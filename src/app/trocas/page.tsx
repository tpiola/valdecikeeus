import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Trocas e Devoluções | ${SITE.name}`,
  description: "Política de troca e devolução da Keeus Chuteiras. Saiba como trocar sua chuteira em até 30 dias.",
};

export default function TrocasPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Trocas e Devoluções
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <p>
          Queremos que você fique satisfeito com sua chuteira. Se por qualquer motivo o
          produto não atender suas expectativas, temos uma política de troca simples e
          transparente.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Prazo para troca</h2>
        <p>
          Você tem até <strong>30 dias corridos</strong> após o recebimento do produto para
          solicitar a troca. O produto deve estar em perfeito estado, sem sinais de uso, na
          caixa original com todos os acessórios.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Motivos aceitos</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Tamanho incorreto</strong> — a chuteira não serviu no seu pé.</li>
          <li><strong>Defeito de fabricação</strong> — qualquer problema de qualidade coberto pela garantia do fabricante.</li>
          <li><strong>Arrependimento</strong> — você mudou de ideia sobre o modelo ou cor.</li>
        </ul>

        <h2 className="font-display text-lg uppercase tracking-tight">Como solicitar a troca</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Entre em contato pelo WhatsApp <strong>(11) 99999-9999</strong> ou e-mail <strong>contato@keeus.com.br</strong> informando o número do pedido.</li>
          <li>Nossa equipe enviará um código de postagem reversa gratuito em até 24 horas.</li>
          <li>Leve o produto até uma agência dos Correios com a embalagem original.</li>
          <li>Após o recebimento e conferência, enviaremos o novo produto em até 5 dias úteis.</li>
        </ol>

        <h2 className="font-display text-lg uppercase tracking-tight">Reembolso</h2>
        <p>
          Caso prefira o reembolso, o valor será estornado em até 10 dias úteis após a
          devolução do produto. O estorno é feito na mesma forma de pagamento utilizada na
          compra.
        </p>

        <p className="mt-8 text-muted">
          Dúvidas? Fale com a gente no WhatsApp. Respondemos rapidinho. ⚽
        </p>
      </div>
    </main>
  );
}
