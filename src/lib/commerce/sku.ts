/** Build a stable SKU from product slug + size (BR numeração). */
export function buildSku(slug: string, size: number): string {
  const clean = slug
    .toUpperCase()
    .split(/[^A-Z0-9]+/)
    .filter(Boolean)
    .join("-");
  return `KEEUS-${clean}-${size}`;
}

/** Distribute total stock across sizes (deterministic, remainder on middle sizes). */
export function distributeStock(total: number, sizes: number[]): number[] {
  if (sizes.length === 0) return [];
  const base = Math.floor(total / sizes.length);
  const remainder = total % sizes.length;
  const mid = Math.floor(sizes.length / 2);
  return sizes.map((_, i) => {
    // Spread remainder around the middle of the size curve
    const offset = Math.abs(i - mid);
    const rank = sizes
      .map((_, j) => Math.abs(j - mid))
      .sort((a, b) => a - b)
      .indexOf(offset);
    // Give extra units to sizes closest to mid first
    const extras = sizes
      .map((_, j) => ({ j, d: Math.abs(j - mid) }))
      .sort((a, b) => a.d - b.d || a.j - b.j)
      .slice(0, remainder)
      .map((x) => x.j);
    return base + (extras.includes(i) ? 1 : 0);
  });
}
