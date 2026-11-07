"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const FONT_SIZE = 14;
const COLUMN_WIDTH = 12;
const TRAIL_LENGTH = 10;

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let frame = 0;
    let lastFrameAt = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drops = Array.from({ length: Math.ceil(width / COLUMN_WIDTH) }, () => Math.random() * height);
    };

    const draw = (time: number) => {
      if (!reducedMotion && time - lastFrameAt < 40) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrameAt = time;
      context.clearRect(0, 0, width, height);
      context.font = `${FONT_SIZE}px monospace`;
      context.textBaseline = "top";

      drops.forEach((head, column) => {
        for (let segment = 0; segment < TRAIL_LENGTH; segment += 1) {
          const y = head - segment * FONT_SIZE;
          if (y < -FONT_SIZE || y > height) continue;
          context.fillStyle = segment === 0
            ? "rgba(220, 252, 231, .95)"
            : `rgba(34, 197, 94, ${(1 - segment / TRAIL_LENGTH) * 0.68})`;
          context.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], column * COLUMN_WIDTH, y);
        }
        if (!reducedMotion) {
          drops[column] = head > height + TRAIL_LENGTH * FONT_SIZE && Math.random() > 0.975
            ? -Math.random() * height * 0.5
            : head + 5;
        }
      });

      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(1000);
    });
    observer.observe(canvas);
    resize();
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-screen" />;
}
