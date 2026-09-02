"use client";

import { useRef } from "react";

import { StepQuestion, StepShell } from "@/components/form/StepShell";
import { StepFooter } from "@/components/form/StepFooter";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { TextInput, FieldLabel, FieldError } from "@/components/ui/Field";
import type { Step } from "@/config/form";
import { useAutoFocus } from "@/lib/use-autofocus";

type Props = {
  step: Extract<Step, { kind: "contact" }>;
  name: string;
  whatsapp: string;
  errors: { name?: string; whatsapp?: string; consent?: string; submit?: string };
  consent: boolean;
  onConsentChange: (checked: boolean) => void;
  number: number;
  submitting: boolean;
  botcheck: string;
  onBotcheckChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
};

export function ContactStep({
  step,
  name,
  whatsapp,
  errors,
  number,
  submitting,
  consent,
  onConsentChange,
  botcheck,
  onBotcheckChange,
  onNameChange,
  onWhatsappChange,
  onSubmit,
  onBack,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useAutoFocus(ref);

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  }

  return (
    <StepShell number={number}>
      <p className="overline mb-4 text-gold-300">{step.eyebrow}</p>

      <StepQuestion help={step.help}>{step.question}</StepQuestion>

      <form
        className="mt-8 flex flex-col gap-7"
        onKeyDown={handleKeyDown}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <FieldLabel htmlFor="lead-name">Nome</FieldLabel>
          <TextInput
            ref={ref}
            id="lead-name"
            name="name"
            autoComplete="name"
            placeholder="Como posso te chamar?"
            value={name}
            invalid={Boolean(errors.name)}
            onChange={(e) => onNameChange(e.target.value)}
          />
          <FieldError>{errors.name}</FieldError>
        </div>

        <div>
          <FieldLabel htmlFor="lead-whatsapp">WhatsApp</FieldLabel>
          <TextInput
            id="lead-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            value={whatsapp}
            invalid={Boolean(errors.whatsapp)}
            onChange={(e) => onWhatsappChange(e.target.value)}
          />
          <FieldError>{errors.whatsapp}</FieldError>
        </div>

        {/* Isca anti-spam: invisível para pessoas, atraente para bots.
            Se vier preenchido, submitLead descarta o envio. */}
        <input
          type="text"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={botcheck}
          onChange={(e) => onBotcheckChange(e.target.value)}
          className="absolute left-[-9999px] size-px opacity-0"
        />

        <div>
          <ConsentCheckbox
            checked={consent}
            invalid={Boolean(errors.consent)}
            onChange={onConsentChange}
          />
          <FieldError>{errors.consent}</FieldError>
        </div>

        <FieldError>{errors.submit}</FieldError>
      </form>

      <StepFooter
        onNext={onSubmit}
        onBack={onBack}
        nextLabel={step.cta}
        loading={submitting}
      />
    </StepShell>
  );
}
