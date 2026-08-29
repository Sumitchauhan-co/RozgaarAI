"use client";

import { searchTalentAction } from "@/app/features/hire/actions/aiSearch";
import AiResponse from "@/app/features/hire/components/AiResponse";
import { useAuthStore } from "@/app/store/store";
import { Loader2, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MAX_CHAR_LIMIT = 250;

export default function HirePage() {
  const { role, isHydrated, isAuthenticated } = useAuthStore();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (isHydrated) {
      if (!isAuthenticated || role !== "recruiter") {
        toast.warning(
          "Please sign in as a recruiter to access AI talent search."
        );
        router.replace("/jobs");
      }
    }
  }, [isHydrated, isAuthenticated, role, router]);

  const handleAiSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (prompt.length > MAX_CHAR_LIMIT) {
      setError(`Prompt cannot exceed ${MAX_CHAR_LIMIT} characters.`);
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    const data = await searchTalentAction(prompt);

    if (data.success && data.text) {
      setResponse(
        typeof data.text === "string"
          ? data.text
          : JSON.stringify(data.text, null, 2)
      );
    } else {
      if (data.redirectToPricing) {
        toast.error(
          data.error ||
            "Your AI pass is unavailable. Redirecting to pricing to upgrade."
        );
        router.push("/pricing");
        return;
      }
      setError(data.error || "Failed to find matching candidate profiles.");
    }

    setLoading(false);
  };

  const handleQuickFilter = (tag: string) => {
    const filterPrompts: Record<string, string> = {
      "🔥 AI Match": "Find worker profiles matching candidate requirements",
      "⭐ Verified":
        "Show verified skilled workers with verified certifications",
      "👷 Skilled Workers": "Find experienced professional workers",
      "⚡ Instant Hire":
        "Show worker candidates available for immediate joining",
      "📍 Nearby": "Search candidate workers located in or near my city",
      "🌎 Multilingual": "Show workers fluent in multiple languages",
    };

    const targetPrompt =
      filterPrompts[tag] || `Find worker candidates skilled in ${tag}`;

    setPrompt(targetPrompt.slice(0, MAX_CHAR_LIMIT));
  };

  if (!isHydrated || role !== "recruiter") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-white via-orange-50 to-white">
        <div className="flex items-center gap-3 rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-md backdrop-blur-sm">
          <Loader2 className="h-5 w-5 animate-spin text-[#8F3E13]" />
          <span className="text-sm font-medium text-[#5B1E05]">
            Verifying recruiter permissions...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-linear-to-br from-white via-orange-50 to-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 rounded-full bg-[#8F3E13]/10 blur-3xl"></div>
      <div className="pointer-events-none absolute top-60 right-0 h-96 w-96 rounded-full bg-[#5B1E05]/10 blur-3xl"></div>

      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 font-medium text-[#5B1E05]">
          🚀 AI Powered Talent Discovery
        </span>

        <h1 className="mt-8 text-6xl leading-tight font-extrabold md:text-7xl">
          <span className="bg-linear-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] bg-clip-text text-transparent">
            Find Skilled
          </span>
          <br />
          <span className="text-gray-900">Talent Faster.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600">
          Discover verified worker profiles matching your required skills,
          location, and experience using natural language AI search.
        </p>

        {/* AI Prompt Input Interface */}
        <div className="mt-12 rounded-[30px] border border-orange-100 bg-white p-6 shadow-2xl">
          <form onSubmit={handleAiSearch} className="flex flex-col gap-2">
            <div className="flex items-center rounded-2xl border border-gray-200 px-5 py-4 transition focus-within:border-[#8F3E13] focus-within:ring-2 focus-within:ring-[#8F3E13]/20">
              <Sparkles className="shrink-0 text-[#8F3E13]" size={24} />
              <input
                type="text"
                value={prompt}
                maxLength={MAX_CHAR_LIMIT}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ask AI e.g., 'Find plumbers in Mumbai with at least 3 years experience'"
                className="ml-4 w-full text-lg text-gray-900 placeholder-gray-400 outline-none"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="ml-2 flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] px-6 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    <span>Search AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Character Counter & Limit Indicator */}
            <div className="flex justify-end px-2 pt-1 text-xs">
              <span
                className={`font-semibold ${
                  prompt.length >= MAX_CHAR_LIMIT
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {prompt.length} / {MAX_CHAR_LIMIT} characters
              </span>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "🔥 AI Match",
              "⭐ Verified",
              "👷 Skilled Workers",
              "⚡ Instant Hire",
              "📍 Nearby",
              "🌎 Multilingual",
            ].map(item => (
              <button
                key={item}
                onClick={() => handleQuickFilter(item)}
                className="rounded-full bg-orange-50 px-5 py-2 font-medium text-[#5B1E05] transition hover:bg-[#5B1E05] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated Response Component */}
        <AiResponse response={response} error={error} loading={loading} />
      </section>
    </main>
  );
}
