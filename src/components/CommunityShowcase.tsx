"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "./AnimatedCounter";

gsap.registerPlugin(ScrollTrigger);

const PHOTOS = [
  { src: "/assets/blog/event.jpeg",       alt: "SDC Event",    col: "col-span-2", row: "" },
  { src: "/assets/blog/community-group.jpg", alt: "SDC Community Group", col: "",            row: "" },
  { src: "/assets/blog/community-1.jpeg", alt: "Community",    col: "",            row: "" },
  { src: "/assets/blog/community-2.jpeg", alt: "Members",      col: "",            row: "" },
  { src: "/assets/blog/community-3.jpeg", alt: "Workshop",     col: "",            row: "" },
  { src: "/assets/blog/snist.jpeg",       alt: "SNIST Campus", col: "col-span-2",  row: "" },
];

/**
 * Community showcase — matching the StudentTribe.in community section layout:
 * Left: staggered masonry photo grid with GSAP clip-path reveals
 * Right: #1 card + giant gradient community counter + two smaller stat cards
 */
export default function CommunityShowcase() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const items = grid.querySelectorAll<HTMLDivElement>(".sc-photo");

      items.forEach((el, i) => {
        // Clip-path reveal: wipes left→right
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            delay: i * 0.09,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );

        // Inner image Ken-Burns zoom-out
        const img = el.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.14 },
            {
              scale: 1,
              duration: 1.3,
              ease: "power3.out",
              delay: i * 0.09,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        }
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Section header */}
        <div className="reveal mb-12" ref={(el) => {
          if (!el) return;
          const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } }, { threshold: 0.15 });
          io.observe(el);
        }}>
          <div className="sec-label mb-2">// COMMUNITY SHOWCASE</div>
          <h2 className="sec-title">Our growing community</h2>
          <p className="sec-sub">Events, hackathons, and real moments — all captured here.</p>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* LEFT — masonry photo grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-3"
            style={{ gridAutoRows: "185px" }}
          >
            {PHOTOS.map((p, i) => (
              <div
                key={i}
                className={`sc-photo relative overflow-hidden rounded-[14px] ${p.col}`}
                style={{ background: "var(--card)" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 30vw"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,.22), rgba(255,61,110,.18))",
                  }}
                />
              </div>
            ))}
          </div>

          {/* RIGHT — stat cards */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">

            {/* #1 card */}
            <div
              className="reveal rounded-[18px] p-6 flex items-center gap-5"
              style={{ background: "var(--card)", border: "1px solid var(--border)", transition: "border-color .25s, transform .25s var(--ease-out), box-shadow .25s" }}
              ref={(el) => {
                if (!el) return;
                const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } }, { threshold: 0.2 });
                io.observe(el);
                el.addEventListener("mouseenter", () => { el.style.transform = "translateY(-5px)"; el.style.borderColor = "rgba(255,61,110,.35)"; el.style.boxShadow = "0 20px 40px rgba(0,0,0,.2)"; });
                el.addEventListener("mouseleave", () => { el.style.transform = ""; el.style.borderColor = ""; el.style.boxShadow = ""; });
              }}
            >
              <span style={{ fontSize: "2.5rem", lineHeight: 1 }}>🏆</span>
              <div>
                <div className="gtext font-extrabold" style={{ fontSize: "2.2rem", lineHeight: 1 }}>#1</div>
                <div className="text-[.9rem] font-medium mt-0.5" style={{ color: "var(--sub)" }}>Student Developer Community at SNIST</div>
              </div>
            </div>

            {/* Big community card — dark with gradient text */}
            <div
              className="reveal rounded-[18px] p-8 relative overflow-hidden"
              style={{
                background: "var(--card)",
                border: "1px solid rgba(255,61,110,.22)",
                boxShadow: "0 0 50px rgba(255,61,110,.07), inset 0 0 60px rgba(249,115,22,.04)",
              }}
              ref={(el) => {
                if (!el) return;
                const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } }, { threshold: 0.2 });
                io.observe(el);
              }}
            >
              {/* Subtle gradient top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px]"
                style={{ background: "var(--grad)" }} />

              {/* Glow orb in corner */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(255,61,110,.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[.85rem] font-medium" style={{ color: "var(--sub)" }}>We are a community of</p>
                  <span style={{ fontSize: "1.5rem" }}>🎓</span>
                </div>
                <div className="gtext font-extrabold leading-none mb-3"
                  style={{ fontSize: "clamp(3.2rem, 8vw, 5rem)", letterSpacing: "-0.04em" }}>
                  <AnimatedCounter value="5000+" label="" />
                </div>
                <p className="text-[.9rem] font-medium" style={{ color: "var(--text)" }}>Members across India</p>
                <p className="text-[.75rem] mt-1" style={{ color: "var(--muted)" }}>and growing every semester</p>
              </div>
            </div>

            {/* Two smaller cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50+",  label: "Events",    sub: "hackathons & meetups", icon: "⚡" },
                { value: "120+", label: "Workshops", sub: "hands-on sessions",    icon: "🛠" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="reveal rounded-[16px] p-5"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", transition: "border-color .25s, transform .25s var(--ease-out), box-shadow .25s" }}
                  ref={(el) => {
                    if (!el) return;
                    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } }, { threshold: 0.2 });
                    io.observe(el);
                    el.addEventListener("mouseenter", () => { el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(255,61,110,.3)"; el.style.boxShadow = "0 16px 32px rgba(0,0,0,.15)"; });
                    el.addEventListener("mouseleave", () => { el.style.transform = ""; el.style.borderColor = ""; el.style.boxShadow = ""; });
                  }}
                >
                  <span style={{ fontSize: "1.4rem", display: "block", marginBottom: "0.5rem" }}>{s.icon}</span>
                  <AnimatedCounter value={s.value} label={s.label} delay={i * 100} />
                  <p className="text-[.72rem] mt-1.5" style={{ color: "var(--muted)" }}>{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Partners count */}
            <div
              className="reveal rounded-[16px] p-5 flex items-center gap-4"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              ref={(el) => {
                if (!el) return;
                const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); } }, { threshold: 0.2 });
                io.observe(el);
              }}
            >
              <span style={{ fontSize: "1.8rem" }}>🌐</span>
              <div className="flex gap-8">
                <div>
                  <div className="gtext font-extrabold text-[1.6rem]">10+</div>
                  <div className="text-[.72rem]" style={{ color: "var(--muted)" }}>Partners</div>
                </div>
                <div style={{ width: 1, background: "var(--border2)" }} />
                <div>
                  <div className="gtext font-extrabold text-[1.6rem]">2022</div>
                  <div className="text-[.72rem]" style={{ color: "var(--muted)" }}>Est. at SNIST</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
