# Commerce setup (Keeus)

Foundation for orders + inventory with Mercado Pago (Pix/card BR) and Supabase/Postgres. Works **without** live credentials: graceful 503s, atendimento fallback, and a **dev-only** file adapter.

## Stock policy

- On `POST /api/orders`: validate available stock (`stock - reserved`), create order as `pending_payment`, increment **`reserved`** (soft-hold).
- **Do not** decrement `stock` on create.
- On Mercado Pago webhook when payment is **approved**: set status `paid`, decrement `stock`, decrease `reserved`.
- Never invent payment success from the checkout redirect alone.

## Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL` | Orders in production | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Orders in production | Server-only; never expose to client |
| `DATABASE_URL` | (future) | Reserved; current adapter uses Supabase REST |
| `MERCADOPAGO_ACCESS_TOKEN` | Checkout preference | Server-only |
| `MERCADOPAGO_PUBLIC_KEY` | (optional UI) | Public key if you add Brick/SDK later |
| `MERCADOPAGO_WEBHOOK_SECRET` | Webhook verify | Without it, production webhook **won't** mark paid |
| `MERCADOPAGO_WEBHOOK_URL` | Optional override | Defaults to `{SITE}/api/payments/mercadopago/webhook` |
| `NEXT_PUBLIC_SITE_URL` | Back URLs | e.g. `https://valdecikeeus.vercel.app` |
| `ADMIN_PASSWORD` | `/admin` Basic auth | Or use with Basic user:anything |
| `ADMIN_TOKEN` | `/admin` query/cookie | Optional; falls back to `ADMIN_PASSWORD` |
| `N8N_LEADS_WEBHOOK_URL` | Contact/leads | Existing leads API |

No secrets belong in the repo. Use Vercel project env / `.env.local`.

## Apply migration + seed

1. Create a Supabase project.
2. SQL editor → run `supabase/migrations/001_commerce.sql`.
3. Run `supabase/migrations/002_seed_products.sql` (generated from `src/lib/products.ts`).
4. To regenerate seed after catalog changes: `node scripts/generate-seed.mjs`
5. Set `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` on Vercel.

## Local development (no Supabase)

With `NODE_ENV=development` and no Supabase env vars, orders persist under `data/orders.json` and `data/stock.json` (gitignored). Not safe on Vercel (ephemeral FS).

## What works without credentials

- Catalog + PDP size stock from `products.ts` / memory variants
- Checkout UI + atendimento fallback
- `POST /api/orders` → **503** in production without DB; works in local dev via file adapter
- Mercado Pago preference → **503** with clear message if token missing
- Admin → **401** if `ADMIN_PASSWORD` / `ADMIN_TOKEN` unset or wrong

## Mercado Pago

1. Create application in Mercado Pago developers.
2. Set `MERCADOPAGO_ACCESS_TOKEN` (test or prod).
3. Configure webhook to `/api/payments/mercadopago/webhook` and set `MERCADOPAGO_WEBHOOK_SECRET`.
4. Checkout calls `POST /api/payments/mercadopago/preference` then redirects to `init_point`.

## Admin

Visit `/admin` with HTTP Basic (`ADMIN_PASSWORD` or `ADMIN_TOKEN` as password). An opaque HttpOnly session cookie is set after success. Query-string `?token=` auth was removed.


## TODO (gold-pass / ops)

- **CNPJ**: manter `COMPANY.cnpj` vazio em `src/lib/constants.ts` até a loja informar o CNPJ real. Não inventar.
- **Mercado Pago**: configurar `MERCADOPAGO_ACCESS_TOKEN`, `MERCADOPAGO_WEBHOOK_SECRET` (e opcionalmente `MERCADOPAGO_PUBLIC_KEY` / `MERCADOPAGO_WEBHOOK_URL`) no Vercel. Sem token, checkout falha com graça e oferece atendimento.
- **Admin**: use HTTP Basic com `ADMIN_PASSWORD`. Auth por `?token=` na URL foi removida (leak em logs/Referer). Sessão HttpOnly opaca após Basic.
- **Frete**: `POST /api/orders` recalcula preço/prazo server-side via `src/lib/shipping/quote.ts` — nunca persiste `shipping.price` do client.
