"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ProgressBar } from "@/components/form/ProgressBar";
import { useStepTransition } from "@/components/form/useStepTransition";
import { ChoiceStep } from "@/components/form/steps/ChoiceStep";
import { ContactStep } from "@/components/form/steps/ContactStep";
import { GalleryStep } from "@/components/form/steps/GalleryStep";
import { IntroStep } from "@/components/form/steps/IntroStep";
import { TextStep } from "@/components/form/steps/TextStep";
import { ThanksStep } from "@/components/form/steps/ThanksStep";
import { answerableSteps, steps } from "@/config/form";
import { isValidPhone, maskPhone } from "@/lib/phone";
import { submitLead, type LeadAnswer } from "@/lib/submit-lead";

type Errors = { name?: string; whatsapp?: string; submit?: string };

const EXIT_MS = 220;
const FOLLOW_UP = "__detalhe";

export function EvaluationForm() {
  const { rendered, exiting, go, jumpTo, animationClass } =
    useStepTransition(EXIT_MS);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState<string>();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [botcheck, setBotcheck] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const step = steps[rendered];

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const alvo = Number(
      new URLSearchParams(window.location.search).get("tela"),
    );
    if (Number.isInteger(alvo) && alvo >= 1 && alvo <= steps.length) {
      jumpTo(alvo - 1);
    }
  }, [jumpTo]);

  const questionNumber = useMemo(() => {
    const i = answerableSteps.findIndex((s) => s.id === step.id);
    return i >= 0 ? i + 1 : undefined;
  }, [step.id]);

  const advance = useCallback(
    (to: number, dir: "forward" | "back") => {
      setStepError(undefined);
      go(to, dir);
    },
    [go],
  );

  const back = useCallback(() => {
    if (rendered > 0) advance(rendered - 1, "back");
  }, [rendered, advance]);

  const next = useCallback(() => {
    if (step.kind === "text" && step.required && !answers[step.id]?.trim()) {
      setStepError("Escreva uma resposta para continuar.");
      return;
    }
    if (
      (step.kind === "choice" || step.kind === "gallery") &&
      !answers[step.id]
    ) {
      setStepError("Escolha uma opção para continuar.");
      return;
    }
    advance(rendered + 1, "forward");
  }, [step, answers, rendered, advance]);

  const setAnswer = useCallback((id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setStepError(undefined);
  }, []);

  function collectAnswers(): LeadAnswer[] {
    const out: LeadAnswer[] = [];

    for (const s of steps) {
      if (s.kind === "text") {
        out.push({ label: s.label, value: answers[s.id] ?? "" });
      }

      if (s.kind === "choice" || s.kind === "gallery") {
        const chosen = s.options.find((o) => o.value === answers[s.id]);
        out.push({ label: s.label, value: chosen?.label ?? "" });
      }

      if (s.kind === "choice" && s.followUp) {
        const detail = answers[s.id + FOLLOW_UP];
        if (detail?.trim()) {
          out.push({ label: s.followUp.label, value: detail });
        }
      }
    }

    return out;
  }

  async function handleSubmit() {
    const nextErrors: Errors = {};
    if (name.trim().length < 2) {
      nextErrors.name = "Precisamos do seu nome para continuar.";
    }
    if (!isValidPhone(whatsapp)) {
      nextErrors.whatsapp = "Digite um WhatsApp válido com DDD.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await submitLead({
      name: name.trim(),
      whatsapp,
      answers: collectAnswers(),
      botcheck,
    });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ submit: result.error });
      return;
    }

    advance(rendered + 1, "forward");
  }

  const showProgress = step.kind !== "intro" && step.kind !== "thanks";

  return (
    <>
      {showProgress && (
        <ProgressBar
          current={questionNumber ?? 0}
          total={answerableSteps.length}
        />
      )}

      <div
        key={`${step.id}-${exiting ? "out" : "in"}`}
        aria-hidden={exiting || undefined}
        className={`w-full ${animationClass}`}
      >
        {step.kind === "intro" && (
          <IntroStep
            step={step}
            onStart={() => advance(rendered + 1, "forward")}
          />
        )}

        {step.kind === "gallery" && (
          <GalleryStep
            step={step}
            value={answers[step.id] ?? ""}
            error={stepError}
            number={questionNumber ?? 1}
            onChange={(v) => setAnswer(step.id, v)}
            onNext={next}
            onBack={back}
          />
        )}

        {step.kind === "text" && (
          <TextStep
            step={step}
            value={answers[step.id] ?? ""}
            error={stepError}
            number={questionNumber ?? 1}
            onChange={(v) => setAnswer(step.id, v)}
            onNext={next}
            onBack={back}
          />
        )}

        {step.kind === "choice" && (
          <ChoiceStep
            step={step}
            value={answers[step.id] ?? ""}
            followUpValue={answers[step.id + FOLLOW_UP] ?? ""}
            error={stepError}
            number={questionNumber ?? 1}
            onChange={(v) => setAnswer(step.id, v)}
            onFollowUpChange={(v) => setAnswer(step.id + FOLLOW_UP, v)}
            onNext={next}
            onBack={back}
          />
        )}

        {step.kind === "contact" && (
          <ContactStep
            step={step}
            name={name}
            whatsapp={whatsapp}
            botcheck={botcheck}
            errors={errors}
            number={questionNumber ?? 1}
            submitting={submitting}
            onBotcheckChange={setBotcheck}
            onNameChange={(v) => {
              setName(v);
              setErrors((e) => ({ ...e, name: undefined }));
            }}
            onWhatsappChange={(v) => {
              setWhatsapp(maskPhone(v));
              setErrors((e) => ({ ...e, whatsapp: undefined }));
            }}
            onSubmit={handleSubmit}
            onBack={back}
          />
        )}

        {step.kind === "thanks" && <ThanksStep step={step} name={name} />}
      </div>
    </>
  );
}
