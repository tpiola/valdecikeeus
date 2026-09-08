"use client";

/**
 * Escassez só com estoque real.
 * Sem “X pessoas na sacola” ou números inventados.
 */
export default function ScarcityNote({
  available,
  isLowStock,
}: {
  slug?: string;
  available: number;
  isLowStock?: boolean;
}) {
  const showStock = available > 0 && (isLowStock || available <= 5);
  if (!showStock) return null;

  return (
    <p className="mt-3 text-xs font-medium leading-5 text-stone-600">
      {available === 1
        ? "Última unidade deste tamanho no estoque atual."
        : `${available} unidades deste tamanho no estoque atual.`}
    </p>
  );
}
