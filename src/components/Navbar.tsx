"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavItem = { href: string; label: string; cta?: boolean };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/highlights", label: "Highlights" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/host", label: "Host With Us", cta: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-4 md:px-8 py-2.5 backdrop-blur-xl"
      style={{
        background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
        borderBottom: `1px solid ${scrolled ? "var(--nav-border-scrolled)" : "var(--nav-border)"}`,
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,.18)" : "none",
        transition: "background .3s, border-color .3s, box-shadow .3s",
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div
          className="relative w-[36px] h-[36px] rounded-lg overflow-hidden flex-shrink-0"
          style={{ boxShadow: "0 0 14px rgba(255,61,110,.3)" }}
        >
          <Image
            src="/assets/blog/sdc-india-logo.jpeg"
            alt="SDC Logo"
            fill
            className="object-cover"
            sizes="36px"
            priority
          />
        </div>
        <span className="hidden md:inline font-extrabold text-[.88rem]" style={{ color: "var(--text)" }}>
          SDC INDIA · Student Developers Community
        </span>
        <span className="md:hidden font-extrabold text-sm" style={{ color: "var(--text)" }}>
          SDC INDIA
        </span>
      </Link>

      {/* Desktop nav */}
      <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block text-[.8rem] font-medium px-3.5 py-1.5 rounded-md"
              style={
                item.cta
                  ? { color: "#fff", background: "var(--grad)", fontWeight: 700, boxShadow: "0 0 18px rgba(255,61,110,.3)", transition: "box-shadow .2s" }
                  : {
                      color: isActive(item.href) ? "var(--text)" : "var(--sub)",
                      background: isActive(item.href) ? "rgba(255,61,110,.1)" : "transparent",
                      border: isActive(item.href) ? "1px solid rgba(255,61,110,.22)" : "1px solid transparent",
                      transition: "background .2s, color .2s, border-color .2s",
                    }
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Theme toggle — always visible */}
        <ThemeToggle />

        {/* Mobile menu toggle */}
        <button
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden w-9 h-9 rounded-md flex items-center justify-center"
          style={{ border: "1px solid var(--border2)", background: "var(--card)", cursor: "pointer" }}
        >
          <span style={{ color: "var(--text)", fontSize: "1.1rem" }}>{mobileOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden absolute top-full left-0 right-0 overflow-hidden"
        style={{
          maxHeight: mobileOpen ? "440px" : "0",
          transition: "max-height .35s cubic-bezier(.19,1,.22,1)",
          background: "var(--nav-mob-bg)",
          borderBottom: mobileOpen ? "1px solid var(--nav-border)" : "none",
          backdropFilter: "blur(24px)",
        }}
      >
        <ul className="flex flex-col gap-1 list-none m-0 p-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-sm font-medium px-3 py-2.5 rounded-md"
                style={
                  item.cta
                    ? { color: "#fff", background: "var(--grad)", fontWeight: 700, textAlign: "center" }
                    : {
                        color: isActive(item.href) ? "var(--text)" : "var(--sub)",
                        background: isActive(item.href) ? "rgba(255,61,110,.1)" : "transparent",
                      }
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
