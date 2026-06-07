import { Calendar, Clock, MapPin, Mic, Tag, Users } from "lucide-react";
import { Event } from "@/types/events";

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const details = [
    { icon: Calendar, label: "Date", value: event.date },
    { icon: Clock, label: "Time", value: event.time },
    { icon: MapPin, label: "Location", value: event.location },
    { icon: Users, label: "Mode", value: event.mode },
    { icon: Tag, label: "Event Type", value: event.category },
    { icon: Mic, label: "Speaker", value: event.speaker },
    ...(event.duration ? [{ icon: Clock, label: "Duration", value: event.duration }] : []),
  ];

  return (
    <aside className="surface-highest rounded-3xl border border-white/5 p-8">
      <h2 className="font-[var(--font-manrope)] text-2xl font-bold text-white">Event Details</h2>

      <div className="mt-8 space-y-6">
        {details.map((detail) => {
          const Icon = detail.icon;
          return (
            <div key={detail.label} className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#1a1919] p-3">
                <Icon className="h-5 w-5 text-[#a3a6ff]" />
              </div>
              <div className="flex-1 border-b border-white/5 pb-4 last:border-0">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#adaaaa]">{detail.label}</h3>
                <p className="mt-1 font-semibold text-white">{detail.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {!event.isPast && (
        <a
          href={event.registrationUrl || "#register"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block rounded-2xl bg-[#a3a6ff] py-4 text-center text-base font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(163,166,255,0.35)]"
        >
          Secure Your Spot
        </a>
      )}
    </aside>
  );
}
