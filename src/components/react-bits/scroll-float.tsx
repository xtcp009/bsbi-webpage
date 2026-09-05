"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ElementType, type ReactNode } from "react";
import { useMotionReady } from "@/components/react-bits/use-motion-ready";

type ScrollFloatProps = {
  children: ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p";
  duration?: number;
  stagger?: number;
};

export default function ScrollFloat({
  children,
  className = "",
  tag = "h2",
  duration = 0.7,
  stagger = 0.03,
}: ScrollFloatProps) {
  const canAnimate = useMotionReady();
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4, margin: "0px 0px -8% 0px" });
  const Tag = tag as ElementType;
  const text = typeof children === "string" ? children : "";

  if (!canAnimate || !text) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`.trim()} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="scroll-float-char"
          initial={{ opacity: 0, y: "80%" }}
          animate={inView ? { opacity: 1, y: "0%" } : { opacity: 0, y: "80%" }}
          transition={{
            duration,
            delay: index * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
