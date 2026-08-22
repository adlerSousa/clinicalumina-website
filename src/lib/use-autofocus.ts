"use client";

import { useEffect, type RefObject } from "react";

export function useAutoFocus(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    ref.current?.focus({ preventScroll: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
