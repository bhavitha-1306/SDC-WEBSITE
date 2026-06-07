"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;   // e.g. "2500+" or "50+"
  label: string;
  delay?: number;  // ms stagger
}

function parseNumber(v: string) {
  return parseInt(v.replace(/\D/g, ""), 10) || 0;
}
function suffix(v: string) {
  return v.replace(/[\d,]/g, "");
}

/**
 * Counts from 0 → target when the element enters the viewport.
 */
export default function AnimatedCounter({ value, label, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setStarted(true); io.unobserve(el); }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const target = parseNumber(value);
    if (target === 0) { setDisplay(0); return; }

    let start: number | null = null;
    const duration = 1400 + delay;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    const timer = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(timer);
  }, [started, value, delay]);

  const suf = suffix(value);

  return (
    <div ref={ref} className="text-center">
      <div
        className="gtext font-extrabold text-[2.4rem] leading-none tabular-nums"
        style={{ fontFamily: "var(--font-helv)" }}
      >
        {display.toLocaleString()}{suf}
      </div>
      <div className="text-[.72rem] mt-1.5 tracking-widest" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </div>
  );
}
