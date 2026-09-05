"use client";

import { motion, useInView } from "motion/react";
import { useRef, type CSSProperties, type ElementType } from "react";
import { useMotionReady } from "@/components/react-bits/use-motion-ready";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: "chars" | "words";
  animateOnMount?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  textAlign?: CSSProperties["textAlign"];
};

export default function SplitText({
  text,
  className = "",
  delay = 70,
  duration = 0.85,
  splitType = "words",
  animateOnMount = false,
  tag = "p",
  textAlign,
}: SplitTextProps) {
  const canAnimate = useMotionReady();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -8% 0px" });
  const Tag = tag as ElementType;
  const style = textAlign ? { textAlign } : undefined;
  const play = Boolean(canAnimate && (animateOnMount || inView));
  const words = text.split(/(\s+)/).filter((part) => part.length > 0);

  if (!canAnimate) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  let unitIndex = 0;

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wordIndex) => {
        if (/^\s+$/.test(word)) {
          return <span key={`space-${wordIndex}`}>{"\u00A0"}</span>;
        }

        const letters = splitType === "chars" ? Array.from(word) : [word];
        return (
          <span key={`${word}-${wordIndex}`} className="inline-block" aria-hidden>
            {letters.map((letter) => {
              const index = unitIndex++;
              return (
                <motion.span
                  key={`${letter}-${index}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  transition={{
                    duration,
                    delay: index * (delay / 1000),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}
