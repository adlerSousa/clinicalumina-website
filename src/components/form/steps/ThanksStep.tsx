"use client";

import { StepShell } from "@/components/form/StepShell";
import type { Step } from "@/config/form";
import { site, whatsappLink } from "@/config/site";

export function ThanksStep({
  step,
  name,
}: {
  step: Extract<Step, { kind: "thanks" }>;
  name: string;
}) {
  const firstName = name.trim().split(/\s+/)[0] ?? "";
  const message = `Olá! Já preenchi o formulário. Podemos dar andamento ao meu atendimento com a ${site.doctor.fullName}?`;

  return (
    <StepShell className="text-center">
      <span aria-hidden className="rule-gold mx-auto" />

      <h2 className="font-display mt-7 text-balance leading-[1.25] text-white text-[clamp(1.625rem,1.15rem+2vw,2.75rem)]">
        {firstName ? `${firstName}, obrigada pelas suas respostas!` : step.title}
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.9375rem] leading-relaxed text-nude-200/75">
        {step.body}
      </p>

      <p className="mt-12 text-[0.9375rem] text-nude-200/60">
        {step.priceCaption}
      </p>

      <p className="font-display mt-1 leading-none text-gold-300 text-[clamp(2.75rem,2rem+3vw,4rem)]">
        {site.consultation.price}
      </p>

      <p className="mx-auto mt-4 max-w-xs text-pretty text-[0.8125rem] leading-relaxed text-nude-200/50">
        {step.priceNote}
      </p>

      <div className="mt-11">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-control inline-flex min-h-12 items-center justify-center bg-[image:var(--gradient-gold)] px-9 py-3.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-nude-900 transition-all duration-300 ease-[var(--ease-luxe)] hover:brightness-108"
        >
          {step.cta}
        </a>
      </div>

      <p className="mx-auto mt-5 max-w-xs text-pretty text-xs leading-relaxed text-nude-200/40">
        {step.nextStep}
      </p>
    </StepShell>
  );
}
