"use client";

import { searchJobsAction } from "@/app/features/jobs/actions/jobSearch";
import AiJobResponse from "@/app/features/jobs/components/AiJobResponse";
import { useAuthStore } from "@/app/store/store";
import { Loader2, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MAX_CHAR_LIMIT = 250;

export default function JobsPage() {
  const { role, isHydrated, isAuthenticated } = useAuthStore();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (isHydrated) {
      if (!isAuthenticated || role !== "worker") {
        toast.warning("Please sign in as a worker to access AI job search.");
        router.replace("/hire");
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

    const data = await searchJobsAction(prompt);

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
      setError(data.error || "Failed to find matching job applications.");
    }

    setLoading(false);
  };

  const handleQuickFilter = (tag: string) => {
    const filterPrompts: Record<string, string> = {
      "🔥 AI Match": "Find jobs matching my core skills and work history",
      "⭐ Verified": "Show verified employers with high worker ratings",
      "💼 Full Time": "Find full-time permanent positions",
      "🕒 Part Time": "Find flexible or part-time job opportunities",
      "📍 Nearby": "Search job openings near my city",
      "⚡ Urgent Hiring": "Show jobs that need workers immediately",
    };

    const targetPrompt = filterPrompts[tag] || `Find jobs related to ${tag}`;
    setPrompt(targetPrompt.slice(0, MAX_CHAR_LIMIT));
  };

  if (!isHydrated || role !== "worker") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-white via-orange-50 to-white">
        <div className="flex items-center gap-3 rounded-full border border-orange-200 bg-white/80 px-5 py-3 shadow-md backdrop-blur-sm">
          <Loader2 className="h-5 w-5 animate-spin text-[#8F3E13]" />
          <span className="text-sm font-medium text-[#5B1E05]">
            Verifying worker permissions...
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
          🚀 AI Powered Job Discovery
        </span>

        <h1 className="mt-8 text-6xl leading-tight font-extrabold md:text-7xl">
          <span className="bg-linear-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] bg-clip-text text-transparent">
            Find Work
          </span>
          <br />
          <span className="text-gray-900">Near You.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600">
          Discover verified recruiter job applications matching your exact
          skills using natural language AI search.
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
                placeholder="Ask AI e.g., 'Find painter jobs in Delhi paying above 15,000 INR per month'"
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

            {/* Character Counter */}
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
              "💼 Full Time",
              "🕒 Part Time",
              "📍 Nearby",
              "⚡ Urgent Hiring",
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
        <AiJobResponse response={response} error={error} loading={loading} />
      </section>
    </main>
  );
}
