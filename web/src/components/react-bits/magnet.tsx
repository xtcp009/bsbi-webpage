"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Magnet({
  children,
  padding = 72,
          magnetStrength = 4,
  className = "",
}: {
  children: ReactNode;
  padding?: number;
  magnetStrength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, on: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const onMove = (event: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const nearX = Math.abs(cx - event.clientX) < box.width / 2 + padding;
      const nearY = Math.abs(cy - event.clientY) < box.height / 2 + padding;

      if (nearX && nearY) {
        setOffset({
          x: (event.clientX - cx) / magnetStrength,
          y: (event.clientY - cy) / magnetStrength,
          on: true,
        });
        return;
      }

      setOffset((prev) => (prev.x === 0 && prev.y === 0 && !prev.on ? prev : { x: 0, y: 0, on: false }));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [magnetStrength, padding]);

  return (
    <div ref={ref} className={className || "inline-block"}>
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: offset.on ? "transform 180ms ease-out" : "transform 420ms ease",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
