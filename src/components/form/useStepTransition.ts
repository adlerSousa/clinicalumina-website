"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "forward" | "back";

export function useStepTransition(exitMs: number) {
  const [rendered, setRendered] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [direction, setDirection] = useState<Direction>("forward");

  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const go = useCallback(
    (next: number, dir: Direction) => {
      if (busy.current) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setDirection(dir);

      if (reduced) {
        setRendered(next);
        return;
      }

      busy.current = true;
      setExiting(true);

      timer.current = setTimeout(() => {
        setRendered(next);
        setExiting(false);
        busy.current = false;
      }, exitMs);
    },
    [exitMs],
  );

  const jumpTo = useCallback((index: number) => {
    setRendered(index);
  }, []);

  const animationClass = exiting
    ? direction === "forward"
      ? "step-exit-up"
      : "step-exit-down"
    : direction === "forward"
      ? "step-enter-up"
      : "step-enter-down";

  return { rendered, direction, exiting, go, jumpTo, animationClass };
}
