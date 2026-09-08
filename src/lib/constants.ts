export const SITE = {
  name: "Keeus",
  tagline: "Slide e Chinelo de Dedo",
  description:
    "Keeus — slides e chinelos de dedo com design contemporâneo, fotos reais e informações claras para escolher seu modelo.",
  url: "https://valdecikeeus.vercel.app",
};

/** Dados institucionais — só o que for real. CNPJ fica vazio até a loja informar. */
export const COMPANY = {
  legalName: "Keeus",
  /** Preencha com CNPJ real quando disponível; string vazia = não exibir. */
  cnpj: "",
  email: "contato@keeus.com.br",
  city: "Brasil",
  policiesNote:
    "Razão social e CNPJ constam nos documentos do pedido e no atendimento quando disponíveis.",
} as const;

/** Oferta relâmpago da loja — deadline real (America/Sao_Paulo). */
export const FLASH_SALE = {
  enabled: true,
  /** Fim: 12/09/2026 23:59 BRT */
  endsAt: "2026-09-13T02:59:59.000Z",
  label: "Oferta com data",
  href: "/colecao?filtro=oferta",
  /** Corta frete do dia útil até este horário local (BRT). */
  sameDayCutoffHour: 15,
  /** Reserva do pedido no checkout, em minutos. */
  checkoutHoldMinutes: 10,
} as const;

export const CHECKOUT_TRUST = [
  { label: "Pix", detail: "Pagamento instantâneo" },
  { label: "Cartão", detail: "Processado pelo Mercado Pago" },
  { label: "Trocas", detail: "Condições na página de trocas" },
  { label: "Transparência", detail: "Total e frete antes de pagar" },
] as const;

export const NAV_LINKS = [
  { label: "Chinelos", href: "/colecao" },
  { label: "Kits", href: "/colecao?categoria=kits" },
  { label: "Lançamentos", href: "/colecao?filtro=novos" },
  { label: "Trocas", href: "/trocas" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const TRUST_BADGES = [
  { label: "Fotos reais", detail: "O par que você vê é o modelo anunciado" },
  { label: "Pix e cartão", detail: "Sem boleto · checkout via Mercado Pago" },
  { label: "Tamanho antes da compra", detail: "Escolha a numeração com guia em cm" },
  { label: "Trocas com regras claras", detail: "Leia a política antes de fechar" },
];

export const FAQ_ITEMS = [
  {
    question: "Como escolher o tamanho certo do chinelo Keeus?",
    answer:
      "A numeração Keeus segue a tabela brasileira. Em cada produto há um guia com medidas em centímetros. Se estiver entre dois tamanhos, escolha o maior.",
  },
  {
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "Aceitamos Pix e cartão de crédito via Mercado Pago. Sem boleto. Se o pagamento online estiver indisponível, finalizamos pelo atendimento.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "Informe seu CEP na página do produto ou no checkout para ver SEDEX e PAC com preço e prazo em dias úteis. O prazo conta após a confirmação do pagamento.",
  },
  {
    question: "Posso trocar ou devolver meu chinelo?",
    answer:
      "Consulte a página de Trocas e Devoluções para conhecer as condições aplicáveis e os canais de atendimento antes de comprar.",
  },
  {
    question: "Os chinelos Keeus são resistentes à água?",
    answer:
      "Todos os chinelos Keeus usam materiais resistentes à água (EVA e TPU): adequados para praia, piscina e uso no dia a dia. Não absorvem água e secam rápido.",
  },
  {
    question: "Qual a diferença entre os modelos Slide e Flip Flop?",
    answer:
      "O modelo Slide possui faixa larga sobre o peito do pé com design minimalista, ideal para uso casual e pós-esporte. O Flip Flop é o chinelo de dedo tradicional, com tiras em TPU flexível — perfeito para praia e lazer.",
  },
  {
    question: "Como limpar e conservar meus chinelos Keeus?",
    answer:
      "Limpe com água, sabão neutro e esponja macia. Evite abrasivos. Seque à sombra e guarde em local arejado.",
  },
  {
    question: "A Keeus tem loja física?",
    answer:
      "A coleção disponível neste site pode ser consultada online. Para informações comerciais e disponibilidade, use a página de contato.",
  },
];
