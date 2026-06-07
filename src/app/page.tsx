import Link from "next/link";
import { publicListEvents } from "@/admin/lib/data/events";
import { publicListHighlights } from "@/admin/lib/data/highlights";
import { publicListTeam } from "@/admin/lib/data/team";
import { publicListPartners } from "@/admin/lib/data/partners";
import { mapRowsToEvents } from "@/lib/mappers/events";
import { mapRowToHighlight } from "@/lib/mappers/highlights";
import { mapRowToTeamMember } from "@/lib/mappers/team";
import HeroSlideshow from "@/components/HeroSlideshow";
import HeroContent from "@/components/HeroContent";
import EventCard from "@/components/cards/EventCard";
import TeamCard from "@/components/cards/TeamCard";
import PartnerCard from "@/components/cards/PartnerCard";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import MarqueeStrip from "@/components/MarqueeStrip";
import GalleryReveal from "@/components/GalleryReveal";
import HighlightsHScroll from "@/components/HighlightsHScroll";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import CommunityShowcase from "@/components/CommunityShowcase";

export const revalidate = 60;

const TECH_TAGS_A = ["Web Development", "AI / ML", "UI / UX Design", "Blockchain / Web3", "Backend Dev", "Data Science", "Hackathons", "Open Source", "Cloud & DevOps", "Mobile Dev"];

export default async function Home() {
  const [upcomingRows, pastRows, highlightRows, teamRows, partnerRows] = await Promise.all([
    publicListEvents({ filter: "upcoming" }),
    publicListEvents({ filter: "past" }),
    publicListHighlights(),
    publicListTeam(),
    publicListPartners(),
  ]);

  const upcoming       = upcomingRows[0];
  const recentPast     = mapRowsToEvents(pastRows.slice(0, 3));
  const allHighlights  = highlightRows.map(mapRowToHighlight);
  const homeHighlights = allHighlights.slice(0, 6);

  const teamMembers = teamRows.map(mapRowToTeamMember);
  const founder     = teamMembers.find((m) => m.section === "Founder");
  const core        = teamMembers.filter((m) => m.section !== "Founder").slice(0, 3);
  const HOME_TEAM_PREVIEW = [founder, ...core].filter((m): m is NonNullable<typeof founder> => Boolean(m));

  return (
    <main className="overflow-x-hidden">

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center pb-12 text-center overflow-hidden"
        style={{ paddingTop: "6rem" }}
      >
        <HeroSlideshow />
        <HeroContent />
      </section>

      {/* Tech marquee strip */}
      <div className="py-3" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <MarqueeStrip items={TECH_TAGS_A} speed={28} />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 2 — COMMUNITY SHOWCASE (ST-style grid + stats)
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--surface)" }}>
        <CommunityShowcase />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 3 — COMMUNITY GALLERY (masonry reveal)
      ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="sec-label mb-2">// COMMUNITY GALLERY</div>
                <h2 className="sec-title">Moments that matter</h2>
                <p className="sec-sub">Events, workshops, hackathons — captured as they happened.</p>
              </div>
            </div>
          </ScrollReveal>
          <GalleryReveal />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — ABOUT
      ═══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="sec-label mb-3">// WHO WE ARE</div>
              <h2 className="sec-title mb-6">Built by students,<br/>for students</h2>
              <p className="text-[.95rem] leading-[1.85] mb-4" style={{ color: "var(--sub)" }}>
                The <strong style={{ color: "var(--text)" }}>Student Developers Community (SDC)</strong> was established in <strong style={{ color: "var(--text)" }}>2022 at SNIST</strong>, founded by <strong style={{ color: "var(--text)" }}>Mr. Chandrashekhar M</strong> — a SNIST alumnus passionate about bridging academic and industry worlds.
              </p>
              <p className="text-[.95rem] leading-[1.85]" style={{ color: "var(--sub)" }}>
                Today, SDC unites <strong style={{ color: "var(--text)" }}>2500+ members</strong> with a growing national footprint under <span className="gtext font-bold">SDC INDIA</span> — collaborating with Microsoft, GDSC, PyCon, Hack This Fall and more.
              </p>
              <div className="mt-8">
                <Link href="/about" className="btn-grad" style={{ fontSize: ".88rem" }}>Learn more →</Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎯", title: "Our Mission",      desc: "Bridge the gap between academic learning and industry." },
                  { icon: "👁",  title: "Our Vision",       desc: "India's largest and most impactful student developer community." },
                  { icon: "🏆", title: "Real Projects",    desc: "Hackathons that turn into portfolios, internships, and full-time roles." },
                  { icon: "🌐", title: "National Network", desc: "From SNIST to SDC INDIA — a growing movement." },
                ].map((c, i) => (
                  <ScrollReveal key={c.title} delay={i * 70}>
                    <div
                      className="rounded-[14px] p-5 bg-[var(--card)] border border-[var(--border)] transition-all duration-250 ease-[var(--ease-out)] hover:border-[rgba(255,61,110,0.3)] hover:-translate-y-1"
                    >
                      <div className="text-2xl mb-2">{c.icon}</div>
                      <div className="font-bold text-[.88rem] mb-1">{c.title}</div>
                      <p className="text-[.76rem] leading-[1.6]" style={{ color: "var(--sub)" }}>{c.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — CORE VALUES (marquee tags)
      ═══════════════════════════════════════ */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 mb-10">
          <ScrollReveal>
            <div className="sec-label mb-2">// WHAT WE STAND FOR</div>
            <h2 className="sec-title">Core values</h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <ul className="mt-6 space-y-3 list-none p-0 max-w-xl">
              {[
                "Open and inclusive learning environment",
                "Real-world, hands-on exposure beyond classroom theory",
                "Peer collaboration over competition",
                "Industry-aligned skill building with mentorship",
                "National-level event partnerships and exposure",
              ].map((v) => (
                <li key={v} className="flex gap-3 text-[.9rem] leading-[1.65]" style={{ color: "var(--sub)" }}>
                  <span className="shrink-0" style={{ color: "var(--a1)" }}>→</span>
                  {v}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
        {/* Dual marquee rows */}
        <div className="space-y-3">
          <MarqueeStrip items={["Web Development","AI / ML","UI / UX","Blockchain","Backend","Data Science","Hackathons","Open Source","Cloud","Mobile"]} speed={24} />
          <MarqueeStrip items={["React","Python","Node.js","Figma","AWS","Next.js","TypeScript","TensorFlow","Docker","Rust"]} reverse speed={30} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 6 — UPCOMING EVENT (cinematic launch-pad design)
      ═══════════════════════════════════════ */}
      {upcoming && (
        <section className="py-0 overflow-hidden" style={{ background: "var(--surface)" }}>
          <ScrollReveal>
            <div
              className="relative w-full overflow-hidden"
              style={{ minHeight: 480 }}
            >
              {/* Subtle gradient background — adapts to theme */}
              <div className="absolute inset-0" style={{
                background: "linear-gradient(135deg, rgba(249,115,22,.06) 0%, rgba(255,61,110,.05) 50%, rgba(194,24,91,.04) 100%)",
              }} />
              {/* Animated orb top-right */}
              <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none" style={{
                background: "radial-gradient(circle, rgba(255,61,110,.12) 0%, transparent 65%)",
                filter: "blur(60px)",
                animation: "float 8s ease-in-out infinite",
              }} />
              {/* Orb bottom-left */}
              <div className="absolute -bottom-20 -left-10 w-[380px] h-[380px] rounded-full pointer-events-none" style={{
                background: "radial-gradient(circle, rgba(249,115,22,.1) 0%, transparent 65%)",
                filter: "blur(60px)",
                animation: "float 10s ease-in-out 1.5s infinite",
              }} />

              {/* Content */}
              <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-16 grid lg:grid-cols-[1fr_auto] gap-10 items-center">

                {/* Left — event info */}
                <div>
                  {/* Top badges row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[.67rem] font-bold"
                      style={{ background: "rgba(34,197,94,.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,.22)" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block" style={{ animation: "blink 1.5s infinite" }} />
                      OPENING SOON
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[.67rem]"
                      style={{ background: "rgba(255,61,110,.1)", color: "var(--a1)", border: "1px solid rgba(255,61,110,.2)" }}>
                      🏆 National Level
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[.67rem]"
                      style={{ background: "var(--card)", color: "var(--sub)", border: "1px solid var(--border2)" }}>
                      👥 {upcoming.seats ?? 300} Seats
                    </span>
                  </div>

                  {/* Event name — big */}
                  <h2
                    className="font-extrabold leading-[0.95] mb-5"
                    style={{ fontSize: "clamp(2.4rem,6vw,4.2rem)", letterSpacing: "-0.03em", color: "var(--text)" }}
                  >
                    {upcoming.title}
                  </h2>

                  <p className="text-[.95rem] leading-relaxed mb-7 max-w-xl" style={{ color: "var(--sub)" }}>
                    {upcoming.description}
                  </p>

                  {/* Meta chips */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {[
                      { icon: "📅", val: upcoming.event_date ?? "Date TBA" },
                      { icon: "📍", val: upcoming.location ?? "Hyderabad" },
                    ].map((m) => (
                      <span key={m.val} className="flex items-center gap-2 px-4 py-2 rounded-full text-[.8rem]"
                        style={{ background: "var(--card)", border: "1px solid var(--border2)", color: "var(--text)" }}>
                        {m.icon} {m.val}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-3 flex-wrap">
                    <Link href={`/events/${upcoming.slug ?? upcoming.id}`} className="btn-grad" style={{ fontSize: ".9rem", padding: ".78rem 1.8rem" }}>
                      Register Now →
                    </Link>
                    <Link href="/events" className="btn-outline" style={{ fontSize: ".9rem", padding: ".78rem 1.8rem" }}>
                      All Events
                    </Link>
                  </div>
                </div>

                {/* Right — stylised date/status block */}
                <div className="text-center flex-shrink-0 lg:min-w-[220px]">
                  {/* Circular glow badge */}
                  <div
                    className="inline-flex flex-col items-center justify-center rounded-full"
                    style={{
                      width: 180, height: 180,
                      background: "var(--card)",
                      border: "1px solid rgba(255,61,110,.28)",
                      boxShadow: "0 0 50px rgba(255,61,110,.12), inset 0 0 30px rgba(255,61,110,.04)",
                      animation: "glow-pulse 3s ease-in-out infinite",
                    }}
                  >
                    <div className="gtext font-extrabold text-[2rem] leading-none">TBA</div>
                    <div className="text-[.62rem] tracking-[0.18em] mt-1.5" style={{ color: "var(--muted)" }}>DATE</div>
                  </div>
                  <p className="text-[.72rem] mt-4 tracking-wider" style={{ color: "#555" }}>
                    REGISTRATIONS<br />OPENING SOON
                  </p>
                </div>

              </div>

              {/* Bottom gradient divider */}
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{
                background: "linear-gradient(90deg, transparent, rgba(255,61,110,.3) 50%, transparent)",
              }} />
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ═══════════════════════════════════════
          SECTION 7 — PAST EVENTS
      ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
              <div>
                <div className="sec-label mb-2">// PAST EVENTS</div>
                <h2 className="sec-title">What we&apos;ve built</h2>
              </div>
              <Link href="/events" className="btn-outline" style={{ fontSize: ".82rem" }}>See all events →</Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentPast.map((e, i) => (
              <ScrollReveal key={e.id} delay={i * 80}>
                <Link href={`/events/${e.id}`} className="block h-full">
                  <EventCard event={e} variant="past" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 8 — SUCCESS STORIES (GSAP horizontal scroll)
      ═══════════════════════════════════════ */}
      <div style={{ background: "var(--surface)" }}>
        <HighlightsHScroll highlights={homeHighlights} />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 9 — TEAM
      ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
              <div>
                <div className="sec-label mb-2">// THE TEAM</div>
                <h2 className="sec-title">The people behind SDC</h2>
              </div>
              <Link href="/team" className="btn-outline" style={{ fontSize: ".82rem" }}>Full team →</Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {HOME_TEAM_PREVIEW.map((m, i) => (
              <ScrollReveal key={m.id} delay={i * 80}>
                <Link href={`/team#${m.id}`} className="block h-full">
                  <TeamCard member={m} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 10 — TESTIMONIALS (two-row marquee)
      ═══════════════════════════════════════ */}
      <TestimonialsMarquee />

      {/* ═══════════════════════════════════════
          SECTION 11 — PARTNERS (logo carousel)
      ═══════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="sec-label mb-2">// PARTNERS &amp; COLLABORATORS</div>
            <h2 className="sec-title mb-3">We partner with</h2>
            <p className="sec-sub mb-10">Communities and organisations that have hosted, sponsored, or partnered with SDC events.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {partnerRows.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 60}>
                <PartnerCard src={p.logo_url} alt={p.name} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 12 — SDC UNIVERSE (arc glow)
      ═══════════════════════════════════════ */}
      <ArcUniverseSection />

      {/* ═══════════════════════════════════════
          SECTION 13 — CTA
      ═══════════════════════════════════════ */}
      <section className="py-24" style={{ background: "var(--surface)" }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div
              className="rounded-[22px] p-10 md:p-18 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(249,115,22,.07), rgba(255,61,110,.07))",
                border: "1px solid rgba(255,61,110,.22)",
              }}
            >
              <div className="sec-label mb-3">// JOIN US</div>
              <h2 className="font-extrabold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                Ready to build something <span className="gtext">extraordinary?</span>
              </h2>
              <p className="max-w-lg mx-auto text-[.95rem] leading-relaxed mb-8" style={{ color: "var(--sub)" }}>
                Host an event at your college, join an upcoming hackathon, or just say hi. We&apos;d love to hear from you.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/host" className="btn-grad" style={{ fontSize: ".95rem", padding: ".85rem 2rem" }}>Host an Event</Link>
                <Link href="/contact" className="btn-outline" style={{ fontSize: ".95rem", padding: ".85rem 2rem" }}>Get in Touch</Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}

/* ──────────────────────────────────────
   SDC UNIVERSE — arc glow section
   (matching ST. Universe from screenshots)
────────────────────────────────────── */
function ArcUniverseSection() {
  return (
    <section className="arc-section">
      <div className="arc-stars" />

      <p
        className="relative z-10 text-[.7rem] tracking-[.28em] uppercase mb-5"
        style={{ color: "rgba(255,130,60,.7)" }}
      >
        ✦ SDC INDIA
      </p>

      <h2
        className="relative z-10 font-extrabold text-white text-center"
        style={{
          fontSize: "clamp(2.8rem, 8vw, 6rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          textShadow: "0 0 60px rgba(255,100,40,.4), 0 0 120px rgba(255,61,110,.2)",
        }}
      >
        SDC UNIVERSE
      </h2>

      <p
        className="relative z-10 mt-5 text-center max-w-lg"
        style={{ color: "rgba(255,255,255,.38)", fontSize: ".93rem", lineHeight: 1.75 }}
      >
        A growing constellation of student developers, innovators, and creators
        shaping India&apos;s tech future — one hackathon at a time.
      </p>

      <div className="arc-glow" />
    </section>
  );
}
