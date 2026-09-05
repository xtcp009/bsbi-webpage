"use client";

import { useEffect } from "react";
import { refreshScrollTriggers } from "@/lib/motion";

export function GsapRefresh() {
  useEffect(() => {
    const refresh = () => refreshScrollTriggers();
    refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
    const id = window.setTimeout(refresh, 400);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return null;
}
