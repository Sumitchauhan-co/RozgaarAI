"use client";

import BackgroundDecorations from "./BackgroundDecorations";
import FeatureCards from "./FeatureCards";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF9]">
      {/* Background patterns, glows, and leaf decorations */}
      <BackgroundDecorations />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Main Grid: Left Typography + Right Visuals */}
        <div className="grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <HeroContent />
          <HeroVisual />
        </div>

        {/* 4-Column Feature Highlights */}
        <FeatureCards />
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[#FCFBF9] to-transparent" />
    </section>
  );
}
