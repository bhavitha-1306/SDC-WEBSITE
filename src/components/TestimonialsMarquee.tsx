"use client";

const TESTIMONIALS = [
  {
    name: "Arjun Kumar",
    college: "SNIST · 2023",
    text: "SDC's hackathon helped me build a project that landed me a SWE internship at a Bangalore startup. Best community I've been part of.",
    emoji: "🚀",
  },
  {
    name: "Priya Reddy",
    college: "VBIT · 2024",
    text: "Won my first hackathon here. The mentorship and peer support was unlike anything else. Now I lead a 20-person team at my college.",
    emoji: "🏆",
  },
  {
    name: "Karthik M.",
    college: "CBIT · 2023",
    text: "The AI/ML workshops were super practical. Directly applied what I learned and got a research internship at an IIT lab.",
    emoji: "🤖",
  },
  {
    name: "Ananya Singh",
    college: "SNIST · 2024",
    text: "Found my startup co-founder at an SDC event. We raised our first funding six months later. This community changes lives.",
    emoji: "💡",
  },
  {
    name: "Ravi Teja",
    college: "JNTU · 2023",
    text: "The open-source mentorship helped me get my first PR merged into a 10k-star repo. SDC made open source feel accessible.",
    emoji: "🌐",
  },
  {
    name: "Divya Nair",
    college: "VNR · 2024",
    text: "Best developer community in Hyderabad — bar none. Events are practical, networking is genuine, and the energy is electric.",
    emoji: "⚡",
  },
  {
    name: "Sai Charan",
    college: "SNIST · 2023",
    text: "Before SDC I had zero idea how to build real projects. After two hackathons I had a portfolio that impressed every interviewer.",
    emoji: "💼",
  },
  {
    name: "Meghana P.",
    college: "CBIT · 2024",
    text: "The speakers at SDC events are working professionals who actually want to help students. I got a referral that changed everything.",
    emoji: "🎯",
  },
];

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0 mx-3 rounded-[16px] p-6"
      style={{
        width: 320,
        background: "rgba(255,255,255,.03)",
        border: "1px solid rgba(255,255,255,.06)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="text-2xl mb-3">{t.emoji}</div>
      <p className="text-[.85rem] leading-[1.72] mb-4" style={{ color: "var(--sub)" }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[.75rem] flex-shrink-0"
          style={{ background: "var(--grad)" }}
        >
          {t.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="font-bold text-[.85rem]" style={{ color: "var(--text)" }}>{t.name}</div>
          <div className="text-[.7rem]" style={{ color: "var(--muted)" }}>{t.college}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * Two-row infinite marquee — row 1 scrolls forward, row 2 scrolls backward.
 * Matches studenttribe.in testimonials section style.
 */
export default function TestimonialsMarquee() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(0, 4), ...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(0, 4)];

  return (
    <section className="py-20 overflow-hidden" style={{ background: "var(--surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 mb-12">
        <ScrollRevealInline>
          <div className="sec-label mb-2">// COMMUNITY VOICES</div>
          <h2 className="sec-title">What students say</h2>
        </ScrollRevealInline>
      </div>

      {/* Row 1 — left */}
      <div
        className="marquee-outer mb-4"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
      >
        <div className="marquee-track" style={{ animationDuration: "35s" }}>
          {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div
        className="marquee-outer"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}
      >
        <div className="marquee-track marquee-track-r" style={{ animationDuration: "40s" }}>
          {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}

/* Inline scroll reveal to avoid extra file import */
function ScrollRevealInline({ children }: { children: React.ReactNode }) {
  return <div className="reveal" ref={(el) => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); io.unobserve(el); }
    }, { threshold: 0.15 });
    io.observe(el);
  }}>{children}</div>;
}
