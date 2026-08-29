"use client";

import { useAuthStore } from "@/app/store/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ProfileRedirectPage() {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warning("Please log in to continue to your applications.");
      router.push("/login");
      return;
    }

    if (role === "recruiter") {
      toast.info("Opening recruiter applications.");
      router.replace("/applications/recruiters");
    } else if (role === "worker") {
      toast.info("Opening worker applications.");
      router.replace("/applications/workers");
    }
  }, [isAuthenticated, role, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
      <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
    </div>
  );
}
