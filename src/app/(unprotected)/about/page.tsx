"use client";

import { useAuthStore } from "@/app/store/store";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";

const STATS = [
  { value: "10k+", label: "Verified Workers" },
  { value: "98%", label: "Match Accuracy" },
  { value: "5k+", label: "Recruiters Onboarded" },
  { value: "24/7", label: "AI Assistance" },
];

const FEATURES = [
  {
    icon: Bot,
    title: "Natural Language AI Search",
    description:
      "Instead of rigid keywords, type or speak natural phrases like 'Find painter jobs in Delhi paying above ₹15,000' to get instant matches.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Employers & Candidates",
    description:
      "We prioritize trust. Verified employer badges and worker ratings ensure safe, reliable employment choices for everyone.",
  },
  {
    icon: Users,
    title: "Role-Tailored Dashboards",
    description:
      "Distinct experiences crafted for recruiters looking to post opportunities and workers seeking tailored job applications.",
  },
];

const VISION_POINTS = [
  "Direct application submission without complex forms",
  "Affordable 30-day basic and pro search passes",
  "Instant applicant updates and status tracking",
  "Localized job recommendations near your city",
];

export default function AboutPage() {
  const { role, isAuthenticated } = useAuthStore();

  const getCtaLink = () => {
    if (!isAuthenticated) return "/login";
    return role === "recruiter" ? "/hire" : "/jobs";
  };

  const getCtaText = () => {
    if (!isAuthenticated) return "Get Started Now";
    return role === "recruiter"
      ? "Post a Job Application"
      : "Explore Job Matches";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FCFBF9] text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:px-12 md:pt-28 md:pb-24">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[450px] w-[500px] -translate-x-1/2 rounded-full bg-[#8F3E13]/15 blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-10 -z-10 h-72 w-72 rounded-full bg-[#5B1E05]/10 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#ECE3DA] bg-[#F8ECE4]/80 px-4 py-1.5 text-xs font-bold tracking-wider text-[#8F3E13] uppercase backdrop-blur-sm"
          >
            <Sparkles size={14} />
            <span>Empowering the Workforce</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-tight text-[#2B0F05] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Bridging Talent and Opportunity with{" "}
            <span className="bg-gradient-to-r from-[#8F3E13] via-[#D9732B] to-[#5B1E05] bg-clip-text text-transparent">
              Smart AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#55463E] sm:text-lg md:text-xl"
          >
            RozgaarAI transforms traditional hiring and job search into a fast,
            transparent, and intelligent experience. We connect verified workers
            with top recruiters through conversational AI search.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href={getCtaLink()}
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              <span>{getCtaText()}</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/pricing"
              className="rounded-2xl border border-[#ECE3DA] bg-white px-8 py-4 font-bold text-[#5B1E05] shadow-xs transition-all duration-200 hover:border-[#8F3E13]/30 hover:bg-[#F8ECE4]/50"
            >
              View Pricing Plans
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="border-y border-[#ECE3DA] bg-[#F8ECE4]/40 px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-4xl font-black text-[#5B1E05] md:text-5xl">
                {stat.value}
              </p>
              <p className="text-xs font-bold tracking-wider text-[#8F3E13]/80 uppercase md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features / Mission */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
              Why Choose Us
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
              Why Choose RozgaarAI?
            </h2>
            <p className="mt-3 text-[#6D645F]">
              Designed to serve both job seekers and hirers effortlessly.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-3xl border border-[#ECE3DA] bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#8F3E13]/30 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8ECE4] text-[#8F3E13] transition-colors duration-300 group-hover:bg-[#8F3E13] group-hover:text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#2B0F05]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6D645F]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition List */}
      <section className="bg-[#F8ECE4]/30 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#ECE3DA] bg-white p-8 shadow-sm md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
                Our Vision
              </span>
              <h2 className="mt-2 text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
                Equal Access to Opportunity for All
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6D645F]">
                RozgaarAI eliminates complex friction points in blue-collar and
                skilled labor markets, providing direct communication, instant
                hiring passes, and transparent job listings.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4">
              {VISION_POINTS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F8ECE4] text-[#8F3E13]">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-semibold text-[#2B0F05]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center md:px-12">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] px-8 py-16 text-white shadow-2xl">
          {/* Subtle Ambient Accent */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md">
              <Briefcase className="h-7 w-7 text-[#F6C98F]" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">
              Ready to transform how you find work or hire?
            </h2>
            <p className="mt-3 text-sm text-white/80 md:text-base">
              Join thousands of active workers and employers building better
              futures together.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={getCtaLink()}
                className="rounded-2xl bg-white px-8 py-4 font-bold text-[#5B1E05] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#F8ECE4] active:scale-95"
              >
                {getCtaText()}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
