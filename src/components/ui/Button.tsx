import { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:bg-[color-mix(in_srgb,var(--accent)_45%,white)] disabled:text-white",
  secondary:
    "border border-[var(--border-mid)] bg-transparent text-[var(--foreground)] hover:border-[var(--foreground)]",
  ghost: "bg-transparent text-[var(--foreground-mid)] hover:bg-[var(--surface)]",
  dark: "bg-[#1a1a1a] text-white hover:bg-black",
};

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

export default Button;
