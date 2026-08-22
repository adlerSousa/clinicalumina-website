"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { GalleryPhoto } from "@/config/form";
import { cn } from "@/lib/utils";

export function Carousel({ photos }: { photos: GalleryPhoto[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const alvo = Math.max(0, Math.min(photos.length - 1, i));
    track.scrollTo({ left: alvo * track.clientWidth, behavior: "smooth" });
  }, [photos.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function onScroll() {
      if (!track || track.clientWidth === 0) return;
      setIndex(Math.round(track.scrollLeft / track.clientWidth));
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        return;
      }
      if (e.key === "ArrowRight") scrollTo(index + 1);
      if (e.key === "ArrowLeft") scrollTo(index - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, scrollTo]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-roledescription="carrossel"
        aria-label="Resultados de pacientes"
      >
        {photos.map((foto, i) => (
          <div
            key={foto.src}
            className="relative aspect-square w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${photos.length}`}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 1024px) 38rem, 100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              className="rounded-control object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollTo(index - 1)}
        disabled={index === 0}
        aria-label="Resultado anterior"
        className={arrow("left-2")}
      >
        <Chevron dir="left" />
      </button>

      <button
        type="button"
        onClick={() => scrollTo(index + 1)}
        disabled={index === photos.length - 1}
        aria-label="Próximo resultado"
        className={arrow("right-2")}
      >
        <Chevron dir="right" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2">
        {photos.map((foto, i) => (
          <button
            key={foto.src}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Ir para o resultado ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-1 rounded-full transition-all duration-300 ease-[var(--ease-luxe)]",
              i === index ? "w-6 bg-gold-400" : "w-2 bg-white/30 hover:bg-white/50",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function arrow(side: string) {
  return cn(
    "absolute top-[calc(50%-1.25rem)] grid size-10 place-items-center",
    "text-white [filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.85))]",
    "transition-opacity duration-300 hover:opacity-70",
    "disabled:pointer-events-none disabled:opacity-0",
    side,
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", dir === "left" && "rotate-180")}
      aria-hidden
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}
