"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

export function ConsentCheckbox({
  checked,
  invalid,
  onChange,
}: {
  checked: boolean;
  invalid?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      htmlFor="lead-consent"
      className="flex cursor-pointer items-start gap-3 py-1"
    >
      <input
        id="lead-consent"
        type="checkbox"
        checked={checked}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />

      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-[3px] ring-1 transition-colors duration-200",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-300",
          checked
            ? "bg-gold-400 ring-gold-300"
            : invalid
              ? "bg-transparent ring-[#e9a99e]"
              : "bg-white/10 ring-white/35",
        )}
      >
        {checked && (
          <svg viewBox="0 0 20 20" className="size-3.5 text-nude-900" aria-hidden>
            <path
              d="m4 10 4 4 8-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      <span className="text-xs leading-relaxed text-nude-200/70">
        Autorizo o contato da equipe e o tratamento das minhas respostas,
        inclusive as relacionadas a procedimentos estéticos, conforme a{" "}
        <Link
          href="/privacidade"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-gold-300 underline underline-offset-2 hover:text-gold-200"
        >
          Política de Privacidade
        </Link>
        .
      </span>
    </label>
  );
}
