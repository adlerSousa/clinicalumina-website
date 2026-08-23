"use client";

import { Carousel } from "@/components/form/Carousel";
import { ChoiceOptions } from "@/components/form/ChoiceOptions";
import { StepFooter } from "@/components/form/StepFooter";
import { StepShell } from "@/components/form/StepShell";
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
      <h2 className="font-display text-balance font-normal tracking-[0.02em] leading-[1.1] text-white text-[clamp(2.375rem,1.7rem+2.8vw,3.5rem)]">
        {step.title}
      </h2>

      <div className="mt-5 space-y-4">
        {step.body.map((paragrafo) => (
          <p
            key={paragrafo.slice(0, 24)}
            className="text-pretty text-[1rem] font-normal leading-relaxed text-nude-100"
          >
            {paragrafo}
          </p>
        ))}
      </div>

      <p className="font-display mt-7 text-balance text-[1.25rem] italic leading-snug text-gold-200">
        {step.highlight}
      </p>

      <div className="mt-8">
        <Carousel photos={step.photos} />
      </div>

      <div className="mt-8">
        <ChoiceOptions
          options={step.options}
          value={value}
          label={step.title}
          onChange={onChange}
        />
      </div>

      <FieldError>{error}</FieldError>

      <StepFooter onNext={onNext} onBack={onBack} />
    </StepShell>
  );
}
