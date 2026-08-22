import type { Metadata } from "next";

import { LogoIcon } from "@/components/brand/Logo";
import { EvaluationForm } from "@/components/form/EvaluationForm";
import { FormBackground } from "@/components/form/FormBackground";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Avaliação personalizada",
  description: `Responda algumas perguntas rápidas e receba o retorno da ${site.name}. Leva 1 minuto.`,
  robots: { index: false, follow: true },
};

export default function AvaliacaoPage() {
  return (
    <main
      className="relative isolate flex h-dvh flex-col overflow-hidden bg-nude-900"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <FormBackground />

      <header className="relative z-10 shrink-0 px-5 pt-4 sm:px-8 sm:pt-6 lg:px-10 lg:pt-11">
        <LogoIcon priority className="w-9 sm:w-10 lg:w-16" />
      </header>

      <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex min-h-full items-center py-6 sm:py-10">
          <EvaluationForm />
        </div>
      </div>

      <footer className="relative z-10 shrink-0 px-5 pb-4 text-center sm:px-8 sm:pb-6">
        <p className="text-[0.6875rem] tracking-wide text-nude-200/40">
          {site.doctor.fullName}
          {site.doctor.credentials ? ` · ${site.doctor.credentials}` : ""}
        </p>
      </footer>
    </main>
  );
}
