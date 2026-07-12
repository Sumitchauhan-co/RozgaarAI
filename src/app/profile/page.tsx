"use client";

import { useAuthStore } from "@/app/store/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import api from "../utils/api";

interface UserSession {
  role: "worker" | "recruiter" | string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default function ProfileRedirectPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const checkRoleAndRedirect = async () => {
      try {
        const response =
          await api.get<ApiResponse<UserSession>>("/api/auth/getUser");
        if (response.data?.success && response.data?.data) {
          const role = response.data.data.role;

          if (role === "recruiter") {
            router.replace("/profile/recruiter");
          } else {
            router.replace("/profile/worker");
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Failed to route user:", err);
        router.push("/login");
      }
    };

    checkRoleAndRedirect();
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#FCFBF9]">
      <Loader2 className="h-10 w-10 animate-spin text-[#5B1E05]" />
    </div>
  );
}
