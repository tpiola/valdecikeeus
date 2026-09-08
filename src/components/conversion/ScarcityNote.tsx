"use client";

/** Escassez só com estoque real do tamanho (<=3). Sem números inventados. */
export default function ScarcityNote({
  available,
}: {
  slug?: string;
  available: number;
  isLowStock?: boolean;
}) {
  if (available <= 0 || available > 3) return null;
  return (
    <p className="mt-3 text-xs font-medium leading-5 text-stone-600">
      {available === 1 ? "Resta 1 unidade deste tamanho." : `Restam ${available} deste tamanho.`}
    </p>
  );
}
