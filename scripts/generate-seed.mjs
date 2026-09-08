import { writeFileSync, readFileSync } from "fs";

const src = readFileSync(new URL("../src/lib/products.ts", import.meta.url), "utf8");

function extractProducts(text) {
  const products = [];
  const blocks = text.split(/\{\s*id:\s*/).slice(1);
  for (const block of blocks) {
    const id = Number(block.match(/^(\d+)/)?.[1]);
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const name = block.match(/name:\s*"([^"]+)"/)?.[1];
    const category = block.match(/category:\s*"([^"]+)"/)?.[1];
    const brand = block.match(/brand:\s*"([^"]+)"/)?.[1] || "Keeus";
    const price = Number(block.match(/price:\s*([0-9.]+)/)?.[1]);
    const installmentPrice = Number(block.match(/installmentPrice:\s*([0-9.]+)/)?.[1]);
    const installments = Number(block.match(/installments:\s*(\d+)/)?.[1] || 4);
    const stock = Number(block.match(/stock:\s*(\d+)/)?.[1] || 0);
    const isNew = /isNew:\s*true/.test(block);
    const isLimited = /isLimitedEdition:\s*true/.test(block);
    const sizesMatch = block.match(/sizes:\s*\[([^\]]+)\]/);
    const sizes = sizesMatch
      ? sizesMatch[1].split(",").map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n))
      : [];
    const colorsMatch = block.match(/colors:\s*\[([^\]]+)\]/);
    const colors = colorsMatch
      ? [...colorsMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
      : [];
    const descBlock = block.match(/description:\s*\n?\s*"([\s\S]*?)",\s*\n\s*image:/);
    const desc = (descBlock?.[1] || "").replace(/\s*\n\s*/g, " ").trim();
    const imageRel = block.match(/image:\s*IMG\("([^"]+)"\)/)?.[1];
    const galleryBlock = block.match(/gallery:\s*\[([\s\S]*?)\],\s*\n\s*angleCount/);
    const galleryRels = galleryBlock
      ? [...galleryBlock[1].matchAll(/IMG\("([^"]+)"\)/g)].map((m) => m[1])
      : [];
    const gallery = galleryRels.map((p) => `/assets/real/produtos/${p}`);
    const originalPriceMatch = block.match(/originalPrice:\s*([0-9.]+)/);
    const originalPrice = originalPriceMatch ? Number(originalPriceMatch[1]) : null;
    if (!id || !slug) continue;
    products.push({
      id,
      slug,
      name,
      category,
      brand,
      price,
      installmentPrice,
      installments,
      stock,
      isNew,
      isLimited,
      sizes,
      colors,
      description: desc,
      image: imageRel ? `/assets/real/produtos/${imageRel}` : gallery[0],
      gallery,
      originalPrice,
    });
  }
  return products;
}

function distributeStock(total, sizes) {
  if (!sizes.length) return [];
  const base = Math.floor(total / sizes.length);
  const remainder = total % sizes.length;
  const mid = Math.floor(sizes.length / 2);
  const extras = sizes
    .map((_, j) => ({ j, d: Math.abs(j - mid) }))
    .sort((a, b) => a.d - b.d || a.j - b.j)
    .slice(0, remainder)
    .map((x) => x.j);
  return sizes.map((_, i) => base + (extras.includes(i) ? 1 : 0));
}

function buildSku(slug, size) {
  const clean = slug
    .toUpperCase()
    .split(/[^A-Z0-9]+/)
    .filter(Boolean)
    .join("-");
  return `KEEUS-${clean}-${size}`;
}

function esc(s) {
  return String(s ?? "").replace(/'/g, "''");
}

const products = extractProducts(src);
const lines = ["-- Auto-generated seed from src/lib/products.ts", "begin;", ""];

for (const p of products) {
  lines.push(`insert into products (id, slug, name, category, brand, price, installment_price, installments, is_new, is_limited_edition, colors, description, image, gallery, original_price)
values (${p.id}, '${esc(p.slug)}', '${esc(p.name)}', '${esc(p.category)}', '${esc(p.brand)}', ${p.price}, ${p.installmentPrice}, ${p.installments}, ${p.isNew}, ${p.isLimited}, '${JSON.stringify(p.colors)}'::jsonb, '${esc(p.description)}', '${esc(p.image)}', '${JSON.stringify(p.gallery)}'::jsonb, ${p.originalPrice ?? "null"})
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  price = excluded.price,
  description = excluded.description,
  image = excluded.image,
  gallery = excluded.gallery;`);
  lines.push("");
  const per = distributeStock(p.stock, p.sizes);
  p.sizes.forEach((size, i) => {
    const sku = buildSku(p.slug, size);
    lines.push(`insert into product_variants (product_id, slug, size, sku, stock, reserved)
values (${p.id}, '${esc(p.slug)}', ${size}, '${esc(sku)}', ${per[i]}, 0)
on conflict (sku) do update set stock = excluded.stock, product_id = excluded.product_id, slug = excluded.slug, size = excluded.size;`);
  });
  lines.push("");
}

lines.push("commit;");
writeFileSync(new URL("../supabase/migrations/002_seed_products.sql", import.meta.url), lines.join("\n") + "\n");
console.log(`Seeded ${products.length} products`);
