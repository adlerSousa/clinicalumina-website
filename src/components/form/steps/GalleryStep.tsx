"use client";

import { Carousel } from "@/components/form/Carousel";
import { ChoiceOptions } from "@/components/form/ChoiceOptions";
import { StepFooter } from "@/components/form/StepFooter";
import { StepQuestion, StepShell } from "@/components/form/StepShell";
import { FieldError } from "@/components/ui/Field";
import type { Step } from "@/config/form";

type Props = {
  step: Extract<Step, { kind: "gallery" }>;
  value: string;
  error?: string;
  number: number;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export function GalleryStep({
  step,
  value,
  error,
  number,
  onChange,
  onNext,
  onBack,
}: Props) {
  return (
    <StepShell number={number}>
      <StepQuestion help={step.help}>{step.question}</StepQuestion>

      <div className="mt-7">
        <Carousel photos={step.photos} />
      </div>

      <div className="mt-7">
        <ChoiceOptions
          options={step.options}
          value={value}
          label={step.question}
          onChange={onChange}
        />
      </div>

      <FieldError>{error}</FieldError>

      <StepFooter onNext={onNext} onBack={onBack} />
    </StepShell>
  );
}
