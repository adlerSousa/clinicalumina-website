"use client";

import { ChoiceOptions } from "@/components/form/ChoiceOptions";
import { StepFooter } from "@/components/form/StepFooter";
import { StepQuestion, StepShell } from "@/components/form/StepShell";
import { TextArea, FieldError } from "@/components/ui/Field";
import type { Step } from "@/config/form";

type Props = {
  step: Extract<Step, { kind: "choice" }>;
  value: string;
  followUpValue: string;
  error?: string;
  number: number;
  onChange: (value: string) => void;
  onFollowUpChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function ChoiceStep({
  step,
  value,
  followUpValue,
  error,
  number,
  onChange,
  onFollowUpChange,
  onNext,
  onBack,
}: Props) {
  const showFollowUp =
    step.followUp && value && step.followUp.showWhen.includes(value);

  return (
    <StepShell number={number}>
      <StepQuestion help={step.help}>{step.question}</StepQuestion>

      <div className="mt-8">
        <ChoiceOptions
          options={step.options}
          value={value}
          label={step.question}
          onChange={onChange}
        />
      </div>

      {showFollowUp && step.followUp && (
        <div className="step-enter-up mt-7">
          <TextArea
            rows={2}
            value={followUpValue}
            maxLength={step.followUp.maxLength}
            placeholder={step.followUp.placeholder}
            aria-label={step.followUp.label}
            onChange={(e) => onFollowUpChange(e.target.value)}
          />
        </div>
      )}

      <FieldError>{error}</FieldError>

      <StepFooter onNext={onNext} onBack={onBack} />
    </StepShell>
  );
}
