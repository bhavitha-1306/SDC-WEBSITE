export interface Highlight {
  id: string;
  team: string;
  initials: string;
  position: string;       // "1st" | "2nd" | "3rd"
  positionIcon: string;   // emoji
  event: string;
  eventDate: string;
  eventImage: string;
  description: string;
  gradient: string;
  stats: { value: string; label: string }[];
}

export const HIGHLIGHTS: Highlight[] = [
  {
    id: "dhanvantari",
    team: "Dhanvantari Team",
    initials: "DT",
    position: "1st",
    positionIcon: "🏆",
    event: "VIBE CODE Hackathon",
    eventDate: "November 2025",
    eventImage: "/assets/events/vibe-code-hackathon.jpg",
    description:
      "Crowned champions of VIBE CODE 2025 — a 12-hour AI-focused hackathon at Draper Startup House. Their winning entry showcased rapid ideation, technical depth, and a real-world problem solved through AI-driven engineering.",
    gradient: "linear-gradient(135deg,#e84393,#f97316)",
    stats: [
      { value: "1st", label: "PLACE" },
      { value: "12h", label: "BUILD TIME" },
      { value: "200", label: "COMPETITORS" },
      { value: "AI", label: "FOCUS" },
    ],
  },
  {
    id: "hackstreet",
    team: "HackstreetBoys",
    initials: "HB",
    position: "2nd",
    positionIcon: "🥈",
    event: "VIBE CODE Hackathon",
    eventDate: "November 2025",
    eventImage: "/assets/events/vibe-code-hackathon.jpg",
    description:
      "Strong runners-up at VIBE CODE Hackathon 2025. Shipped an AI-driven product in 12 hours alongside 200 fellow developers — demonstrating sharp engineering and team coordination under time pressure.",
    gradient: "linear-gradient(135deg,#c2185b,#e84393)",
    stats: [
      { value: "2nd", label: "PLACE" },
      { value: "12h", label: "BUILD TIME" },
      { value: "200", label: "COMPETITORS" },
      { value: "AI", label: "FOCUS" },
    ],
  },
  {
    id: "sticky",
    team: "Sticky Fingers",
    initials: "SF",
    position: "1st",
    positionIcon: "🏆",
    event: "Hash-It-Out Season 2",
    eventDate: "November 2024",
    eventImage: "/assets/events/hash-it-out-2.jpg",
    description:
      "Winners of Hash-It-Out Season 2 — SDC's Telangana state-level hackathon with 400 students. Solved a real-world problem with elegant code, clean architecture, and standout teamwork.",
    gradient: "linear-gradient(135deg,#22c55e,#06b6d4)",
    stats: [
      { value: "1st", label: "PLACE" },
      { value: "400", label: "COMPETITORS" },
      { value: "STATE", label: "LEVEL" },
      { value: "1", label: "DAY" },
    ],
  },
  {
    id: "mac1",
    team: "Team MAC 1",
    initials: "M1",
    position: "1st",
    positionIcon: "🏆",
    event: "UXplosion 2.0",
    eventDate: "September 2024",
    eventImage: "/assets/events/uxplosion-1.jpg",
    description:
      "Winners of UXplosion 2.0 — the five-day UI/UX bootcamp led by Madhu Pilli, culminating in a live design hackathon. Beautiful interface work, sharp execution, and a clear user-centered story.",
    gradient: "linear-gradient(135deg,#f97316,#c2185b)",
    stats: [
      { value: "1st", label: "PLACE" },
      { value: "150", label: "COMPETITORS" },
      { value: "6", label: "DAYS" },
      { value: "Figma", label: "TOOL" },
    ],
  },
  {
    id: "designsquat",
    team: "Team Design Squat",
    initials: "DS",
    position: "1st",
    positionIcon: "🏆",
    event: "UXplosion Season 1",
    eventDate: "June 2024",
    eventImage: "/assets/events/uxplosion-2.jpg",
    description:
      "Winners of UXplosion Season 1 — India's first UI/UX designing hackathon, mentored by Forbes 30U30 Asia honoree Frederick Devarampati. Strong concept, polished execution, deserved win.",
    gradient: "linear-gradient(135deg,#06b6d4,#c2185b)",
    stats: [
      { value: "1st", label: "PLACE" },
      { value: "180", label: "COMPETITORS" },
      { value: "7", label: "DAYS" },
      { value: "1st", label: "IN INDIA" },
    ],
  },
  {
    id: "techinnovators",
    team: "Tech Innovators (CMRCET)",
    initials: "TI",
    position: "1st",
    positionIcon: "🏆",
    event: "Hash-It-Out Season 1",
    eventDate: "October 2023",
    eventImage: "/assets/events/hackathon_event.png",
    description:
      "Winners of Hash-It-Out Season 1 — SDC's inaugural hackathon. The CMRCET team beat squads from SIET and SNIST with a sharp local-problem solution that earned them the top prize.",
    gradient: "linear-gradient(135deg,#f59e0b,#e84393)",
    stats: [
      { value: "1st", label: "PLACE" },
      { value: "200", label: "COMPETITORS" },
      { value: "3", label: "COLLEGES" },
      { value: "1st", label: "EDITION" },
    ],
  },
];

export function getHighlight(id: string): Highlight | undefined {
  return HIGHLIGHTS.find((h) => h.id === id);
}
