"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, MapPin, Users, Wifi, Layers, User, type LucideIcon } from "lucide-react";
import { Event } from "@/types/events";

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

const MODE_CONFIG = {
  ONLINE: {
    icon: Wifi,
    color: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    label: "Online"
  },
  OFFLINE: {
    icon: MapPin,
    color: "bg-orange-500/20 text-orange-400 border-orange-500/20",
    label: "Offline"
  },
  HYBRID: {
    icon: Layers,
    color: "bg-purple-500/20 text-purple-400 border-purple-500/20",
    label: "Hybrid"
  }
};

export default function EventCard({ event }: { event: Event }) {
  const modeConfig = MODE_CONFIG[event.mode] || MODE_CONFIG.OFFLINE;
  const ModeIcon = modeConfig.icon;

  return (
    <motion.article
      initial="rest"
      animate="rest"
      whileHover="hover"
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl isolate"
      variants={{
        rest: { y: 0, zIndex: 40, boxShadow: "0 0 0 1px rgba(73,72,71,0.6), 0 10px 36px rgba(0,0,0,0.26)" },
        hover: { y: -6, zIndex: 60, boxShadow: "0 0 0 1px rgba(163,166,255,0.45), 0 28px 54px rgba(0,0,0,0.45)" },
      }}
      style={{ background: "var(--surface-container-highest)" }}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="h-full w-full"
        >
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            {/* Gradient placeholder as requested until real images are added */}
            <div className={`absolute inset-0 opacity-40 bg-gradient-to-tr ${event.mode === "ONLINE" ? "from-blue-600 to-cyan-400" :
                event.mode === "OFFLINE" ? "from-orange-600 to-yellow-400" :
                  "from-purple-600 to-pink-400"
              }`} />
            {event.image && (
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface-container-highest)] via-[rgba(38,38,38,0.25)] to-transparent" />

        <div className="absolute left-3 top-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${modeConfig.color}`}>
            <ModeIcon size={9} />
            {modeConfig.label}
          </span>
        </div>

        <AnimatePresence>
          {!event.isPast && (
            <motion.a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              initial={false}
              variants={{
                rest: { opacity: 0, scale: 0.85, pointerEvents: "none" },
                hover: { opacity: 1, scale: 1, pointerEvents: "auto" },
              }}
              transition={{ duration: 0.18 }}
              className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-tertiary px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-on-tertiary-container transition-opacity hover:opacity-90"
            >
              Register
              <ArrowUpRight size={11} />
            </motion.a>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h3 className="font-[var(--font-manrope)] text-xl font-extrabold leading-tight text-on-surface line-clamp-2" style={{ letterSpacing: "-0.02em" }}>
            {event.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-primary" />
              <p className="text-xs font-medium text-on-surface-variant">{event.date}</p>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant">
              <MapPin size={12} className="text-primary" />
              <p className="text-xs truncate max-w-[120px]">{event.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <User size={12} className="text-primary" />
            <p className="text-xs truncate">
              <span className="font-semibold text-on-surface">Speaker:</span> {event.speaker}
            </p>
          </div>
        </div>

        <div className="my-4 h-px w-full bg-[rgba(73,72,71,0.6)]" />

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <StatItem label="Attendees" value={`${event.attendees}+`} icon={Users} />
            <StatItem label="Duration" value={event.duration} icon={Clock} />
          </div>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="mt-3 inline-flex items-center justify-center rounded-lg border border-outline-variant/70 bg-surface-container px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-on-surface transition-all hover:border-primary-dim hover:bg-primary-dim hover:text-on-primary-fixed"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}
