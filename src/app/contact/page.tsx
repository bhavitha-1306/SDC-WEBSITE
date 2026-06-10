import { Mail, Linkedin, Instagram } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

const SOCIALS = [
  { Icon: Mail,      label: "Email",     value: "admin@sdcindia01.com",          href: "mailto:admin@sdcindia01.com",          color: "#e84393" },
  { Icon: Linkedin,  label: "LinkedIn",  value: "SDC India",                     href: "https://linkedin.com/company/sdcindia",  color: "#0a66c2" },
  { Icon: Instagram, label: "Instagram", value: "@sdcindia",                    href: "https://instagram.com/sdcindia",       color: "#f97316" },
];

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="sec-label mb-2">// CONTACT US</div>
        <h1 className="sec-title">Let&apos;s connect</h1>
        <p className="sec-sub mb-10">Have questions, collaboration ideas, or speaker proposals? Reach out and we&apos;ll connect quickly.</p>

        <div className="grid lg:grid-cols-2 gap-7 lg:gap-12">
          <div>
            <div className="text-[.7rem] mb-4 font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Reach us on
            </div>
            <ul className="space-y-3 list-none p-0">
              {SOCIALS.map(({ Icon, label, value, href, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener" : undefined}
                    className="group flex items-center gap-4 py-2.5 transition-all hover:translate-x-1"
                    style={{ color: "var(--text)", textDecoration: "none" }}
                  >
                    <Icon size={26} strokeWidth={1.7} style={{ color, flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[.66rem] mb-0.5 uppercase tracking-wider" style={{ color: "var(--muted)" }}>{label}</div>
                      <div className="text-[.92rem] font-medium truncate group-hover:text-white transition-colors">{value}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </main>
  );
}
