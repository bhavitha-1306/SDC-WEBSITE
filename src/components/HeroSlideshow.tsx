"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SLIDES = [
  "/assets/blog/sdc-india-logo.jpeg",
  "/assets/events/hash-it-out-2.jpg",
  "/assets/blog/community-1.jpeg",
];

const INTERVAL_MS = 6000;

/* Floating gradient orbs */
const ORBS = [
  { w: 420, h: 420, top: "8%",  left: "-6%",   color: "rgba(249,115,22,.18)", dur: 8 },
  { w: 360, h: 360, top: "15%", right: "-5%",  color: "rgba(255,61,110,.15)", dur: 11 },
  { w: 300, h: 300, top: "55%", left: "40%",   color: "rgba(194,24,91,.12)",  dur: 9 },
  { w: 200, h: 200, top: "70%", left: "10%",   color: "rgba(249,115,22,.1)",  dur: 13 },
];

/* Floating background words — like studenttribe.in intro */
const FLOAT_WORDS = [
  { word: "Build",    top: "16%", left: "7%",   size: "2.4rem", delay: 0,    dur: 6   },
  { word: "Code",     top: "22%", right: "9%",  size: "2.9rem", delay: 0.9,  dur: 7.5 },
  { word: "Hack",     top: "72%", left: "11%",  size: "2.1rem", delay: 1.6,  dur: 8   },
  { word: "Learn",    top: "13%", left: "56%",  size: "1.9rem", delay: 0.4,  dur: 5.5 },
  { word: "Grow",     top: "76%", right: "7%",  size: "2.5rem", delay: 1.3,  dur: 9   },
  { word: "Innovate", top: "58%", left: "4%",   size: "1.7rem", delay: 2.1,  dur: 7   },
  { word: "Create",   top: "38%", right: "5%",  size: "2.1rem", delay: 0.7,  dur: 6.5 },
  { word: "Connect",  top: "82%", left: "40%",  size: "2rem",   delay: 1.9,  dur: 8.5 },
  { word: "Inspire",  top: "10%", left: "34%",  size: "1.8rem", delay: 1.1,  dur: 7   },
  { word: "Develop",  top: "48%", right: "11%", size: "1.6rem", delay: 2.5,  dur: 9.5 },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Slide images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${SLIDES[index]})` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.22, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.8, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </AnimatePresence>

      {/* ── Floating keyword words (like studenttribe.in intro) ── */}
      {FLOAT_WORDS.map((fw, i) => (
        <motion.span
          key={i}
          className="absolute font-extrabold tracking-tight"
          style={{
            top: fw.top,
            left: (fw as { left?: string }).left,
            right: (fw as { right?: string }).right,
            fontSize: fw.size,
            color: "rgba(255,255,255,.065)",
            fontFamily: "var(--font-helv)",
            letterSpacing: "-0.03em",
            userSelect: "none",
          }}
          animate={{
            y: [0, -18, 0, 12, 0],
            opacity: [0.065, 0.1, 0.065, 0.08, 0.065],
          }}
          transition={{
            duration: fw.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: fw.delay,
          }}
        >
          {fw.word}
        </motion.span>
      ))}

      {/* Floating gradient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            top: orb.top,
            left: (orb as { left?: string }).left,
            right: (orb as { right?: string }).right,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{ y: [0, -24, 0, 18, 0], x: [0, 12, -8, 0], scale: [1, 1.08, 1, 0.96, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.4 }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(8,8,8,.52) 0%, rgba(8,8,8,.92) 100%)",
        }}
      />

      {/* Ambient colour glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 15% 50%, rgba(249,115,22,.11) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 55% at 85% 30%, rgba(255,61,110,.09) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 40% at 50% 88%, rgba(194,24,91,.08) 0%, transparent 60%)",
        }}
      />

      {/* Grid mesh */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        }}
      />

      {/* Slide indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === index ? 24 : 6,
              opacity: i === index ? 1 : 0.25,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              height: 6,
              borderRadius: 3,
              background: "linear-gradient(90deg,#f97316,#ff3d6e)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
