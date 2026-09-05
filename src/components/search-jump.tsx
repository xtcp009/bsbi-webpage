"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HapticHit } from "@/components/haptic-hit";

function contentChildren(root: HTMLElement): HTMLElement[] {
  return [...root.children].filter(
    (child): child is HTMLElement => child instanceof HTMLElement && !child.classList.contains("search-banner"),
  );
}

function findDeepest(root: HTMLElement, needle: string): HTMLElement | null {
  const lower = needle.toLowerCase();
  const start = contentChildren(root).find((child) => child.textContent?.toLowerCase().includes(lower));
  if (!start) return null;

  let current: HTMLElement = start;
  while (true) {
    const next = [...current.children].find((child) => child.textContent?.toLowerCase().includes(lower));
    if (!(next instanceof HTMLElement) || next === current) return current;
    current = next;
  }
}

export function SearchJump() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();
  const term = params.get("q")?.trim() ?? "";
  const [found, setFound] = useState(true);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!(main instanceof HTMLElement) || term.length < 2) return;

    let cancelled = false;
    let scrolled = false;
    const run = () => {
      if (cancelled) return;
      const target = findDeepest(main, term);
      setFound(Boolean(target));
      if (target && !scrolled) {
        scrolled = true;
        target.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    };

    const timers = [0, 250, 700, 1400].map((ms) => window.setTimeout(run, ms));
    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname, term]);

  if (term.length < 2) return null;

  function dismiss() {
    const next = new URLSearchParams(params.toString());
    next.delete("q");
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="search-banner" role="status">
      <p>
        {found ? "This page mentions" : "Opened this page for"} “{term}”
      </p>
      <HapticHit className="inline-flex">
        <button type="button" onClick={dismiss}>
          Dismiss
        </button>
      </HapticHit>
    </div>
  );
}
