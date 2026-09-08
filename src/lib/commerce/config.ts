import type { CommerceConfig } from "./types";

export function isSupabaseConfigured(): boolean {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && key);
}

/** True when a Postgres connection string exists (future direct driver). */
export function isDatabaseUrlConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Persistence-ready flag for the current adapters.
 * Today only Supabase REST is implemented; DATABASE_URL alone is not enough yet.
 */
export function isDatabaseConfigured(): boolean {
  return isSupabaseConfigured();
}

export function isMercadoPagoConfigured(): boolean {
  return Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN);
}

export function isDevFileAdapterEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function canPersistOrders(): boolean {
  return isDatabaseConfigured() || isDevFileAdapterEnabled();
}

export function getCommerceConfig(): CommerceConfig {
  return {
    databaseConfigured: isDatabaseConfigured(),
    mercadopagoConfigured: isMercadoPagoConfigured(),
    isDevFileAdapter: isDevFileAdapterEnabled() && !isDatabaseConfigured(),
  };
}

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://valdecikeeus.vercel.app";
}

export function getSupabaseUrl(): string | null {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || null;
}

export function getSupabaseServiceKey(): string | null {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || null;
}
