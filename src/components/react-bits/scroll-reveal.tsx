"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { useMotionReady } from "@/components/react-bits/use-motion-ready";

type Props = {
  children: ReactNode;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  tag?: "h1" | "h2" | "h3" | "p";
};

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseRotation = 2,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  tag = "h2",
}: Props) {
  const canAnimate = useMotionReady();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35, margin: "0px 0px -8% 0px" });
  const Tag = tag as ElementType;
  const text = typeof children === "string" ? children : "";
  const words = text.split(/(\s+)/);
  const className = [containerClassName, textClassName].filter(Boolean).join(" ");

  if (!canAnimate || !text) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, index) => {
        if (/^\s+$/.test(word)) return " ";
        return (
          <motion.span
            key={`${word}-${index}`}
            className="inline-block"
            initial={{
              opacity: 0.15,
              y: 16,
              rotate: baseRotation,
              filter: enableBlur ? `blur(${blurStrength}px)` : "none",
            }}
            animate={
              inView
                ? { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }
                : {
                    opacity: 0.15,
                    y: 16,
                    rotate: baseRotation,
                    filter: enableBlur ? `blur(${blurStrength}px)` : "none",
                  }
            }
            transition={{
              duration: 0.7,
              delay: index * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </Tag>
  );
}
