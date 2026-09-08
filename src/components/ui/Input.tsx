import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, label, hint, id, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <label className="block text-sm font-medium text-stone-900">
      {label ? <span>{label}</span> : null}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "mt-1.5 w-full min-h-12 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-base font-normal text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 md:text-sm",
          className
        )}
        {...props}
      />
      {hint ? <span className="mt-1 block text-xs font-normal text-stone-500">{hint}</span> : null}
    </label>
  );
});

export default Input;
