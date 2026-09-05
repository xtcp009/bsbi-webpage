"use client";

import { motion, useInView } from "motion/react";
import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { useMotionReady } from "@/components/react-bits/use-motion-ready";

type AnimatedContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  delay?: number;
};

export default function AnimatedContent({
  children,
  distance = 28,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  delay = 0,
  className = "",
}: AnimatedContentProps) {
  const canAnimate = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -8% 0px" });
  const offset = reverse ? -distance : distance;
  const hidden = direction === "horizontal" ? { opacity: 0, x: offset } : { opacity: 0, y: offset };

  if (!canAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : hidden}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
