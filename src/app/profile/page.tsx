"use client";

import { useAuthStore } from "@/app/store/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileRedirectPage() {
  const { isAuthenticated, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (role === "recruiter") {
      router.replace("/profile/recruiter");
    } else if (role === "worker") {
      router.replace("/profile/worker");
    }
  }, [isAuthenticated, role, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
      <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
    </div>
  );
}
