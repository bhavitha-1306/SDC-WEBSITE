"use client";

/**
 * AmbientBackground — subtle animated dot-grid with soft color glows.
 * Used on About / Events / Community pages.
 */
export default function AmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(163,166,255,0.35) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Indigo glow — top-left */}
      <div
        className="ambient-blob"
        style={{
          width: "60vw",
          height: "60vw",
          top: "-10vw",
          left: "-10vw",
          background: "radial-gradient(circle, rgba(96,99,238,0.28) 0%, rgba(96,99,238,0.08) 50%, transparent 70%)",
          animationDuration: "22s",
          animationDelay: "0s",
        }}
      />
      {/* Cyan glow — bottom-right */}
      <div
        className="ambient-blob"
        style={{
          width: "55vw",
          height: "55vw",
          bottom: "-8vw",
          right: "-8vw",
          background: "radial-gradient(circle, rgba(140,231,255,0.20) 0%, rgba(140,231,255,0.06) 50%, transparent 70%)",
          animationDuration: "28s",
          animationDelay: "-8s",
        }}
      />
    </div>
  );
}
