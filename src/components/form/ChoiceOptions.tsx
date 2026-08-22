"use client";

import { useEffect } from "react";

import { cn } from "@/lib/utils";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

type Option = { value: string; label: string };

export function ChoiceOptions({
  options,
  value,
  label,
  onChange,
}: {
  options: readonly Option[];
  value: string;
  label: string;
  onChange: (value: string) => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        return;
      }
      const index = LETTERS.indexOf(e.key.toUpperCase());
      if (index >= 0 && index < options.length) {
        e.preventDefault();
        onChange(options[index].value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [options, onChange]);

  return (
    <div role="radiogroup" aria-label={label} className="flex flex-col gap-3">
      {options.map((option, i) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-control group flex min-h-13 items-center gap-4 px-5 py-3.5 text-left",
              "ring-1 backdrop-blur-md transition-all duration-300 ease-[var(--ease-luxe)]",
              selected
                ? "bg-gold-400/25 text-white ring-gold-300"
                : "bg-white/8 text-nude-100 ring-white/20 hover:bg-white/15",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-[3px] text-[11px] font-medium transition-colors",
                selected
                  ? "bg-gold-400 text-nude-900"
                  : "bg-white/15 text-nude-100/80",
              )}
            >
              {LETTERS[i]}
            </span>
            <span className="text-[0.9375rem] sm:text-base">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
