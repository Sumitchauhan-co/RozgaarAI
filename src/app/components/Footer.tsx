import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Jobs", href: "/jobs" },
  { label: "Hire", href: "/hire" },
  { label: "Applications", href: "/applications" },
  { label: "About", href: "/about" },
];

const FEATURES = [
  "AI Job Matching",
  "Verified Employers",
  "Fair Wage System",
  // "Multilingual Support",
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "sumit.chauhan.code@gmail.com",
    href: "mailto:sumit.chauhan.code@gmail.com",
  },
  {
    icon: Phone,
    label: "+91 98267 87350",
    href: "tel:+919826787350",
  },
  {
    icon: MapPin,
    label: "Bhopal, India",
    href: null,
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-[#612109] bg-[#3B1102] text-white">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-[#8F3E13]/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* BRAND (Spans 2 columns on desktop) */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-[#F6C98F] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20">
                <BriefcaseBusiness size={20} />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Rozgaar<span className="text-[#F6C98F]">AI</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              AI-powered employment platform connecting skilled workers with
              trusted employers across India.
            </p>

            {/* Quick Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Empowering Bharat&apos;s Workforce
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#F6C98F] uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {QUICK_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-[#F6C98F] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#F6C98F] uppercase">
              Features
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {FEATURES.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F6C98F]/60" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-[#F6C98F] uppercase">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/70">
              {CONTACT_INFO.map((item, idx) => {
                const Icon = item.icon;
                const Content = (
                  <>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#F6C98F] transition-colors group-hover:bg-white/10">
                      <Icon size={15} />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </>
                );

                return (
                  <li key={idx}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex items-center gap-3 transition-colors hover:text-white"
                      >
                        {Content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">{Content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/60">
            © 2026 Rozgaar AI. All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur-md">
            <Sparkles size={14} className="text-[#F6C98F]" />
            <span>Built for connecting India’s workforce</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
