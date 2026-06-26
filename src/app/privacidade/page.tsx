import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE.name}`,
  description: "Saiba como a Keeus coleta, usa e protege seus dados pessoais. Em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <nav className="breadcrumb mb-8">
        <a href="/">Home</a>
        <span>/</span>
        <span className="text-foreground">Política de Privacidade</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        Política de Privacidade
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground-mid">
        <div className="rounded-2xl bg-surface border border-border p-6">
          <p>
            A <strong className="text-foreground">Keeus Chinelos Premium</strong> leva a sério a privacidade 
            dos seus dados. Esta política explica como coletamos, usamos e protegemos suas informações pessoais, 
            em conformidade com a Lei Geral de Proteção de Dados (LGPD).
          </p>
        </div>

        <h2 className="font-display text-lg font-bold text-foreground">1. Dados que coletamos</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Nome completo e CPF (para emissão de nota fiscal)</li>
          <li>Endereço de entrega</li>
          <li>E-mail e telefone de contato</li>
          <li>Dados de pagamento (processados exclusivamente por gateways terceiros seguros)</li>
          <li>Dados de navegação (cookies essenciais para funcionamento do site)</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-foreground">2. Como usamos seus dados</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Processar e entregar seu pedido</li>
          <li>Emitir nota fiscal</li>
          <li>Enviar atualizações sobre o status do pedido</li>
          <li>Comunicar ofertas e lançamentos (apenas com seu consentimento explícito)</li>
          <li>Melhorar sua experiência de navegação no site</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-foreground">3. Compartilhamento</h2>
        <p>
          Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing. 
          Compartilhamos apenas o necessário com:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Transportadoras — para entrega do seu pedido</li>
          <li>Gateways de pagamento — para processamento seguro da transação</li>
          <li>Plataforma de e-mail — para envio de comunicações autorizadas</li>
        </ul>

        <h2 className="font-display text-lg font-bold text-foreground">4. Seus direitos (LGPD)</h2>
        <p>
          Você pode solicitar a qualquer momento:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Acesso aos seus dados</li>
          <li>Correção de informações incompletas ou desatualizadas</li>
          <li>Exclusão dos seus dados pessoais</li>
          <li>Revogação de consentimento para comunicações de marketing</li>
          <li>Portabilidade dos seus dados</li>
        </ul>
        <p>
          Envie sua solicitação para <strong className="text-foreground">privacidade@keeus.com.br</strong>.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">5. Cookies</h2>
        <p>
          Utilizamos cookies essenciais para o funcionamento do site (carrinho de compras, autenticação) 
          e cookies de análise para melhorar sua experiência. Você pode gerenciar suas preferências 
          de cookies a qualquer momento pelo banner no site.
        </p>

        <h2 className="font-display text-lg font-bold text-foreground">6. Segurança</h2>
        <p>
          Seu pagamento é processado com criptografia SSL de 256 bits. Todos os dados são armazenados 
          em servidores seguros com acesso restrito. Implementamos medidas técnicas e organizacionais 
          para proteger suas informações contra acessos não autorizados.
        </p>

        <p className="mt-8 text-muted">
          Última atualização: junho de 2026.
        </p>
      </div>
    </main>
  );
}
