"use client";

import { useEffect, useRef } from "react";

const CODE_SNIPPETS = [
  "fn main() {",
  "import React",
  "func main()",
  "const App = () =>",
  'println!("Hello")',
  "go routine()",
  "useEffect(() =>",
  "impl Component {",
];

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Matrix rain ---
    const fontSize = 16;
    let drops: number[] = [];

    function resize() {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      canvas!.width = viewportWidth;
      canvas!.height = viewportHeight;
      drops = new Array(Math.floor(viewportWidth / fontSize)).fill(1);
    }
    resize();
    window.addEventListener("resize", resize);

    function drawMatrix() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(14, 14, 14, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#6063ee";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    }

    // --- Floating code snippets ---
    function createSnippet() {
      if (!container) return;
      const div = document.createElement("div");
      const isMobile = window.innerWidth < 640;
      div.style.cssText = `
        position: absolute;
        font-family: monospace;
        font-size: ${Math.random() * (isMobile ? 2 : 4) + (isMobile ? 9 : 10)}px;
        color: #8ce7ff;
        opacity: 0;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1;
        filter: blur(0.5px);
        left: ${Math.random() * (isMobile ? 78 : 90)}%;
        animation: float-code ${Math.random() * 10 + 10}s linear forwards;
      `;
      div.textContent = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      container.appendChild(div);
      setTimeout(() => div.remove(), 15000);
    }

    // --- Mouse parallax on canvas ---
    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const mx = (e.clientX / window.innerWidth - 0.5) * 20;
      const my = (e.clientY / window.innerHeight - 0.5) * 20;
      canvas.style.transform = `translate(${mx}px, ${my}px)`;
    }

    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove);
    }

    const matrixInterval = setInterval(drawMatrix, 50);
    const snippetInterval = reducedMotion ? null : setInterval(createSnippet, 3000);

    return () => {
      clearInterval(matrixInterval);
      if (snippetInterval) clearInterval(snippetInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
      aria-hidden="true"
      style={{ contain: "layout paint size" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 h-full w-full opacity-20 sm:opacity-25"
      />
      {/* Circuit traces */}
      <div
        className="absolute h-px opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, #6063ee, transparent)",
          width: "clamp(8rem, 28vw, 16rem)",
          top: "20%",
          left: "10%",
          transform: "rotate(45deg)",
        }}
      />
      <div
        className="absolute h-px opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, #6063ee, transparent)",
          width: "clamp(10rem, 34vw, 24rem)",
          top: "60%",
          right: "5%",
          transform: "rotate(-12deg)",
        }}
      />
      <div
        className="absolute h-px opacity-10"
        style={{
          background: "linear-gradient(90deg, transparent, #6063ee, transparent)",
          width: "clamp(6rem, 18vw, 12rem)",
          top: "80%",
          left: "30%",
          transform: "rotate(90deg)",
        }}
      />

      {/* Inject keyframes for floating code snippets */}
      <style>{`
        @keyframes float-code {
          0%   { transform: translateY(100vh) translateX(0); opacity: 0; }
          10%  { opacity: 0.4; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-20vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
