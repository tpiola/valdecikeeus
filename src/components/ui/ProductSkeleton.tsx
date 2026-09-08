/** Lightweight grid placeholder — avoids flash of empty layout. */
export default function ProductSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="keeus-skeleton aspect-square w-full" />
          <div className="mt-4 h-3 w-1/3 keeus-skeleton" />
          <div className="mt-2 h-4 w-2/3 keeus-skeleton" />
          <div className="mt-3 h-5 w-1/2 keeus-skeleton" />
        </div>
      ))}
    </div>
  );
}
