"use client";

import DualValueProp from "./DualValueProp";
import FaqSection from "./FaqSection";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import TestimonialsSection from "./TestimonialsSection";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#FCFBF9]">
      <HeroSection />
      {/* <CategoryExplorer /> */}
      <HowItWorks />
      <DualValueProp />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
