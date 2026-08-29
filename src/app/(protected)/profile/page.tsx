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
      toast.warning("Please log in to view your profile.");
      router.push("/login");
      return;
    }

    if (role === "recruiter") {
      toast.info("Opening your recruiter profile.");
      router.replace("/profile/recruiter");
    } else if (role === "worker") {
      toast.info("Opening your worker profile.");
      router.replace("/profile/worker");
    }
  }, [isAuthenticated, role, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
      <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
    </div>
  );
}
