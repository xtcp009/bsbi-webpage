"use client";

import { type ReactElement, type ReactNode, useEffect, useRef, useState } from "react";
import { haptic, type HapticKind } from "@/lib/haptic";

type SwitchProps = {
  kind?: HapticKind;
  onActivate?: () => void;
};

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarse(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return coarse;
}

function activateHost(input: HTMLInputElement, onActivate?: () => void) {
  if (onActivate) {
    onActivate();
    return;
  }

  const sibling = input.previousElementSibling;
  if (sibling instanceof HTMLElement) {
    sibling.click();
    return;
  }

  const parent = input.parentElement;
  if (parent?.tagName === "SUMMARY") {
    const details = parent.parentElement;
    if (details instanceof HTMLDetailsElement) {
      details.open = !details.open;
    }
    return;
  }

  if (parent instanceof HTMLElement) parent.click();
}

export function HapticSwitch({ kind = "light", onActivate }: SwitchProps) {
  const coarse = useCoarsePointer();

  if (!coarse) return null;

  return (
    <input
      type="checkbox"
      className="haptic-native"
      tabIndex={-1}
      aria-hidden
      ref={(node) => {
        node?.setAttribute("switch", "");
      }}
      onPointerDown={() => haptic(kind)}
      onClick={(event) => {
        event.stopPropagation();
        activateHost(event.currentTarget, onActivate);
      }}
    />
  );
}

export function HapticHit({
  children,
  kind = "light",
  className,
  onActivate,
}: SwitchProps & {
  children: ReactElement;
  className?: string;
}) {
  return (
    <span className={`haptic-hit${onActivate ? " haptic-hit-toggle" : ""}${className ? ` ${className}` : ""}`}>
      {children}
      <HapticSwitch kind={kind} onActivate={onActivate} />
    </span>
  );
}

export function HapticSummary({
  children,
  className,
  kind = "light",
}: {
  children: ReactNode;
  className?: string;
  kind?: HapticKind;
}) {
  const summaryRef = useRef<HTMLElement>(null);

  return (
    <summary ref={summaryRef} className={`haptic-hit${className ? ` ${className}` : ""}`}>
      {children}
      <HapticSwitch
        kind={kind}
        onActivate={() => {
          const details = summaryRef.current?.parentElement;
          if (details instanceof HTMLDetailsElement) details.open = !details.open;
        }}
      />
    </summary>
  );
}
