"use client";

import { useRef } from "react";

import { StepFooter } from "@/components/form/StepFooter";
import { StepQuestion, StepShell } from "@/components/form/StepShell";
import { TextArea, FieldError } from "@/components/ui/Field";
import type { Step } from "@/config/form";
import { useAutoFocus } from "@/lib/use-autofocus";

type Props = {
  step: Extract<Step, { kind: "text" }>;
  value: string;
  error?: string;
  number: number;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function TextStep({
  step,
  value,
  error,
  number,
  onChange,
  onNext,
  onBack,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useAutoFocus(ref, [step.id]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onNext();
    }
  }

  return (
    <StepShell number={number}>
      <StepQuestion help={step.help}>{step.question}</StepQuestion>

      <div className="mt-8">
        <TextArea
          ref={ref}
          id={step.id}
          rows={2}
          value={value}
          maxLength={step.maxLength}
          placeholder={step.placeholder}
          invalid={Boolean(error)}
          aria-label={step.question}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FieldError>{error}</FieldError>
      </div>

      <StepFooter onNext={onNext} onBack={onBack} />
    </StepShell>
  );
}
