-- Keeus commerce foundation — apply in Supabase SQL editor or via CLI
-- Stock policy: reserved soft-hold on pending_payment; decrement stock only on paid.

create extension if not exists "pgcrypto";

create table if not exists products (
  id integer primary key,
  slug text not null unique,
  name text not null,
  category text not null,
  brand text not null default 'Keeus',
  price numeric(10,2) not null,
  installment_price numeric(10,2),
  installments integer default 4,
  is_new boolean default false,
  is_limited_edition boolean default false,
  colors jsonb default '[]'::jsonb,
  description text,
  image text,
  gallery jsonb default '[]'::jsonb,
  original_price numeric(10,2),
  created_at timestamptz not null default now()
);

create table if not exists product_variants (
  id bigserial primary key,
  product_id integer not null references products(id) on delete cascade,
  slug text not null,
  size integer not null,
  sku text not null unique,
  stock integer not null default 0 check (stock >= 0),
  reserved integer not null default 0 check (reserved >= 0),
  unique (slug, size)
);

create index if not exists product_variants_slug_idx on product_variants (slug);

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  access_token text not null,
  status text not null default 'pending_payment'
    check (status in ('pending_payment','paid','cancelled','fulfilled','refunded')),
  customer jsonb not null,
  subtotal numeric(10,2) not null,
  shipping_price numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  shipping jsonb,
  mercadopago_preference_id text,
  mercadopago_payment_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_idx on orders (created_at desc);

create table if not exists order_items (
  id bigserial primary key,
  order_id uuid not null references orders(id) on delete cascade,
  slug text not null,
  product_id integer not null,
  name text not null,
  size integer not null,
  sku text not null,
  qty integer not null check (qty > 0),
  unit_price numeric(10,2) not null,
  line_total numeric(10,2) not null
);

create index if not exists order_items_order_idx on order_items (order_id);

-- RLS: service role bypasses; lock down anon by default
alter table products enable row level security;
alter table product_variants enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table customers enable row level security;

-- No public policies — API uses service role key server-side only.
