"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   TEAM DATA
   Photos go in /public/assets/team/
   Filenames listed below — add images later.
───────────────────────────────────────────── */
const TECH_TEAM = [
  { name: "GOUTI Pavan Kumar",    role: "Technical Lead",    photo: "/assets/team/gouti-pavan-kumar.jpg",   initials: "GP" },
  { name: "Thoomu Rithwik Reddy", role: "Technical Lead",    photo: "/assets/team/rithwik-reddy.jpg",       initials: "TR" },
  { name: "Aella Bhavitha",       role: "Technical Lead",    photo: "/assets/team/aella-bhavitha.jpg",      initials: "AB" },
  { name: "A Praveen Kumar",      role: "Design Lead",       photo: "/assets/team/praveen-kumar.jpg",       initials: "PK" },
];

const CORE_TEAM = [
  { name: "Adarsh",              role: "Core Team",          photo: "/assets/team/adarsh.jpg",              initials: "AD" },
  { name: "Sai Kumar",           role: "Core Team",          photo: "/assets/team/sai-kumar.jpg",           initials: "SK" },
  { name: "Bannu",               role: "Core Team",          photo: "/assets/team/bannu.jpg",               initials: "BN" },
  { name: "Gunti Charan",        role: "Publicity Lead",     photo: "/assets/team/gunti-charan.jpg",        initials: "GC" },
  { name: "Routhu Srihitha",     role: "Project Manager",    photo: "/assets/team/routhu-srihitha.jpg",     initials: "RS" },
  { name: "S. Lalith Charan",    role: "Organizer",          photo: "/assets/team/lalith-charan.jpg",       initials: "LC" },
  { name: "Ravalika",            role: "College Outreach",   photo: "/assets/team/ravalika.jpg",            initials: "RV" },
  { name: "Kotawad Shravani",    role: "Corporate Reachout Lead", photo: "/assets/team/shravani.jpg",            initials: "KS" },
];

/* Gradient palette cycling through SDC brand colors */
const GRADIENTS = [
  "linear-gradient(135deg,#f97316,#ff3d6e)",
  "linear-gradient(135deg,#ff3d6e,#c2185b)",
  "linear-gradient(135deg,#c2185b,#f97316)",
  "linear-gradient(135deg,#ff6a00,#ff3d6e)",
];

interface MemberCard {
  name: string;
  role: string;
  photo: string;
  initials: string;
  team: "Tech Team" | "Core Team";
}

/* Build flat list: Tech Team first, then Core Team */
const ALL_MEMBERS: MemberCard[] = [
  ...TECH_TEAM.map((m) => ({ ...m, team: "Tech Team" as const })),
  ...CORE_TEAM.map((m) => ({ ...m, team: "Core Team" as const })),
];

export default function TeamHScroll() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const labelPanel = wrap.querySelector(".team-label-panel") as HTMLElement | null;
      const labelWidth = labelPanel ? labelPanel.offsetWidth : 0;
      const visibleWidth = wrap.offsetWidth - labelWidth;
      const totalX = track.scrollWidth - visibleWidth;
      const scrollDist = totalX;

      gsap.to(track, {
        x: -scrollDist,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "center center",
          end: () => `+=${scrollDist * 0.65}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        track.querySelectorAll(".tcard"),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#team") {
      const timer = setTimeout(() => {
        const el = document.getElementById("team");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section id="team" className="overflow-hidden" ref={wrapRef} style={{ background: "var(--surface)" }}>
      <div className="flex items-center" style={{ height: "70vh", minHeight: "480px" }}>

        {/* Sticky label panel */}
        <div className="team-label-panel flex-shrink-0 w-[280px] px-8 hidden lg:block">
          <div className="sec-label mb-3">// THE TEAM</div>
          <h2 className="sec-title" style={{ fontSize: "1.8rem" }}>
            People<br />behind SDC
          </h2>
          <p className="text-[.83rem] mt-3 leading-relaxed" style={{ color: "var(--sub)" }}>
            Engineers, designers, and organisers building the community.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--grad)" }} />
              <span className="text-[.72rem]" style={{ color: "var(--muted)" }}>Tech Team</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255,61,110,.5)" }} />
              <span className="text-[.72rem]" style={{ color: "var(--muted)" }}>Core Team</span>
            </div>
          </div>
          <div className="mt-6 text-[.7rem] tracking-wider" style={{ color: "var(--muted)" }}>
            SCROLL TO EXPLORE →
          </div>
        </div>

        {/* Scrolling track */}
        <div ref={trackRef} className="flex gap-6 pl-6 pr-6" style={{ willChange: "transform" }}>

          {/* Tech Team group label */}
          <div className="tcard flex-shrink-0 flex items-center justify-center" style={{ width: 140 }}>
            <div className="text-center">
              <div className="gtext font-extrabold" style={{ fontSize: "1.1rem", letterSpacing: "0.12em" }}>TECH</div>
              <div className="gtext font-extrabold" style={{ fontSize: "1.1rem", letterSpacing: "0.12em" }}>TEAM</div>
              <div className="mt-3 w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, rgba(255,61,110,.5), transparent)" }} />
            </div>
          </div>

          {TECH_TEAM.map((m, i) => (
            <div key={m.name} className="tcard flex-shrink-0" style={{ width: 260 }}>
              <TeamMemberCard member={{ ...m, team: "Tech Team" }} gradient={GRADIENTS[i % GRADIENTS.length]} />
            </div>
          ))}

          {/* Divider */}
          <div className="tcard flex-shrink-0 flex items-center" style={{ width: 80 }}>
            <div className="w-px h-40 mx-auto" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,61,110,.25), transparent)" }} />
          </div>

          {/* Core Team group label */}
          <div className="tcard flex-shrink-0 flex items-center justify-center" style={{ width: 140 }}>
            <div className="text-center">
              <div className="gtext font-extrabold" style={{ fontSize: "1.1rem", letterSpacing: "0.12em" }}>CORE</div>
              <div className="gtext font-extrabold" style={{ fontSize: "1.1rem", letterSpacing: "0.12em" }}>TEAM</div>
              <div className="mt-3 w-px h-12 mx-auto" style={{ background: "linear-gradient(to bottom, rgba(255,61,110,.5), transparent)" }} />
            </div>
          </div>

          {CORE_TEAM.map((m, i) => (
            <div key={m.name} className="tcard flex-shrink-0" style={{ width: 260 }}>
              <TeamMemberCard member={{ ...m, team: "Core Team" }} gradient={GRADIENTS[i % GRADIENTS.length]} />
            </div>
          ))}

          {/* Spacer to fix browser flex scroll padding-right cutoff bug */}
          <div className="flex-shrink-0" style={{ width: 160 }} />

        </div>
      </div>
    </section>
  );
}

/* Individual card */
function TeamMemberCard({ member, gradient }: { member: MemberCard; gradient: string }) {
  const isPlaceholder = member.photo.includes("/assets/team/");

  return (
    <div
      className="rounded-[18px] overflow-hidden flex flex-col"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        minHeight: 320,
        transition: "border-color .25s, transform .3s var(--ease-out), box-shadow .3s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,61,110,.35)";
        el.style.transform = "translateY(-8px)";
        el.style.boxShadow = "0 24px 50px rgba(0,0,0,.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Photo area */}
      <div className="relative w-full flex-shrink-0" style={{ height: 180, background: "var(--surface)" }}>
        {isPlaceholder ? (
          /* Placeholder avatar until photo is added */
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(249,115,22,.08), rgba(255,61,110,.08))" }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-extrabold text-2xl"
              style={{ background: gradient }}
            >
              {member.initials}
            </div>
          </div>
        ) : (
          <Image src={member.photo} alt={member.name} fill className="object-cover object-top" sizes="260px" />
        )}
        {/* Team badge */}
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[.6rem] font-bold tracking-wider text-white"
          style={{ background: member.team === "Tech Team" ? "rgba(249,115,22,.85)" : "rgba(255,61,110,.85)", backdropFilter: "blur(6px)" }}
        >
          {member.team}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-1.5 flex-1">
        <div className="font-bold text-[.95rem]" style={{ color: "var(--text)" }}>{member.name}</div>
        <div className="text-[.75rem]" style={{ color: "var(--muted)" }}>{member.role}</div>
        <div className="mt-auto pt-3">
          <div
            className="h-[2px] rounded-full w-8"
            style={{ background: gradient }}
          />
        </div>
      </div>
    </div>
  );
}
