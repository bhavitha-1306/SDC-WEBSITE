"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AvatarGroup,
  AvatarGroupTooltip,
} from "@/components/animate-ui/components/animate/avatar-group";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { boardMembersStub, coreMembersStub, techLeadsStub } from "@/data/about";
import type { TeamMember } from "@/types/about";

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  id: number;
  title: string;
  description: string;
  members: TeamMember[];
  index: number;
  totalCards: number;
  color: string;
}

const cardData: Omit<CardProps, "index" | "totalCards">[] = [
  {
    id: 1,
    title: "Board",
    description: "Strategic leadership driving vision, governance, and long-term growth across SDC chapters.",
    members: boardMembersStub,
    color: "rgba(235, 235, 235, 0.7)",
  },
  {
    id: 2,
    title: "Tech Leads",
    description: "Engineering mentors who define standards, guide architecture, and accelerate product execution.",
    members: techLeadsStub,
    color: "rgba(235, 235, 235, 0.7)",
  },
  {
    id: 3,
    title: "Core Members",
    description: "Builders and operators running events, content, and community systems at day-to-day scale.",
    members: coreMembersStub,
    color: "rgba(235, 235, 235, 0.7)",
  },
];

const Card: React.FC<CardProps> = ({ title, description, members, index, totalCards, color }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const targetScale = 1 - (totalCards - index) * 0.05;

    gsap.set(card, {
      scale: 1,
      transformOrigin: "center top",
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(1, targetScale, progress);

        gsap.set(card, {
          scale: Math.max(scale, targetScale),
          transformOrigin: "center top",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, totalCards]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "62%",
          height: "380px",
          borderRadius: "24px",
          isolation: "isolate",
          padding: "4px",
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            ${color} 70deg,
            rgba(255,255,255,0.55) 130deg,
            transparent 190deg,
            rgba(255,255,255,0.35) 300deg,
            transparent 360deg
          )`,
          top: `calc(-5vh + ${index * 25}px)`,
          transformOrigin: "top",
        }}
        className="card-content"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: "20px",
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
            backdropFilter: "blur(25px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "60%",
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(196, 196, 196, 0.08) 50%, transparent 100%)",
              pointerEvents: "none",
              borderRadius: "24px 24px 0 0",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              right: "10px",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
              borderRadius: "1px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "2px",
              height: "100%",
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
              borderRadius: "24px 0 0 24px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 2px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 1px, transparent 2px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 2px)",
              backgroundSize: "30px 30px, 25px 25px, 35px 35px",
              pointerEvents: "none",
              borderRadius: "24px",
              opacity: 0.7,
            }}
          />

          <div style={{ position: "relative", zIndex: 2, padding: "2rem", height: "100%", overflow: "auto" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
                padding: "1.1rem 1.2rem",
                backdropFilter: "blur(2px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 700 }}>{title}</h3>
              <p style={{ color: "#ececec", marginTop: "0.75rem", maxWidth: "55ch" }}>{description}</p>

              <div style={{ marginTop: "1rem" }}>
                <AvatarGroup className="h-14 -space-x-2" invertOverlap={false} side="top" sideOffset={16}>
                  {members.slice(0, 6).map((member) => (
                    <Avatar key={`${title}-avatar-${member.name}`} className="size-14 border-2 border-[#151515]">
                      <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=111111&color=e5e5e5&bold=true`}
                        alt={member.name}
                      />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                      <AvatarGroupTooltip>{member.name}</AvatarGroupTooltip>
                    </Avatar>
                  ))}
                </AvatarGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StackedCards: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.fromTo(
      container,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
    );
  }, []);

  return (
    <main ref={containerRef} style={{ background: "#0a0a0a" }}>

      <section style={{ color: "#ffffff", width: "100%" }}>
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            members={card.members}
            index={index}
            totalCards={cardData.length}
            color={card.color}
          />
        ))}
      </section>
    </main>
  );
};

export default StackedCards;
