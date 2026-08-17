"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef, type ReactNode, type RefObject } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
};

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 1.5,
  blurStrength = 3,
  containerClassName = "",
  textClassName = "",
}: Props) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word inline-block" key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el || reduced) return;
      const scroller = scrollContainerRef?.current ?? window;

      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top bottom",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );

      const wordElements = el.querySelectorAll(".word");
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : "none" },
        {
          ease: "none",
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: "top 90%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [baseOpacity, baseRotation, blurStrength, enableBlur, reduced] },
  );

  return (
    <h2 ref={containerRef} className={containerClassName}>
      <span className={textClassName}>{typeof children === "string" ? splitText : children}</span>
    </h2>
  );
}
