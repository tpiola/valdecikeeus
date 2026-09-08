import clsx from "clsx";

export default function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "dark" | "muted";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-block px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white",
        tone === "accent" && "bg-[var(--accent)]",
        tone === "dark" && "bg-[var(--foreground)]",
        tone === "muted" && "bg-stone-500",
        className
      )}
    >
      {children}
    </span>
  );
}
