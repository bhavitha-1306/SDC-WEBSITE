"use client";

import { useEffect, useRef } from "react";

/**
 * Thin gradient progress bar pinned to the top of the viewport.
 * Driven by native scroll position (works with Lenis via its scroll events).
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[400]"
      style={{ height: 2, background: "rgba(255,255,255,.05)" }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background: "var(--grad)",
          transition: "width .05s linear",
        }}
      />
    </div>
  );
}
