import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, User } from "lucide-react";
import { Event } from "@/types/events";

interface EventSpeakerProps {
  event: Event;
}

export default function EventSpeaker({ event }: EventSpeakerProps) {
  const { speaker } = event;

  if (!speaker) return null;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center font-[var(--font-manrope)] text-4xl font-bold text-white">Featured Speaker</h2>

        <article className="surface-highest overflow-hidden rounded-3xl border border-white/5">
          <div className="md:flex items-center">
            <div className="relative h-64 md:h-64 md:w-1/3 flex items-center justify-center bg-surface-container-highest">
              <User size={80} className="text-on-surface-variant/20" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#a3a6ff]/10 via-transparent to-[#c180ff]/10" />
            </div>

            <div className="flex-1 p-8 lg:p-10">
              <span className="type-kicker text-primary mb-2 block font-bold">EVENT VOICE</span>
              <h3 className="font-[var(--font-manrope)] text-3xl font-bold text-white">{speaker}</h3>
              <p className="mt-4 leading-relaxed text-[#adaaaa]">
                Join {speaker} as they share insights and knowledge on {event.category} during this session.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#262626] px-4 py-2 font-medium text-white transition-colors hover:bg-[#333]">
                  <Mail className="h-4 w-4" />
                  Request Meeting
                </button>
              </div>
            </div>
          </div>

          <div className="h-1 bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]" />
        </article>
      </div>
    </section>
  );
}
