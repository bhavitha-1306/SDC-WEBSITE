"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Highlight } from "@/data/highlights";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  highlights: Highlight[];
}

/**
 * GSAP ScrollTrigger pinned horizontal scroll section.
 * Cards glide left as the user scrolls down — exactly like the ST. Universe style.
 */
export default function HighlightsHScroll({ highlights }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || highlights.length === 0) return;

    const ctx = gsap.context(() => {
      const totalX = track.scrollWidth - wrap.offsetWidth;

      // Scroll distance capped at 60% of total so it doesn't take too long
      const scrollDist = Math.min(totalX, totalX * 0.92);

      gsap.to(track, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${scrollDist * 0.65}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Stagger each card's opacity in
      gsap.fromTo(
        track.querySelectorAll(".hcard"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, [highlights]);

  if (highlights.length === 0) return null;

  return (
    <section className="overflow-hidden" ref={wrapRef}>
      <div className="flex items-center" style={{ height: "100vh" }}>
        {/* Section label — stays pinned on the left */}
        <div className="flex-shrink-0 w-[280px] px-8 hidden lg:block">
          <div className="sec-label mb-3">// SUCCESS STORIES</div>
          <h2 className="sec-title" style={{ fontSize: "1.8rem" }}>
            Student<br />achievements
          </h2>
          <p className="text-[.83rem] mt-3 leading-relaxed" style={{ color: "var(--sub)" }}>
            Winners, interns, and builders who grew through SDC.
          </p>
          <div className="mt-5 text-[.7rem] tracking-wider" style={{ color: "var(--muted)" }}>
            SCROLL TO EXPLORE →
          </div>
        </div>

        {/* Scrolling track */}
        <div ref={trackRef} className="flex gap-6 pl-6 pr-24" style={{ willChange: "transform" }}>
          {highlights.map((h, i) => (
            <div key={i} className="hcard flex-shrink-0" style={{ width: 340 }}>
              <HighlightCardSmall h={h} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Simplified card for horizontal scroll */
function HighlightCardSmall({ h }: { h: Highlight }) {
  return (
    <div
      className="rounded-[18px] p-7 h-full flex flex-col justify-between"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        minHeight: 280,
        transition: "border-color .25s, transform .3s var(--ease-out), box-shadow .3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,61,110,.35)";
        el.style.transform = "translateY(-8px)";
        el.style.boxShadow = "0 24px 50px rgba(0,0,0,.5)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      <div>
        <div className="text-3xl mb-4">{h.positionIcon}</div>
        <p className="text-[.88rem] italic leading-[1.72]" style={{ color: "var(--sub)" }}>
          {h.description}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-[.82rem]"
          style={{ background: h.gradient, flexShrink: 0 }}
        >
          {h.initials}
        </div>
        <div>
          <div className="font-bold text-[.88rem]" style={{ color: "var(--text)" }}>{h.team}</div>
          <div className="text-[.7rem]" style={{ color: "var(--muted)" }}>{h.event}</div>
          <div className="text-[.65rem] mt-0.5" style={{ color: "var(--a1)" }}>
            {h.position} place · {h.eventDate}
          </div>
        </div>
      </div>
    </div>
  );
}
