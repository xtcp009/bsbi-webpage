export type HapticKind = "light" | "medium" | "success";

const patterns: Record<HapticKind, number | number[]> = {
  light: 10,
  medium: 16,
  success: [10, 28, 14],
};

let lastAt = 0;

export function haptic(kind: HapticKind = "light") {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.matchMedia("(pointer: coarse)").matches) return;

  const now = performance.now();
  if (now - lastAt < 40) return;
  lastAt = now;

  try {
    navigator.vibrate?.(patterns[kind]);
  } catch {
    // iOS has no Vibration API; the native switch overlay in HapticHit covers that path.
  }
}
