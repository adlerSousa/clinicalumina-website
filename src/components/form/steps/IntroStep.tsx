"use client";

import { LogoLockup } from "@/components/brand/Logo";
import { StepShell } from "@/components/form/StepShell";
import { Button } from "@/components/ui/Button";
import type { Step } from "@/config/form";

export function IntroStep({
  step,
  onStart,
}: {
  step: Extract<Step, { kind: "intro" }>;
  onStart: () => void;
}) {
  return (
    <StepShell className="text-center">
      <LogoLockup
        priority
        className="mx-auto w-[10.5rem] sm:w-[13rem] lg:w-[17.5rem] xl:w-[19rem]"
      />

      <span aria-hidden className="rule-gold mx-auto mt-9" />

      <h1 className="font-display mt-8 text-balance leading-[1.25] text-white text-[clamp(1.625rem,1.15rem+2vw,2.75rem)]">
        {step.title}
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-nude-200/80">
        {step.body}
      </p>

      <p className="mt-6 text-sm text-nude-200/55">{step.meta}</p>

      <div className="mt-9">
        <Button onClick={onStart}>{step.cta}</Button>
      </div>
    </StepShell>
  );
}
