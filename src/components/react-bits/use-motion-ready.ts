"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function useMotionReady() {
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setReady(true);
  }, []);

  return ready && reduceMotion === false;
}
