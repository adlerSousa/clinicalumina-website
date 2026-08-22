import { cn } from "@/lib/utils";

export function StepShell({
  number,
  children,
  className,
}: {
  number?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[33rem] px-6 sm:px-8 lg:max-w-[38rem]",
        className,
      )}
    >
      {number !== undefined && (
        <div className="mb-5 flex items-center gap-3 text-gold-300">
          <span className="font-display text-lg tabular-nums">
            {String(number).padStart(2, "0")}
          </span>
          <span aria-hidden className="h-px w-8 bg-gold-300/45" />
        </div>
      )}
      {children}
    </div>
  );
}

export function StepQuestion({
  children,
  help,
}: {
  children: React.ReactNode;
  help?: string;
}) {
  return (
    <>
      <h2 className="font-display text-balance leading-[1.25] text-white text-[clamp(1.5rem,1.1rem+1.7vw,2.25rem)]">
        {children}
      </h2>
      {help && (
        <p className="mt-3 text-pretty text-sm leading-relaxed text-nude-200/70">
          {help}
        </p>
      )}
    </>
  );
}
