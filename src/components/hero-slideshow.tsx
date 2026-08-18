"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/shulcloud";

const INTERVAL_MS = 7000;

export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = slides.length;
  const current = slides[index] ?? slides[0];

  const go = useCallback(
    (next: number) => {
      if (count < 2) return;
      setIndex((next + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return;
    const timer = window.setInterval(() => go(index + 1), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [count, go, index, paused, reduceMotion]);

  if (!current) return null;

  return (
    <figure>
      <div
        className="hero-slideshow relative w-full overflow-hidden bg-parchment"
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false);
          }
        }}
      >
        <p id={labelId} className="sr-only">
          Photographs from the current synagogue website
        </p>
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0"
            aria-hidden={i !== index}
            style={{
              opacity: i === index ? 1 : 0,
              transition: reduceMotion ? "none" : "opacity 700ms ease",
              pointerEvents: i === index ? "auto" : "none",
            }}
          >
            <Image
              src={slide.src}
              alt={i === index ? slide.alt : ""}
              fill
              priority={i === 0}
              quality={75}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-contain object-center"
            />
          </div>
        ))}

        {count > 1 ? (
          <>
            <button
              type="button"
              className="hero-slideshow-nav left-3"
              aria-label="Previous photograph"
              onClick={() => go(index - 1)}
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              className="hero-slideshow-nav right-3"
              aria-label="Next photograph"
              onClick={() => go(index + 1)}
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`size-2.5 rounded-full border border-ink/40 ${
                    i === index ? "bg-gold" : "bg-parchment/80"
                  }`}
                  aria-label={`Show photograph ${i + 1} of ${count}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
      <figcaption className="museum-caption wrap pt-4">
        {current.alt} · 182 Rutledge Avenue · Charleston, South Carolina
      </figcaption>
    </figure>
  );
}
