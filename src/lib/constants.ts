export const SITE = {
  name: "Keeus",
  tagline: "Calçados que pensam em cada passo",
  description:
    "Keeus é a loja de calçados mais avançada do Brasil: tecnologia de ajuste de tamanho por IA, visualização 360°, frete calculado em tempo real e checkout em Pix, cartão ou boleto.",
  url: "https://www.keeus.com.br",
  whatsappNumber: "5511999999999",
  instagram: "https://instagram.com/keeusoficial",
  facebook: "https://www.facebook.com/keeusoficial",
  cnpj: "00.000.000/0001-00",
  address: {
    street: "Av. Presidente Vargas, 1000",
    city: "Franca",
    state: "SP",
    zip: "14400-000",
    full: "Av. Presidente Vargas, 1000 — Franca, SP — CEP 14400-000",
  },
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.123456789!2d-47.4009!3d-20.5401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDMyJzI0LjQiUyA0N8KwMjQnMDMuMiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=-20.5401,-47.4009",
};

export const NAV_LINKS = [
  { label: "Lançamentos", href: "/colecao?filtro=lancamentos" },
  { label: "Masculino", href: "/colecao?categoria=masculino" },
  { label: "Feminino", href: "/colecao?categoria=feminino" },
  { label: "Edição Limitada", href: "/colecao?filtro=edicao-limitada" },
];

export const TRUST_BADGES = [
  { label: "Entrega rápida", detail: "Todo o Brasil em 2-7 dias úteis" },
  { label: "Troca grátis", detail: "30 dias para troca sem custo" },
  { label: "Pagamento seguro", detail: "Pix, cartão em até 3x ou boleto" },
  { label: "Garantia Keeus", detail: "6 meses contra defeito de fabricação" },
];

export const FAQ_ITEMS = [
  {
    question: "Qual o prazo de entrega da Keeus para todo o Brasil?",
    answer:
      "Capitais recebem em 2 a 4 dias úteis e demais regiões em até 7 dias úteis, calculado em tempo real pelo seu CEP.",
  },
  {
    question: "Como funciona a recomendação de tamanho por IA da Keeus?",
    answer:
      "Você informa a marca e o tamanho que costuma usar, e nosso sistema cruza com o histórico de medidas de cada modelo para sugerir o tamanho ideal.",
  },
  {
    question: "Posso trocar o calçado se o tamanho não servir?",
    answer:
      "Sim, a Keeus oferece troca grátis em até 30 dias após o recebimento, sem custo de frete de retorno.",
  },
  {
    question: "Quais formas de pagamento a Keeus aceita?",
    answer:
      "Pix com 5% de desconto extra, cartão de crédito em até 3x sem juros e boleto bancário.",
  },
];
