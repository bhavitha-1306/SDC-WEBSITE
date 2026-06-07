import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cardData = [
  {
    id: 1,
    title: "Board",
    description: "Strategic leadership driving vision, governance, and long-term growth across SDC chapters.",
    color: "rgba(163, 166, 255, 0.8)",
  },
  {
    id: 2,
    title: "Tech Leads",
    description: "Engineering mentors who define standards, guide architecture, and accelerate product execution.",
    color: "rgba(193, 128, 255, 0.8)",
  },
  {
    id: 3,
    title: "Core Members",
    description: "Builders and operators running events, content, and community systems at day-to-day scale.",
    color: "rgba(140, 231, 255, 0.8)",
  },
]
