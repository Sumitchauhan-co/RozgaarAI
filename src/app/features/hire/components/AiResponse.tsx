"use client";

import { AlertTriangle, Check, Copy, Sparkles, UserCheck } from "lucide-react";
import { useState } from "react";

interface AiResponseDisplayProps {
  response: string | null;
  error: string | null;
  loading: boolean;
}

export default function AiResponse({
  response,
  error,
  loading,
}: AiResponseDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="mt-8 rounded-[30px] border border-orange-200/80 bg-white/70 p-8 shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#8F3E13]">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-900">
              Scanning Candidate Database...
            </p>
            <p className="text-xs text-gray-500">
              Filtering experience, certifications, and location metrics
            </p>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-4 w-3/4 animate-pulse rounded-lg bg-orange-100/60"></div>
          <div className="h-4 w-full animate-pulse rounded-lg bg-orange-100/40"></div>
          <div className="h-4 w-5/6 animate-pulse rounded-lg bg-orange-100/50"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50/80 p-5 text-red-700 shadow-sm backdrop-blur-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-red-900">Search Error</h4>
          <p className="mt-0.5 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!response) return null;

  return (
    <div className="mt-8 rounded-[30px] border border-orange-200 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between border-b border-orange-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF3E8] px-4 py-1.5 text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
            <UserCheck className="h-4 w-4" /> Matched Candidates
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 transition-all hover:border-[#8F3E13] hover:text-[#8F3E13] active:scale-95"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy Results</span>
            </>
          )}
        </button>
      </div>

      <div className="prose prose-orange max-w-none text-base leading-relaxed whitespace-pre-line text-gray-800">
        {response}
      </div>
    </div>
  );
}
