"use client";

import { Button } from "@/components/ui/Button";

export function StepFooter({
  onNext,
  onBack,
  nextLabel = "Continuar",
  loading = false,
}: {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  loading?: boolean;
}) {
  return (
    <div className="mt-9 flex items-center gap-5">
      <Button onClick={onNext} loading={loading}>
        {nextLabel}
      </Button>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="ml-auto py-2 text-[0.6875rem] uppercase tracking-[0.18em] text-nude-200/50 transition-colors hover:text-white"
        >
          ← Voltar
        </button>
      )}
    </div>
  );
}
