"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMotionReady } from "@/components/react-bits/use-motion-ready";

export default function FadeContent({
  children,
  className = "",
  delay = 0,
  y = 22,
  duration = 0.85,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  blur?: boolean;
}) {
  const canAnimate = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12, margin: "0px 0px -8% 0px" });

  if (!canAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
