import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "quiet";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-[image:var(--gradient-gold)] text-nude-900 hover:brightness-108",
  ghost: "bg-transparent text-white ring-1 ring-white/40 hover:bg-white/10",
  quiet: "bg-transparent text-nude-200 hover:text-white",
};

export function Button({
  variant = "primary",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "rounded-control inline-flex items-center justify-center gap-2.5",
        "min-h-12 px-9 py-3.5",
        "text-[0.75rem] font-medium uppercase tracking-[0.18em]",
        "transition-all duration-300 ease-[var(--ease-luxe)]",
        "disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:brightness-100",
        variants[variant],
        className,
      )}
    >
      {loading && (
        <span
          aria-hidden
          className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
