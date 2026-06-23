import { Course } from "./types";

export const COURSES: Course[] = [
  // ── FARMÁCIA / SAÚDE ─────────────────────────────────────────────────
  {
    id: 1,
    slug: "farmacologia-clinica-aplicada",
    name: "Farmacologia Clínica Aplicada",
    category: "farmacia",
    price: 397,
    instructor: "Dr. Carlos Eduardo Ribeiro",
    duration: "40h",
    level: "Avançado",
    students: 2843,
    rating: 4.9,
    description:
      "Domine os mecanismos de ação, interações medicamentosas e protocolos terapêuticos mais utilizados na prática clínica. Curso essencial para farmacêuticos que atuam em hospitais, clínicas e atenção primária. Inclui estudos de caso reais e simulações de prescrição.",
    image: "/products/placeholder.svg",
    modules: [
      "Farmacocinética e Farmacodinâmica Avançada",
      "Interações Medicamentosas e Reações Adversas",
      "Protocolos Terapêuticos por Especialidade",
      "Farmacovigilância e Segurança do Paciente",
      "Estudos de Caso Clínicos",
    ],
    certificate: true,
  },
  {
    id: 2,
    slug: "assistencia-farmaceutica-sus",
    name: "Assistência Farmacêutica no SUS",
    category: "farmacia",
    price: 197,
    instructor: "Dra. Ana Paula Medeiros",
    duration: "20h",
    level: "Intermediário",
    students: 5127,
    rating: 4.7,
    description:
      "Entenda o ciclo da assistência farmacêutica no Sistema Único de Saúde, da seleção de medicamentos à dispensação e acompanhamento do paciente. Aborda a RENAME, Componentes de Financiamento e o cuidado farmacêutico na atenção básica.",
    image: "/products/placeholder.svg",
    modules: [
      "Política Nacional de Medicamentos",
      "Ciclo da Assistência Farmacêutica",
      "RENAME e Componentes de Financiamento",
      "Cuidado Farmacêutico na Atenção Básica",
    ],
    certificate: true,
  },

  // ── NEGÓCIOS / VENDAS ────────────────────────────────────────────────
  {
    id: 3,
    slug: "master-vendas-consultivas",
    name: "Master em Vendas Consultivas",
    category: "negocios",
    price: 497,
    instructor: "Ricardo Oliveira Santos",
    duration: "32h",
    level: "Avançado",
    students: 9156,
    rating: 4.8,
    description:
      "Transforme sua abordagem comercial com o método SPIN Selling e técnicas avançadas de negociação B2B. Aprenda a diagnosticar necessidades reais do cliente, construir propostas de valor e fechar contratos de alto ticket com confiança.",
    image: "/products/placeholder.svg",
    modules: [
      "Fundamentos da Venda Consultiva",
      "SPIN Selling e Diagnóstico de Necessidades",
      "Construção de Propostas de Valor",
      "Negociação Avançada e Contorno de Objeções",
      "Gestão de Pipeline e Follow-up Estratégico",
      "Fechamento de Alto Ticket",
    ],
    certificate: true,
  },
  {
    id: 4,
    slug: "gestao-pequenos-negocios",
    name: "Gestão de Pequenos Negócios",
    category: "negocios",
    price: 147,
    instructor: "Juliana Costa Ferreira",
    duration: "16h",
    level: "Iniciante",
    students: 12438,
    rating: 4.6,
    description:
      "Do plano de negócios ao controle financeiro diário: tudo que o micro e pequeno empreendedor precisa para estruturar, gerir e escalar o seu negócio. Aborda precificação, fluxo de caixa, MEI e Simples Nacional de forma prática.",
    image: "/products/placeholder.svg",
    modules: [
      "Plano de Negócios na Prática",
      "Gestão Financeira e Fluxo de Caixa",
      "Precificação Inteligente",
      "MEI, Simples Nacional e Obrigações Fiscais",
      "Marketing para Pequenos Negócios",
    ],
    certificate: true,
  },

  // ── TECNOLOGIA / IA ──────────────────────────────────────────────────
  {
    id: 5,
    slug: "inteligencia-artificial-generativa",
    name: "Inteligência Artificial Generativa",
    category: "tecnologia",
    price: 347,
    instructor: "Prof. Dr. Marcos Vinícius Almeida",
    duration: "24h",
    level: "Intermediário",
    students: 6741,
    rating: 4.9,
    description:
      "Explore o universo da IA generativa com LLMs, difusão e modelos multimodais. Curso prático com projetos usando GPT, Claude, Stable Diffusion e LangChain para criar aplicações reais de texto, imagem e código.",
    image: "/products/placeholder.svg",
    modules: [
      "Fundamentos de LLMs e Transformers",
      "Engenharia de Prompt e RAG",
      "Agentes Autônomos com LangChain",
      "Geração de Imagens com Difusão",
      "Modelos Multimodais e Aplicações",
      "Ética e Governança em IA Generativa",
    ],
    certificate: true,
  },
  {
    id: 6,
    slug: "machine-learning-zero",
    name: "Machine Learning do Zero",
    category: "tecnologia",
    price: 247,
    instructor: "Dra. Carolina Mendes Lima",
    duration: "30h",
    level: "Iniciante",
    students: 14892,
    rating: 4.8,
    description:
      "Aprenda Machine Learning na prática com Python, sem pré-requisitos complexos. Do pré-processamento de dados à criação de modelos preditivos com scikit-learn, regressão, classificação e clustering. Ideal para iniciantes em ciência de dados.",
    image: "/products/placeholder.svg",
    modules: [
      "Introdução a Python para Dados",
      "Pré-processamento e Análise Exploratória",
      "Regressão Linear e Logística",
      "Classificação com Árvores e Random Forest",
      "Clustering e Redução de Dimensionalidade",
      "Projeto Final: Modelo Preditivo Completo",
    ],
    certificate: true,
  },

  // ── MARKETING DIGITAL ────────────────────────────────────────────────
  {
    id: 7,
    slug: "trafego-pago-estrategias",
    name: "Estratégias de Tráfego Pago",
    category: "marketing",
    price: 297,
    instructor: "Lucas Andrade Martins",
    duration: "18h",
    level: "Intermediário",
    students: 10873,
    rating: 4.7,
    description:
      "Domine Google Ads, Meta Ads e TikTok Ads com estratégias comprovadas de segmentação, criativos de alta conversão e otimização de ROI. Curso focado em resultados com métricas reais e estudos de caso de campanhas de sucesso.",
    image: "/products/placeholder.svg",
    modules: [
      "Fundamentos de Mídia Paga",
      "Google Ads: Search, Display e Shopping",
      "Meta Ads: Segmentação e Criativos",
      "TikTok Ads e Formatos Nativos",
      "Mensuração, ROI e Otimização Contínua",
    ],
    certificate: true,
  },
  {
    id: 8,
    slug: "social-media-avancado",
    name: "Social Media Avançado",
    category: "marketing",
    price: 227,
    instructor: "Mariana Silveira Campos",
    duration: "12h",
    level: "Avançado",
    students: 7320,
    rating: 4.5,
    description:
      "Eleve sua estratégia de redes sociais com planejamento editorial data-driven, produção de conteúdo viral e gestão de comunidades. Inclui frameworks de análise de concorrência, social listening e integração com times de venda e sucesso do cliente.",
    image: "/products/placeholder.svg",
    modules: [
      "Planejamento Editorial Data-Driven",
      "Produção de Conteúdo Viral e Storytelling",
      "Social Listening e Análise de Concorrência",
      "Gestão de Comunidades e Crises",
      "Integração com Vendas e CS",
      "Métricas Avançadas e Dashboards",
    ],
    certificate: true,
  },

  // ── GASTRONOMIA ──────────────────────────────────────────────────────
  {
    id: 9,
    slug: "chef-cozinha-brasileira",
    name: "Chef Profissional em Cozinha Brasileira",
    category: "gastronomia",
    price: 397,
    instructor: "Chef Roberto de Carvalho",
    duration: "36h",
    level: "Intermediário",
    students: 4532,
    rating: 4.9,
    description:
      "Uma imersão completa na cozinha brasileira contemporânea, das raízes indígenas e africanas às técnicas de alta gastronomia. Aprenda com um chef premiado a reinventar clássicos como moqueca, feijoada e tacacá com apresentação de restaurante estrelado.",
    image: "/products/placeholder.svg",
    modules: [
      "Ingredientes e Biomas Brasileiros",
      "Técnicas de Base: Caldos, Fundos e Molhos",
      "Cozinha do Norte e Nordeste",
      "Cozinha do Centro-Oeste e Sudeste",
      "Cozinha do Sul e Churrasco",
      "Empratamento e Apresentação Profissional",
    ],
    certificate: true,
  },
  {
    id: 10,
    slug: "panificacao-artesanal-completa",
    name: "Panificação Artesanal Completa",
    category: "gastronomia",
    price: 247,
    instructor: "Chef Helena Dornelles",
    duration: "20h",
    level: "Iniciante",
    students: 6298,
    rating: 4.8,
    description:
      "Do pão caseiro à boulangerie profissional: aprenda todas as etapas da panificação artesanal com fermentação natural, massas enriquecidas e grãos especiais. Curso 100% prático com receitas testadas e adaptadas ao clima e ingredientes brasileiros.",
    image: "/products/placeholder.svg",
    modules: [
      "Ciência da Panificação e Ingredientes",
      "Fermentação Natural e Levain",
      "Pães Rústicos e de Longa Fermentação",
      "Massas Enriquecidas e Brioches",
      "Pães Integrais e com Grãos Especiais",
    ],
    certificate: true,
  },

  // ── DESIGN / CRIATIVIDADE ────────────────────────────────────────────
  {
    id: 11,
    slug: "ux-ui-design-completo",
    name: "UX/UI Design Completo",
    category: "design",
    price: 297,
    instructor: "Daniela Borges Teixeira",
    duration: "28h",
    level: "Iniciante",
    students: 11540,
    rating: 4.8,
    description:
      "Da pesquisa com usuários ao protótipo navegável no Figma: torne-se um designer de produto digital completo. Aprenda Design Thinking, arquitetura da informação, wireframes, testes de usabilidade e design systems — tudo com projetos reais e mentorias.",
    image: "/products/placeholder.svg",
    modules: [
      "Fundamentos de UX e Design Thinking",
      "Pesquisa com Usuários e Personas",
      "Arquitetura da Informação e Wireframes",
      "UI Design e Design Systems no Figma",
      "Prototipagem e Testes de Usabilidade",
      "Portfólio e Carreira em Produtos Digitais",
    ],
    certificate: true,
  },
  {
    id: 12,
    slug: "design-grafico-adobe-suite",
    name: "Design Gráfico com Adobe Suite",
    category: "design",
    price: 347,
    instructor: "Pedro Henrique Alves",
    duration: "24h",
    level: "Avançado",
    students: 4891,
    rating: 4.6,
    description:
      "Domine Photoshop, Illustrator e InDesign em projetos integrados de identidade visual, editorial e mídias sociais. Curso focado em workflow profissional, automação de tarefas e preparação de arquivos para produção gráfica e digital.",
    image: "/products/placeholder.svg",
    modules: [
      "Photoshop Avançado: Composição e Retoque",
      "Illustrator: Vetores e Identidade Visual",
      "InDesign: Diagramação e Editorial",
      "Workflow Integrado Adobe Creative Cloud",
      "Preparação para Produção Gráfica e Digital",
    ],
    certificate: true,
  },
];

export const getCourseBySlug = (slug: string): Course | undefined =>
  COURSES.find((c) => c.slug === slug);

export const getCoursesByCategory = (category: Course["category"]): Course[] =>
  COURSES.filter((c) => c.category === category);

export const getFeaturedCourses = (): Course[] =>
  COURSES.filter((c) => c.rating >= 4.8).slice(0, 6);

export const getNewCourses = (): Course[] =>
  [...COURSES].sort((a, b) => b.students - a.students).slice(0, 4);
