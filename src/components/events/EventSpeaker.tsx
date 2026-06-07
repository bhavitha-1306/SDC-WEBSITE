import { Event } from "@/types/events";

interface EventSpeakerProps {
  event: Event;
}

export default function EventSpeaker({ event }: EventSpeakerProps) {
  const { speaker } = event;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center font-[var(--font-manrope)] text-4xl font-bold text-white">Featured Speaker</h2>

        <article className="surface-highest overflow-hidden rounded-3xl border border-white/5">
          <div className="p-8 lg:p-10">
            <h3 className="font-[var(--font-manrope)] text-3xl font-bold text-white">{speaker}</h3>
            <p className="mt-5 leading-relaxed text-[#adaaaa]">
              Join us for an insightful session with our featured speaker who will share valuable knowledge and experience.
            </p>
          </div>

          <div className="h-1 bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]" />
        </article>
      </div>
    </section>
  );
}
