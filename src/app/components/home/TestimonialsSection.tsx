"use client";

import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";
import StaticContributors from "./Contributors";

export const testimonials = [
  {
    name: "Ramesh Sharma",
    role: "Technical Recruiter, New Delhi",
    content:
      "The AI candidate evaluation tool parsed over 200 multilingual resumes in minutes. The Hindi prompt search made screening incredibly efficient.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Talent Acquisition Lead, Bangalore",
    content:
      "Screening candidate profiles used to take days. RozgaarAI automated our resume ranking and simplified candidate skill assessments.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "HR Operations Manager, Ahmedabad",
    content:
      "Evaluated and shortlisted candidates for 15 specialized roles in under 48 hours using the AI applicant scoring feature.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Recruitment Specialist, Jaipur",
    content:
      "The natural language prompt parsing allows our team to search candidate databases in regional languages effortlessly.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Engineering Manager, Pune",
    content:
      "Managing applicant evaluation pipelines on RozgaarAI saves our team over 10 hours every week.",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    role: "Lead Hiring Consultant, Mumbai",
    content:
      "The automated profile verification and AI skill scoring gave our hiring managers complete accuracy during initial rounds.",
    rating: 5,
  },
  {
    name: "Meenakshi Sundaram",
    role: "Logistics HR Lead, Chennai",
    content:
      "AI applicant ranking sorted candidate profiles by technical experience instantly. Outstanding SaaS tool for modern recruitment teams.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF9] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
            Trusted Across Bharat
          </h2>
          <p className="mt-2 text-sm text-[#6D645F]">
            Real stories from workers and recruiters on RozgaarAI
          </p>

          {/* Contributors Social Proof Pill */}
          <div className="mt-6">
            <StaticContributors />
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:35s]">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-80 shrink-0 rounded-3xl border border-[#ECE3DA] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#8F3E13]/30 hover:shadow-md md:w-96"
            >
              <div className="flex gap-1 text-[#D9732B]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#55463E] italic">
                &quot;{item.content}&quot;
              </p>
              <div className="mt-6 border-t border-[#ECE3DA]/60 pt-4">
                <p className="font-bold text-[#2B0F05]">{item.name}</p>
                <p className="text-xs text-[#7A726C]">{item.role}</p>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Side Gradients for Seamless Edge Fading */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#FCFBF9] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#FCFBF9] to-transparent" />
      </div>
    </section>
  );
}
