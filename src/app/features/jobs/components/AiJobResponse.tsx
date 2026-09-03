"use client";

import MarkdownRenderer from "@/app/components/ai/MarkdownRenderer";
interface AiJobResponseProps {
  response: string | null;
  error: string | null;
  loading: boolean;
}

export default function AiJobResponse({
  response,
  error,
  loading,
}: AiJobResponseProps) {
  if (loading) {
    return (
      <div className="mt-8 rounded-2xl border border-orange-100 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
        <p className="animate-pulse text-gray-500">
          Analyzing job market data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!response) return null;

  return (
    <div className="mt-8 rounded-3xl border border-orange-100 bg-white p-8 shadow-xl">
      <MarkdownRenderer content={response} />
    </div>
  );
}
