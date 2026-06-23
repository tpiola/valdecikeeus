import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE.name}`,
  description: "Saiba como a Keeus Chuteiras coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Política de Privacidade
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <p>
          A <strong>Keeus Chuteiras</strong> leva a sério a privacidade dos seus dados.
          Esta política explica como coletamos, usamos e protegemos suas informações
          pessoais.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Dados que coletamos</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Nome completo e CPF (para emissão de nota fiscal)</li>
          <li>Endereço de entrega</li>
          <li>E-mail e telefone de contato</li>
          <li>Dados de pagamento (processados exclusivamente por gateways terceiros seguros)</li>
        </ul>

        <h2 className="font-display text-lg uppercase tracking-tight">Como usamos seus dados</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Processar e entregar seu pedido</li>
          <li>Emitir nota fiscal</li>
          <li>Enviar atualizações sobre o status do pedido</li>
          <li>Comunicar ofertas e lançamentos (apenas com seu consentimento)</li>
        </ul>

        <h2 className="font-display text-lg uppercase tracking-tight">Compartilhamento</h2>
        <p>
          Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para
          fins de marketing. Compartilhamos apenas o necessário com transportadoras para
          entrega e gateways de pagamento para processamento da transação.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">Seus direitos (LGPD)</h2>
        <p>
          Você pode solicitar a qualquer momento: acesso aos seus dados, correção de
          informações incompletas, exclusão dos seus dados pessoais e revogação de
          consentimento para comunicações de marketing. Envie sua solicitação para{" "}
          <strong>contato@keeus.com.br</strong>.
        </p>

        <p className="mt-8 text-muted">
          Última atualização: junho de 2026.
        </p>
      </div>
    </main>
  );
}
