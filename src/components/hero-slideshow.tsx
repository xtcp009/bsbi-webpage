"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import type { HeroSlide } from "@/lib/shulcloud";

const INTERVAL_MS = 11000;

export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = slides.length;
  const current = slides[index] ?? slides[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (count < 2 || reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % count);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, reduceMotion]);

  if (!current) return null;

  return (
    <div
      className="hero-slideshow relative w-full overflow-hidden bg-cream"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        Photographs of Brith Sholom Beth Israel Synagogue
      </p>
      <p className="sr-only" aria-live="polite">
        {current.alt}
      </p>
      {slides.map((slide, i) => (
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          aria-hidden={i !== index}
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            filter: reduceMotion ? "blur(0px)" : i === index ? "blur(0px)" : "blur(8px)",
            scale: i === index ? 1 : 1.015,
          }}
          transition={reduceMotion ? { duration: 0 } : { duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            priority={i === 0}
            quality={80}
            sizes="100vw"
            className="object-contain object-center"
          />
        </motion.div>
      ))}
    </div>
  );
}
