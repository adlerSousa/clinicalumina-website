import { cn } from "@/lib/utils";

const base = cn(
  "w-full bg-transparent border-0 border-b border-white/30",
  "px-0 py-3 text-white placeholder:text-nude-200/40",
  "transition-colors duration-300 ease-[var(--ease-luxe)]",
  "focus:border-gold-300 focus:outline-none focus:ring-0",
  "focus:shadow-[0_1px_0_0_var(--color-gold-300)]",
);

const fluid = "text-[clamp(1.0625rem,0.95rem+0.6vw,1.375rem)]";

export function TextInput({
  className,
  invalid,
  ...props
}: React.ComponentPropsWithRef<"input"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        base,
        fluid,
        invalid && "border-[var(--color-danger)]",
        className,
      )}
    />
  );
}

export function TextArea({
  className,
  invalid,
  ...props
}: React.ComponentPropsWithRef<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        base,
        fluid,
        "resize-none leading-relaxed",
        invalid && "border-[var(--color-danger)]",
        className,
      )}
    />
  );
}

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="overline mb-2 block text-gold-300/85">
      {children}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 text-sm text-[#e9a99e]">
      {children}
    </p>
  );
}
