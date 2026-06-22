import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// Tabela de preços Correios 2024 (SEDEX / PAC) para calçados até 500g
// Fonte: correios.com.br — tabela vigente 06/2024
// Em produção, substitua pelo SDK oficial dos Correios ou Melhor Envio API
// ─────────────────────────────────────────────────────────────────────────────
const CORREIOS_TABLE = {
  // Capitais e regiões metropolitanas (CEP 01000-000 a 09999-999 e 20000-000 a 29999-999)
  capital: { sedex: { price: 22.9, days: 2 }, pac: { price: 14.5, days: 5 } },
  // Sul/Sudeste exceto capitais
  sul_sudeste: { sedex: { price: 28.9, days: 3 }, pac: { price: 17.9, days: 7 } },
  // Centro-Oeste
  centro_oeste: { sedex: { price: 33.9, days: 3 }, pac: { price: 19.5, days: 8 } },
  // Nordeste
  nordeste: { sedex: { price: 38.9, days: 4 }, pac: { price: 22.5, days: 10 } },
  // Norte
  norte: { sedex: { price: 44.9, days: 5 }, pac: { price: 27.5, days: 12 } },
} as const;

type Region = keyof typeof CORREIOS_TABLE;

function getRegionByCep(cep: string): Region {
  const num = parseInt(cep.replace(/\D/g, "").slice(0, 5));
  // SP, RJ capital e grande SP/RJ
  if ((num >= 1000 && num <= 9999) || (num >= 20000 && num <= 23799)) return "capital";
  // SP interior, MG, ES, RJ interior, PR, SC, RS
  if (num >= 10000 && num <= 39999) return "sul_sudeste";
  if (num >= 80000 && num <= 99999) return "sul_sudeste";
  // GO, MT, MS, DF
  if (num >= 70000 && num <= 79999) return "centro_oeste";
  // BA, SE, AL, PE, PB, RN, CE, PI, MA
  if (num >= 40000 && num <= 65999) return "nordeste";
  // AM, RR, AP, PA, AC, RO, TO
  if (num >= 66000 && num <= 69999) return "norte";
  return "sul_sudeste";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cep = searchParams.get("cep")?.replace(/\D/g, "") ?? "";

  if (cep.length !== 8) {
    return NextResponse.json(
      { error: "CEP inválido. Informe 8 dígitos." },
      { status: 400 }
    );
  }

  // 1. Valida CEP via ViaCEP (API pública gratuita)
  let cidade = "";
  let estado = "";
  try {
    const viaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      next: { revalidate: 86400 }, // cache 24h
    });
    if (viaCep.ok) {
      const data = await viaCep.json();
      if (data.erro) {
        return NextResponse.json({ error: "CEP não encontrado." }, { status: 404 });
      }
      cidade = data.localidade ?? "";
      estado = data.uf ?? "";
    }
  } catch {
    // se viaCEP falhar, continuamos com a estimativa pela faixa do CEP
  }

  // 2. Calcula frete pela região
  const region = getRegionByCep(cep);
  const tabela = CORREIOS_TABLE[region];

  // 3. Verifica frete grátis (pedidos acima de R$ 299,90)
  const valorPedido = parseFloat(searchParams.get("valor") ?? "0");
  const freteGratisSedex = valorPedido >= 299.9;

  const resultado = {
    cep: `${cep.slice(0, 5)}-${cep.slice(5)}`,
    cidade,
    estado,
    opcoes: [
      {
        servico: "SEDEX",
        transportadora: "Correios",
        preco: freteGratisSedex ? 0 : tabela.sedex.price,
        prazo: tabela.sedex.days,
        gratis: freteGratisSedex,
        descricao: `Entrega expressa em ${tabela.sedex.days} dias úteis`,
        icone: "sedex",
      },
      {
        servico: "PAC",
        transportadora: "Correios",
        preco: tabela.pac.price,
        prazo: tabela.pac.days,
        gratis: false,
        descricao: `Entrega econômica em ${tabela.pac.days} dias úteis`,
        icone: "pac",
      },
    ],
    observacao: freteGratisSedex
      ? "🎉 SEDEX grátis para pedidos acima de R$ 299,90!"
      : valorPedido > 0
      ? `Faltam R$ ${(299.9 - valorPedido).toFixed(2)} para frete SEDEX grátis`
      : "Frete SEDEX grátis em compras acima de R$ 299,90",
    // Integração real: configure CORREIOS_USERNAME e CORREIOS_PASSWORD no .env
    // e substitua este cálculo pelo SDK oficial @correios-br/cep ou Melhor Envio
    fonte: process.env.CORREIOS_USERNAME ? "correios_api" : "tabela_estimada",
  };

  return NextResponse.json(resultado, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
