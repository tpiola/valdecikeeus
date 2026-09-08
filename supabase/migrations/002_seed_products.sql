-- Auto-generated seed from src/lib/products.ts
begin;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (1, 'bahamas-cafe-cafe', 'Keeus Bahamas Café', 'slides', 'Keeus', 149.9, 37.48, 4, true, false, '["#8B7355","#1A1A1A"]'::jsonb, 'Slide de faixa larga na cor café. Palmilha anatômica de EVA, solado que não derrapa. Usa no dia a dia, no trabalho e em casa — combina com roupa clara e escura.', '/assets/real/produtos/bahamas-cafe-cafe/2k/1.png', '["/assets/real/produtos/bahamas-cafe-cafe/2k/1.png","/assets/real/produtos/bahamas-cafe-cafe/2k/2.png","/assets/real/produtos/bahamas-cafe-cafe/2k/3.png","/assets/real/produtos/bahamas-cafe-cafe/2k/4.png"]'::jsonb, 179.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 35, 'KEEUS-BAHAMAS-CAFE-CAFE-35', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 36, 'KEEUS-BAHAMAS-CAFE-CAFE-36', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 37, 'KEEUS-BAHAMAS-CAFE-CAFE-37', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 38, 'KEEUS-BAHAMAS-CAFE-CAFE-38', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 39, 'KEEUS-BAHAMAS-CAFE-CAFE-39', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 40, 'KEEUS-BAHAMAS-CAFE-CAFE-40', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 41, 'KEEUS-BAHAMAS-CAFE-CAFE-41', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 42, 'KEEUS-BAHAMAS-CAFE-CAFE-42', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 43, 'KEEUS-BAHAMAS-CAFE-CAFE-43', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (1, 'bahamas-cafe-cafe', 44, 'KEEUS-BAHAMAS-CAFE-CAFE-44', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (2, 'bahamas-preto-azul', 'Keeus Bahamas Preto Azul', 'slides', 'Keeus', 149.9, 37.48, 4, true, false, '["#1A1A1A","#003399"]'::jsonb, 'Slide de faixa larga preto com detalhe azul. Mesma palmilha anatômica dos outros Bahamas, solado de boa aderência. Vai bem na rua e no pós-banho.', '/assets/real/produtos/bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-1.png', '["/assets/real/produtos/bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-1.png","/assets/real/produtos/bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-2.png","/assets/real/produtos/bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-34511-bahamas-cafe-cafe-bco-laranja-3.png","/assets/real/produtos/bahamas-preto-azul/2k/keeus-4511-bahamas-preto-azul-bco-pto-4-bahamas-cafe-cafe-bco-laranja-4.png"]'::jsonb, 179.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 35, 'KEEUS-BAHAMAS-PRETO-AZUL-35', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 36, 'KEEUS-BAHAMAS-PRETO-AZUL-36', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 37, 'KEEUS-BAHAMAS-PRETO-AZUL-37', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 38, 'KEEUS-BAHAMAS-PRETO-AZUL-38', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 39, 'KEEUS-BAHAMAS-PRETO-AZUL-39', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 40, 'KEEUS-BAHAMAS-PRETO-AZUL-40', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 41, 'KEEUS-BAHAMAS-PRETO-AZUL-41', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 42, 'KEEUS-BAHAMAS-PRETO-AZUL-42', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 43, 'KEEUS-BAHAMAS-PRETO-AZUL-43', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (2, 'bahamas-preto-azul', 44, 'KEEUS-BAHAMAS-PRETO-AZUL-44', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (3, 'bahamas-preto-preto', 'Keeus Bahamas Preto', 'slides', 'Keeus', 139.9, 34.98, 4, false, false, '["#1A1A1A"]'::jsonb, 'O Bahamas todo preto. Faixa larga, palmilha anatômica de EVA, solado antiderrapante. É o modelo mais discreto da linha — serve pra tudo, sem chamar atenção.', '/assets/real/produtos/bahamas-preto-preto/2k/1.png', '["/assets/real/produtos/bahamas-preto-preto/2k/1.png","/assets/real/produtos/bahamas-preto-preto/2k/2.png","/assets/real/produtos/bahamas-preto-preto/2k/3.png","/assets/real/produtos/bahamas-preto-preto/2k/4.png"]'::jsonb, null)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 35, 'KEEUS-BAHAMAS-PRETO-PRETO-35', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 36, 'KEEUS-BAHAMAS-PRETO-PRETO-36', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 37, 'KEEUS-BAHAMAS-PRETO-PRETO-37', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 38, 'KEEUS-BAHAMAS-PRETO-PRETO-38', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 39, 'KEEUS-BAHAMAS-PRETO-PRETO-39', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 40, 'KEEUS-BAHAMAS-PRETO-PRETO-40', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 41, 'KEEUS-BAHAMAS-PRETO-PRETO-41', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 42, 'KEEUS-BAHAMAS-PRETO-PRETO-42', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 43, 'KEEUS-BAHAMAS-PRETO-PRETO-43', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 44, 'KEEUS-BAHAMAS-PRETO-PRETO-44', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (3, 'bahamas-preto-preto', 45, 'KEEUS-BAHAMAS-PRETO-PRETO-45', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (4, 'malibu-cafe-cafe', 'Keeus Malibu Café', 'flipflops', 'Keeus', 129.9, 32.48, 4, true, false, '["#8B7355","#1A1A1A"]'::jsonb, 'Chinelo de dedo com tira na cor café. Tira de TPU flexível, palmilha anatômica e solado macio. Feito pra praia, piscina e dia quente.', '/assets/real/produtos/malibu-cafe-cafe/2k/1.png', '["/assets/real/produtos/malibu-cafe-cafe/2k/1.png","/assets/real/produtos/malibu-cafe-cafe/2k/2.png","/assets/real/produtos/malibu-cafe-cafe/2k/3.png","/assets/real/produtos/malibu-cafe-cafe/2k/4.png"]'::jsonb, 149.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 34, 'KEEUS-MALIBU-CAFE-CAFE-34', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 35, 'KEEUS-MALIBU-CAFE-CAFE-35', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 36, 'KEEUS-MALIBU-CAFE-CAFE-36', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 37, 'KEEUS-MALIBU-CAFE-CAFE-37', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 38, 'KEEUS-MALIBU-CAFE-CAFE-38', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 39, 'KEEUS-MALIBU-CAFE-CAFE-39', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 40, 'KEEUS-MALIBU-CAFE-CAFE-40', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 41, 'KEEUS-MALIBU-CAFE-CAFE-41', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 42, 'KEEUS-MALIBU-CAFE-CAFE-42', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (4, 'malibu-cafe-cafe', 43, 'KEEUS-MALIBU-CAFE-CAFE-43', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (5, 'malibu-preto-preto', 'Keeus Malibu Preto', 'flipflops', 'Keeus', 119.9, 29.98, 4, false, false, '["#1A1A1A"]'::jsonb, 'O chinelo de dedo preto da linha. Tira anatômica de TPU, palmilha de EVA macia, solado antiderrapante. Leve, seca rápido e não faz barulho no pé.', '/assets/real/produtos/malibu-preto-preto/2k/1.png', '["/assets/real/produtos/malibu-preto-preto/2k/1.png","/assets/real/produtos/malibu-preto-preto/2k/2.png","/assets/real/produtos/malibu-preto-preto/2k/3.png","/assets/real/produtos/malibu-preto-preto/2k/4.png"]'::jsonb, null)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 34, 'KEEUS-MALIBU-PRETO-PRETO-34', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 35, 'KEEUS-MALIBU-PRETO-PRETO-35', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 36, 'KEEUS-MALIBU-PRETO-PRETO-36', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 37, 'KEEUS-MALIBU-PRETO-PRETO-37', 6, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 38, 'KEEUS-MALIBU-PRETO-PRETO-38', 6, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 39, 'KEEUS-MALIBU-PRETO-PRETO-39', 6, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 40, 'KEEUS-MALIBU-PRETO-PRETO-40', 6, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 41, 'KEEUS-MALIBU-PRETO-PRETO-41', 6, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 42, 'KEEUS-MALIBU-PRETO-PRETO-42', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 43, 'KEEUS-MALIBU-PRETO-PRETO-43', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (5, 'malibu-preto-preto', 44, 'KEEUS-MALIBU-PRETO-PRETO-44', 5, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (6, 'malibu-mel-cafe', 'Keeus Malibu Mel Café', 'flipflops', 'Keeus', 129.9, 32.48, 4, true, false, '["#D4A574","#8B7355"]'::jsonb, 'Chinelo de dedo com tira mel e base café. Tira de TPU flexível, palmilha anatômica e solado macio. A combinação mais vendida da linha Malibu.', '/assets/real/produtos/malibu-mel-cafe/2k/1.png', '["/assets/real/produtos/malibu-mel-cafe/2k/1.png","/assets/real/produtos/malibu-mel-cafe/2k/2.png","/assets/real/produtos/malibu-mel-cafe/2k/3.png","/assets/real/produtos/malibu-mel-cafe/2k/4.png"]'::jsonb, 149.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 34, 'KEEUS-MALIBU-MEL-CAFE-34', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 35, 'KEEUS-MALIBU-MEL-CAFE-35', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 36, 'KEEUS-MALIBU-MEL-CAFE-36', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 37, 'KEEUS-MALIBU-MEL-CAFE-37', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 38, 'KEEUS-MALIBU-MEL-CAFE-38', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 39, 'KEEUS-MALIBU-MEL-CAFE-39', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 40, 'KEEUS-MALIBU-MEL-CAFE-40', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 41, 'KEEUS-MALIBU-MEL-CAFE-41', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 42, 'KEEUS-MALIBU-MEL-CAFE-42', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (6, 'malibu-mel-cafe', 43, 'KEEUS-MALIBU-MEL-CAFE-43', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (7, 'malibu-cafe-cafe-meli', 'Keeus Malibu Café Meli', 'flipflops', 'Keeus', 139.9, 34.98, 4, true, false, '["#8B7355","#C4956A"]'::jsonb, 'O Malibu com detalhe laranja Keeus. Mesmo caimento e mesma palmilha dos outros Malibu, com um toque de cor na tira. Edição especial da coleção.', '/assets/real/produtos/malibu-cafe-cafe-meli/2k/1.png', '["/assets/real/produtos/malibu-cafe-cafe-meli/2k/1.png","/assets/real/produtos/malibu-cafe-cafe-meli/2k/2.png","/assets/real/produtos/malibu-cafe-cafe-meli/2k/3.png","/assets/real/produtos/malibu-cafe-cafe-meli/2k/4.png"]'::jsonb, 159.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 34, 'KEEUS-MALIBU-CAFE-CAFE-MELI-34', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 35, 'KEEUS-MALIBU-CAFE-CAFE-MELI-35', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 36, 'KEEUS-MALIBU-CAFE-CAFE-MELI-36', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 37, 'KEEUS-MALIBU-CAFE-CAFE-MELI-37', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 38, 'KEEUS-MALIBU-CAFE-CAFE-MELI-38', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 39, 'KEEUS-MALIBU-CAFE-CAFE-MELI-39', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 40, 'KEEUS-MALIBU-CAFE-CAFE-MELI-40', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 41, 'KEEUS-MALIBU-CAFE-CAFE-MELI-41', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 42, 'KEEUS-MALIBU-CAFE-CAFE-MELI-42', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (7, 'malibu-cafe-cafe-meli', 43, 'KEEUS-MALIBU-CAFE-CAFE-MELI-43', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (8, 'malibu-mel-cafe-meli', 'Keeus Malibu Mel Meli', 'flipflops', 'Keeus', 139.9, 34.98, 4, true, false, '["#D4A574","#FF5F1F"]'::jsonb, 'Tira mel com detalhe laranja. Chinelo de dedo com palmilha anatômica e solado antiderrapante. Se você quer um chinelo que dá pra achar num churrasco, é esse.', '/assets/real/produtos/malibu-mel-cafe-meli/2k/1.png', '["/assets/real/produtos/malibu-mel-cafe-meli/2k/1.png","/assets/real/produtos/malibu-mel-cafe-meli/2k/2.png","/assets/real/produtos/malibu-mel-cafe-meli/2k/3.png","/assets/real/produtos/malibu-mel-cafe-meli/2k/4.png"]'::jsonb, 159.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 34, 'KEEUS-MALIBU-MEL-CAFE-MELI-34', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 35, 'KEEUS-MALIBU-MEL-CAFE-MELI-35', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 36, 'KEEUS-MALIBU-MEL-CAFE-MELI-36', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 37, 'KEEUS-MALIBU-MEL-CAFE-MELI-37', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 38, 'KEEUS-MALIBU-MEL-CAFE-MELI-38', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 39, 'KEEUS-MALIBU-MEL-CAFE-MELI-39', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 40, 'KEEUS-MALIBU-MEL-CAFE-MELI-40', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 41, 'KEEUS-MALIBU-MEL-CAFE-MELI-41', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 42, 'KEEUS-MALIBU-MEL-CAFE-MELI-42', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (8, 'malibu-mel-cafe-meli', 43, 'KEEUS-MALIBU-MEL-CAFE-MELI-43', 2, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (9, 'toledo-cafe-cafe', 'Keeus Toledo Café', 'slides', 'Keeus', 169.9, 42.48, 4, true, false, '["#8B7355","#1A1A1A"]'::jsonb, 'Slide de faixa larga texturizada na cor café. Palmilha de EVA de dupla densidade, solado mais robusto. Pra quem usa o dia inteiro e quer um chinelo que aguenta.', '/assets/real/produtos/toledo-cafe-cafe/2k/1.png', '["/assets/real/produtos/toledo-cafe-cafe/2k/1.png","/assets/real/produtos/toledo-cafe-cafe/2k/2.png","/assets/real/produtos/toledo-cafe-cafe/2k/3.png","/assets/real/produtos/toledo-cafe-cafe/2k/4.png"]'::jsonb, 199.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 36, 'KEEUS-TOLEDO-CAFE-CAFE-36', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 37, 'KEEUS-TOLEDO-CAFE-CAFE-37', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 38, 'KEEUS-TOLEDO-CAFE-CAFE-38', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 39, 'KEEUS-TOLEDO-CAFE-CAFE-39', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 40, 'KEEUS-TOLEDO-CAFE-CAFE-40', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 41, 'KEEUS-TOLEDO-CAFE-CAFE-41', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 42, 'KEEUS-TOLEDO-CAFE-CAFE-42', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 43, 'KEEUS-TOLEDO-CAFE-CAFE-43', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (9, 'toledo-cafe-cafe', 44, 'KEEUS-TOLEDO-CAFE-CAFE-44', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (10, 'toledo-preto-laranja', 'Keeus Toledo Preto Laranja', 'slides', 'Keeus', 179.9, 44.98, 4, true, true, '["#1A1A1A","#FF5F1F"]'::jsonb, 'Slide preto com a cor laranja da casa. Faixa larga de TPU, palmilha anatômica, solado com boa aderência. É o modelo que mais chama atenção da coleção.', '/assets/real/produtos/toledo-preto-laranja/2k/1.png', '["/assets/real/produtos/toledo-preto-laranja/2k/1.png","/assets/real/produtos/toledo-preto-laranja/2k/2.png","/assets/real/produtos/toledo-preto-laranja/2k/3.png","/assets/real/produtos/toledo-preto-laranja/2k/4.png"]'::jsonb, 219.9)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 37, 'KEEUS-TOLEDO-PRETO-LARANJA-37', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 38, 'KEEUS-TOLEDO-PRETO-LARANJA-38', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 39, 'KEEUS-TOLEDO-PRETO-LARANJA-39', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 40, 'KEEUS-TOLEDO-PRETO-LARANJA-40', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 41, 'KEEUS-TOLEDO-PRETO-LARANJA-41', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 42, 'KEEUS-TOLEDO-PRETO-LARANJA-42', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 43, 'KEEUS-TOLEDO-PRETO-LARANJA-43', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (10, 'toledo-preto-laranja', 44, 'KEEUS-TOLEDO-PRETO-LARANJA-44', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (11, 'toledo-preto-preto', 'Keeus Toledo Preto', 'slides', 'Keeus', 159.9, 39.98, 4, false, false, '["#1A1A1A"]'::jsonb, 'O Toledo na versão toda preta. Faixa larga de TPU, palmilha anatômica, solado antiderrapante. Sem estampa, sem firula — só o chinelo.', '/assets/real/produtos/toledo-preto-preto/2k/1.png', '["/assets/real/produtos/toledo-preto-preto/2k/1.png","/assets/real/produtos/toledo-preto-preto/2k/2.png","/assets/real/produtos/toledo-preto-preto/2k/3.png","/assets/real/produtos/toledo-preto-preto/2k/4.png"]'::jsonb, null)
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;

insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 36, 'KEEUS-TOLEDO-PRETO-PRETO-36', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 37, 'KEEUS-TOLEDO-PRETO-PRETO-37', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 38, 'KEEUS-TOLEDO-PRETO-PRETO-38', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 39, 'KEEUS-TOLEDO-PRETO-PRETO-39', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 40, 'KEEUS-TOLEDO-PRETO-PRETO-40', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 41, 'KEEUS-TOLEDO-PRETO-PRETO-41', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 42, 'KEEUS-TOLEDO-PRETO-PRETO-42', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 43, 'KEEUS-TOLEDO-PRETO-PRETO-43', 4, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 44, 'KEEUS-TOLEDO-PRETO-PRETO-44', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;
insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (11, 'toledo-preto-preto', 45, 'KEEUS-TOLEDO-PRETO-PRETO-45', 3, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;

commit;
