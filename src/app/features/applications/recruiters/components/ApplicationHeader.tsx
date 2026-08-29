"use client";

import { Home, Plus, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ApplicationHeaderProps {
  onOpenCreateModal: () => void;
}

export default function ApplicationHeader({
  onOpenCreateModal,
}: ApplicationHeaderProps) {
  const router = useRouter();

  return (
    <section className="bg-gradient-to-r from-[#5B1E05] to-[#8F3E13] py-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 sm:flex-row sm:items-center lg:px-10">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <Sparkles className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white">
              Workers Applications
            </h1>
            <p className="mt-1 text-white/80">Explore workers opportunities</p>
          </div>
        </div>

        {/* NAVIGATION AND ACTION ROW */}
        <div className="flex flex-wrap gap-3 self-start sm:self-auto">
          <button
            onClick={() => {
              toast.info("Taking you back home.");
              router.push("/");
            }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20"
          >
            <Home size={20} /> Back to Home
          </button>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-[#8F3E13] shadow-lg transition hover:bg-orange-50"
          >
            <Plus size={20} /> Create Recruiter Application
          </button>
        </div>
      </div>
    </section>
  );
}
