"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";

const STATS = [
  { value: "2500+", label: "MEMBERS" },
  { value: "50+",   label: "EVENTS" },
  { value: "120+",  label: "WORKSHOPS" },
  { value: "10+",   label: "PARTNERS" },
  { value: "2022",  label: "SINCE" },
];

const EASE = [0.19, 1, 0.22, 1] as const;

/**
 * Animated hero foreground content.
 * Each word in "Build. Create. Inspire." enters with a distinct motion.
 */
export default function HeroContent() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto text-center px-6">

      {/* ── Announcement badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs"
        style={{
          border: "1px solid rgba(255,61,110,.35)",
          background: "rgba(255,61,110,.08)",
          color: "var(--a1)",
        }}
      >
        <span className="pulse" />
        ✦ HACK FOR HYDERABAD · Registrations Opening Soon
      </motion.div>

      {/* ── Giant background text (depth effect) ── */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
      >
        <span
          className="font-extrabold select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 22vw, 20rem)",
            color: "rgba(255,255,255,.025)",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            fontFamily: "var(--font-helv)",
          }}
        >
          SDC
        </span>
      </div>

      {/* ── Animated headline words ── */}
      <h1
        className="font-extrabold leading-[0.92] mb-8"
        style={{ fontSize: "clamp(4rem, 10vw, 8rem)", letterSpacing: "-0.04em" }}
      >
        {/* "Build." — slides in from top */}
        <motion.span
          className="block"
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: EASE }}
        >
          Build.
        </motion.span>

        {/* "Create." — scales up + gradient */}
        <motion.span
          className="block gtext"
          initial={{ scale: 0.55, opacity: 0, rotateX: 40 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ delay: 0.48, duration: 1, ease: EASE }}
          style={{ transformOrigin: "center" }}
        >
          Create.
        </motion.span>

        {/* "Inspire." — slides in from right */}
        <motion.span
          className="block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 1, ease: EASE }}
        >
          Inspire.
        </motion.span>
      </h1>

      {/* ── Sub headline ── */}
      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
        className="max-w-xl mx-auto text-lg leading-[1.72] mb-10"
        style={{ color: "var(--sub)" }}
      >
        India&apos;s fastest growing student developer community. Founded 2022 at SNIST.
        We bridge academic learning and industry.
      </motion.p>

      {/* ── CTA buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
        className="flex gap-4 justify-center flex-wrap mb-16"
      >
        <Link href="/contact" className="btn-grad" style={{ fontSize: ".95rem", padding: ".85rem 2rem" }}>
          Join Community
        </Link>
        <Link href="/events" className="btn-outline" style={{ fontSize: ".95rem", padding: ".85rem 2rem" }}>
          Explore Events
        </Link>
      </motion.div>

      {/* ── Divider line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 1, ease: EASE }}
        className="mx-auto mb-10"
        style={{ height: 1, maxWidth: 400, background: "linear-gradient(90deg, transparent, var(--border2) 40%, var(--border2) 60%, transparent)", transformOrigin: "center" }}
      />

      {/* ── Stats — AnimatedCounter triggers on viewport entry ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.9 }}
        className="flex gap-8 md:gap-12 justify-center flex-wrap"
      >
        {STATS.map((s, i) => (
          <AnimatedCounter key={s.label} value={s.value} label={s.label} delay={i * 100} />
        ))}
      </motion.div>
    </div>
  );
}
