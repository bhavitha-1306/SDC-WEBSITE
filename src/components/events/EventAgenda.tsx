import { Clock } from "lucide-react";
import { Event } from "@/types/events";

interface EventAgendaProps {
  event: Event;
}

export default function EventAgenda({ event }: EventAgendaProps) {
  if (!event.agenda || event.agenda.length === 0) return null;

  return (
    <section className="bg-[#131313]/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center font-[var(--font-manrope)] text-4xl font-bold text-white">Event Agenda</h2>

        <div className="space-y-4">
          {event.agenda.map((item, index) => (
            <article key={`${item.time}-${item.title}`} className="surface-highest rounded-2xl p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#a3a6ff] px-4 py-2 text-sm font-semibold text-black">
                  <Clock className="h-4 w-4" />
                  {item.time}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-[#adaaaa]">{item.description}</p>
                </div>
              </div>

              {index < event.agenda!.length - 1 ? <div className="mt-5 h-px bg-white/5" /> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
