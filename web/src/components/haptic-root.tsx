"use client";

import { useEffect } from "react";
import { haptic } from "@/lib/haptic";

const CONTROL =
  "a.button-primary, a.button-secondary, a.header-give, a.header-chip, a.nav-drawer-link, a.nav-link, a.text-link, button, summary, [role='button'], input[type='submit'], input[type='button'], nav[aria-label='Quick actions'] a, nav[aria-label='Social'] a, .footer-search-go, .haptic-hit";

export function HapticRoot() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest(CONTROL)) return;
      haptic("light");
    };

    document.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown, { capture: true });
  }, []);

  return null;
}
