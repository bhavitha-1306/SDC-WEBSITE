"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { Event } from "@/types/events";
import EventCard from "@/components/events/EventCard";

interface EventsSectionProps {
  events: Event[];
  showFilterBar?: boolean;
}

export default function EventsSection({ events, showFilterBar = true }: EventsSectionProps) {
  return (
    <div className="flex flex-col">
      <motion.div
        layout
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-40 pointer-events-auto"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {events.map((event) => (
            <motion.div
              layout
              key={event.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 30 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {events.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-6 rounded-full bg-surface-container-highest/20 p-8">
            <SlidersHorizontal size={40} className="text-on-surface-variant/30" />
          </div>
          <h3 className="type-heading text-2xl mb-4">No matching events found</h3>
          <p className="text-on-surface-variant max-w-md mx-auto mb-12">
            Try adjusting your search criteria, choosing a different mode, or expanding your category selection to explore more.
          </p>
        </div>
      )}
    </div>
  );
}
