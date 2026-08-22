export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  return (
    <div
      className="absolute inset-x-0 top-0 z-20 h-0.5 bg-white/15"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label="Progresso da avaliação"
    >
      <div
        className="h-full bg-gold-400 transition-[width] duration-[var(--duration-macro)] ease-[var(--ease-luxe)]"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
