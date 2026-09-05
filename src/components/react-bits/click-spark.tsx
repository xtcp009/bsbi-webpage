"use client";

import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

export default function ClickSpark({
  children,
  sparkColor = "#9b7846",
  sparkSize = 8,
  sparkRadius = 22,
  sparkCount = 10,
  duration = 460,
  extraScale = 1,
}: {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  extraScale?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const frameRef = useRef(0);
  const runningRef = useRef(false);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const draw = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        runningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const eased = 1 - (1 - elapsed / duration) ** 2;
        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);
        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        return true;
      });

      if (sparksRef.current.length > 0) {
        frameRef.current = requestAnimationFrame(draw);
      } else {
        runningRef.current = false;
      }
    },
    [duration, extraScale, sparkColor, sparkRadius, sparkSize],
  );

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const now = performance.now();
    sparksRef.current.push(
      ...Array.from({ length: sparkCount }, (_, i) => ({
        x: event.clientX,
        y: event.clientY,
        angle: (2 * Math.PI * i) / sparkCount + Math.PI / sparkCount,
        startTime: now,
      })),
    );

    if (!runningRef.current) {
      runningRef.current = true;
      frameRef.current = requestAnimationFrame(draw);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col" onClick={onClick}>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[200]" aria-hidden />
      {children}
    </div>
  );
}
