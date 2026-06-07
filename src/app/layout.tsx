import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import LenisProvider from "@/components/LenisProvider";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "SDC INDIA | Student Developers Community",
  description:
    "SDC INDIA is a student-led developer community founded in 2022 at SNIST. Bridging academic learning and industry through hackathons, workshops, and real-world projects.",
  openGraph: {
    title: "SDC INDIA — Student Developers Community",
    description:
      "Founded in 2022 at SNIST. 5000+ members, 50+ events, 120+ workshops.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Anti-flash: set theme before React hydrates */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('sdc-theme');
            if (t === 'dark') {
              document.documentElement.setAttribute('data-theme', 'dark');
            } else {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          } catch(e) {
            document.documentElement.setAttribute('data-theme', 'light');
          }
        ` }} />
      </head>
      <body className="antialiased">
        {/* Intro preloader — shows once per session */}
        <Preloader />

        {/* Scroll progress bar at top */}
        <ScrollProgress />

        {/* Cursor glow */}
        <CursorGlow />

        {/* Lenis smooth scroll + GSAP ScrollTrigger */}
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
