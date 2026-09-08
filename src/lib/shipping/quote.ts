/**
 * Server-side frete quote — single source of truth for /api/frete and POST /api/orders.
 * Never trust client-provided shipping.price.
 */

const CORREIOS_TABLE = {
  capital: { sedex: { price: 22.9, days: 2 }, pac: { price: 14.5, days: 5 } },
  sul_sudeste: { sedex: { price: 28.9, days: 3 }, pac: { price: 17.9, days: 7 } },
  centro_oeste: { sedex: { price: 33.9, days: 3 }, pac: { price: 19.5, days: 8 } },
  nordeste: { sedex: { price: 38.9, days: 4 }, pac: { price: 22.5, days: 10 } },
  norte: { sedex: { price: 44.9, days: 5 }, pac: { price: 27.5, days: 12 } },
} as const;

type Region = keyof typeof CORREIOS_TABLE;

export type FreteServiceName = "SEDEX" | "PAC";

export type FreteOpcaoServer = {
  servico: FreteServiceName;
  transportadora: string;
  preco: number;
  prazo: number;
  gratis: boolean;
  descricao: string;
};

export type FreteQuoteResult = {
  cep: string;
  cidade: string;
  estado: string;
  opcoes: FreteOpcaoServer[];
  observacao: string;
  fonte: string;
};

function getRegionByCep(cep: string): Region {
  const num = parseInt(cep.replace(/\D/g, "").slice(0, 5), 10);
  if ((num >= 1000 && num <= 9999) || (num >= 20000 && num <= 23799)) return "capital";
  if (num >= 10000 && num <= 39999) return "sul_sudeste";
  if (num >= 80000 && num <= 99999) return "sul_sudeste";
  if (num >= 70000 && num <= 79999) return "centro_oeste";
  if (num >= 40000 && num <= 65999) return "nordeste";
  if (num >= 66000 && num <= 69999) return "norte";
  return "sul_sudeste";
}

export function normalizeCep(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 8);
}

export function formatCep(raw: string): string {
  const d = normalizeCep(raw);
  if (d.length !== 8) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

/** Pure quote from CEP digits + order subtotal (no network). */
export function quoteFreteFromCep(
  cepDigits: string,
  valorPedido = 0,
  meta?: { cidade?: string; estado?: string }
): FreteQuoteResult | { error: string; status: number } {
  const cep = normalizeCep(cepDigits);
  if (cep.length !== 8) {
    return { error: "CEP inválido. Informe 8 dígitos.", status: 400 };
  }

  const region = getRegionByCep(cep);
  const tabela = CORREIOS_TABLE[region];
  const freteGratisSedex = valorPedido >= 299.9;

  return {
    cep: formatCep(cep),
    cidade: meta?.cidade ?? "",
    estado: meta?.estado ?? "",
    opcoes: [
      {
        servico: "SEDEX",
        transportadora: "Correios",
        preco: freteGratisSedex ? 0 : tabela.sedex.price,
        prazo: tabela.sedex.days,
        gratis: freteGratisSedex,
        descricao: `Entrega expressa em ${tabela.sedex.days} dias úteis`,
      },
      {
        servico: "PAC",
        transportadora: "Correios",
        preco: tabela.pac.price,
        prazo: tabela.pac.days,
        gratis: false,
        descricao: `Entrega econômica em ${tabela.pac.days} dias úteis`,
      },
    ],
    observacao: freteGratisSedex
      ? "SEDEX grátis para pedidos acima de R$ 299,90."
      : valorPedido > 0
        ? `Faltam R$ ${(299.9 - valorPedido).toFixed(2).replace(".", ",")} para frete SEDEX grátis`
        : "Frete SEDEX grátis em compras acima de R$ 299,90",
    fonte: process.env.CORREIOS_USERNAME ? "correios_api" : "tabela_estimada",
  };
}

/** Resolve a selected service against a fresh server quote. Rejects client price. */
export function resolveShippingForOrder(input: {
  cep?: string;
  service?: string;
  /** Ignored — never trusted. */
  clientPrice?: number;
  subtotal: number;
  cidade?: string;
  estado?: string;
}):
  | {
      ok: true;
      shipping: {
        cep: string;
        service: FreteServiceName;
        carrier: string;
        price: number;
        days: number;
        id: string;
      };
    }
  | { ok: false; error: string } {
  const cep = normalizeCep(input.cep || "");
  if (cep.length !== 8) {
    return { ok: false, error: "CEP de frete inválido" };
  }
  const service = (input.service || "").toUpperCase();
  if (service !== "SEDEX" && service !== "PAC") {
    return { ok: false, error: "Selecione SEDEX ou PAC" };
  }

  const quoted = quoteFreteFromCep(cep, input.subtotal, {
    cidade: input.cidade,
    estado: input.estado,
  });
  if ("error" in quoted) {
    return { ok: false, error: quoted.error };
  }

  const opcao = quoted.opcoes.find((o) => o.servico === service);
  if (!opcao) {
    return { ok: false, error: "Serviço de frete indisponível" };
  }

  return {
    ok: true,
    shipping: {
      id: opcao.servico,
      cep: quoted.cep,
      service: opcao.servico,
      carrier: opcao.transportadora,
      price: Number(opcao.preco.toFixed(2)),
      days: opcao.prazo,
    },
  };
}

/** Full quote with ViaCEP city/state enrichment (for HTTP API). */
export async function quoteFrete(
  cepRaw: string,
  valorPedido = 0
): Promise<FreteQuoteResult | { error: string; status: number }> {
  const cep = normalizeCep(cepRaw);
  if (cep.length !== 8) {
    return { error: "CEP inválido. Informe 8 dígitos.", status: 400 };
  }

  let cidade = "";
  let estado = "";
  try {
    const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      next: { revalidate: 86400 },
    });
    if (viaCep.ok) {
      const data = (await viaCep.json()) as { erro?: boolean; localidade?: string; uf?: string };
      if (data.erro) {
        return { error: "CEP não encontrado.", status: 404 };
      }
      cidade = data.localidade ?? "";
      estado = data.uf ?? "";
    }
  } catch {
    /* continue with region estimate */
  }

  return quoteFreteFromCep(cep, valorPedido, { cidade, estado });
}
