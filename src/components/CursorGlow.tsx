"use client";

import { useEffect, useRef } from "react";

/**
 * A soft gradient orb that follows the mouse cursor.
 * Rendered fixed at z-index 0 so it sits behind all content.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number;
    let cx = -999, cy = -999;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };

    const loop = () => {
      if (el) {
        el.style.transform = `translate(${cx - 250}px, ${cy - 250}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1,
        background:
          "radial-gradient(circle, rgba(255,61,110,.055) 0%, rgba(249,115,22,.03) 45%, transparent 72%)",
        transition: "opacity .3s",
        willChange: "transform",
      }}
    />
  );
}
