"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { src: "/assets/blog/moment-4-v3.jpg", alt: "Workshop Speaker Session", span: "col-span-2 row-span-2" },
  { src: "/assets/blog/moment-1.jpg", alt: "AI Summit Speaker",     span: "" },
  { src: "/assets/blog/moment-2.jpg", alt: "SDC Core Team",          span: "" },
  { src: "/assets/blog/moment-5.jpg", alt: "SDC UX-Plosion Group",   span: "col-span-2" },
  { src: "/assets/blog/moment-3.jpg", alt: "SDC Community Meetup",   span: "" },
];

/**
 * Masonry-style gallery where each image reveals with a GSAP clip-path animation
 * triggered by ScrollTrigger — matching the studenttribe.in gallery section.
 */
export default function GalleryReveal() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll<HTMLDivElement>(".gallery-item");

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        // Clip from right (reveal left → right)
        gsap.fromTo(
          item,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.3 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Image inner scale — Ken Burns on entry
        const img = item.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.4,
              ease: "power3.out",
              delay: i * 0.08,
              scrollTrigger: { trigger: item, start: "top 85%", once: true },
            }
          );
        }
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "200px" }}
    >
      {IMAGES.map((img, i) => (
        <div
          key={i}
          className={`gallery-item relative overflow-hidden rounded-[14px] ${img.span}`}
          style={{ background: "var(--card)" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, rgba(255,61,110,.18), rgba(249,115,22,.12))" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
          />
        </div>
      ))}
    </div>
  );
}
