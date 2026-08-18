"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type CSSProperties, type ElementType } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  animateOnMount?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  textAlign?: CSSProperties["textAlign"];
};

export default function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 0.6,
  ease = "power3.out",
  splitType = "words",
  from = { opacity: 0, y: 22, filter: "blur(6px)" },
  to = { opacity: 1, y: 0, filter: "blur(0px)" },
  threshold = 0.1,
  animateOnMount = false,
  tag = "p",
  textAlign,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = tag as ElementType;
  const parts = splitType === "chars" ? Array.from(text) : text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const units = el.querySelectorAll("[data-split]");
      gsap.set(units, from);
      gsap.to(units, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: animateOnMount
          ? undefined
          : {
              trigger: el,
              start: `top ${100 - threshold * 100}%`,
              once: true,
            },
      });
    },
    { scope: ref, dependencies: [text, delay, duration, ease, splitType, animateOnMount] },
  );

  return (
    <Tag ref={ref} className={className} style={textAlign ? { textAlign } : undefined}>
      {parts.map((part, index) => (
        <span key={`${part}-${index}`} data-split style={{ display: "inline-block", willChange: "transform, filter, opacity" }}>
          {part === " " ? "\u00A0" : part}
          {splitType === "words" && index < parts.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </Tag>
  );
}
