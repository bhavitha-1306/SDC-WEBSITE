"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Calendar, Clock, type LucideIcon } from "lucide-react";
import type { BlogPost } from "@/types/blog";

function StatItem({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <Icon size={12} className="text-on-surface-variant/70" />
        <span className="type-kicker text-on-surface-variant/70">{label}</span>
      </div>
      <span className="text-sm font-bold text-on-surface">{value}</span>
    </div>
  );
}

function getCategoryTone(category: BlogPost["category"]): string {
  if (category === "event") return "bg-secondary-container text-on-secondary-container";
  if (category === "community") return "bg-primary-dim text-on-primary-fixed";
  if (category === "growth") return "bg-tertiary text-on-tertiary-container";
  if (category === "digital") return "bg-tertiary-container text-on-tertiary-container";
  return "bg-surface-variant text-on-surface";
}

export default function BlogCard({ post, onOpen }: { post: BlogPost; onOpen: (id: string) => void }) {
  const categoryTone = useMemo(() => getCategoryTone(post.category), [post.category]);

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full w-full overflow-hidden rounded-2xl isolate"
      variants={{
        rest: { y: 0, zIndex: 1, boxShadow: "0 0 0 1px rgba(73,72,71,0.6), 0 10px 36px rgba(0,0,0,0.26)" },
        hover: { y: -6, zIndex: 20, boxShadow: "0 0 0 1px rgba(163,166,255,0.45), 0 28px 54px rgba(0,0,0,0.45)" },
      }}
      style={{ background: "var(--surface-container-highest)" }}
    >
      <button type="button" onClick={() => onOpen(post.id)} className="relative h-56 w-full overflow-hidden text-left">
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" style={{ filter: "contrast(1.06)" }} />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface-container-highest)] via-[rgba(38,38,38,0.45)] to-transparent" />

        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${categoryTone}`}>
            <BookOpen size={9} />
            {post.category}
          </span>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h3 className="font-[var(--font-manrope)] text-xl font-extrabold leading-tight text-on-surface" style={{ letterSpacing: "-0.02em" }}>
            {post.title}
          </h3>
        </div>
      </button>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold capitalize text-on-surface">{post.category}</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <Calendar size={10} className="text-on-surface-variant/70" />
              <p className="text-xs text-on-surface-variant">{post.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant">
            <Clock size={10} />
            <p className="text-xs">{post.readTime}</p>
          </div>
        </div>

        <div className="my-4 h-px w-full bg-[rgba(73,72,71,0.6)]" />

        <p className="line-clamp-2 text-sm leading-relaxed text-on-surface-variant">{post.excerpt}</p>

        <button
          type="button"
          onClick={() => onOpen(post.id)}
          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-outline-variant/70 bg-surface-container px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-on-surface transition-all hover:border-primary-dim hover:bg-primary-dim hover:text-on-primary-fixed"
        >
          Read Article
          <ArrowUpRight size={12} />
        </button>
      </div>
    </motion.article>
  );
}
