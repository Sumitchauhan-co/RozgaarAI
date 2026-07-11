"use client";

import { signUpAction } from "@/app/actions/auth";
import { BriefcaseBusiness, Lock, Mail, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAuthStore } from "../store/store";

export default function SignupPage() {
  const [role, setRole] = useState<"worker" | "recruiter">("worker");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { setAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("role", role);

    const targetForm = e.currentTarget;

    startTransition(async () => {
      const res = await signUpAction(formData);

      if (res?.error) {
        setError(res.error);
        return;
      }

      console.log(res);
      const token = res?.data?.accessToken;

      if (token) {
        setAuthenticated(true, token);
        targetForm.reset();
        router.push("/");
      } else {
        setError("Authentication failed. No token received.");
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4] px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-[#F5E7DA] p-4">
              <Sparkles className="text-[#8F3E13]" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-black text-[#2B0F05]">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">Join Rozgaar AI today</p>
        </div>

        {/* Role Selection Interactive Controls */}
        <div className="mt-8">
          <p className="mb-2 text-sm font-semibold text-[#2B0F05]">I am a</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setRole("worker")}
              className={`flex items-center justify-center gap-2 rounded-2xl border p-4 font-semibold transition ${
                role === "worker"
                  ? "border-[#5B1E05] bg-[#5B1E05] text-white"
                  : "border-gray-200 bg-white text-[#5B1E05] hover:bg-gray-50"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <User size={18} /> Worker
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={() => setRole("recruiter")}
              className={`flex items-center justify-center gap-2 rounded-2xl border p-4 font-semibold transition ${
                role === "recruiter"
                  ? "border-[#5B1E05] bg-[#5B1E05] text-white"
                  : "border-gray-200 bg-white text-[#5B1E05] hover:bg-gray-50"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <BriefcaseBusiness size={18} /> Recruiter
            </button>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* First Name & Last Name Input Group */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <div className="shrink-0 text-[#8F3E13]">
                <User size={18} />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                disabled={isPending}
                required
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <div className="shrink-0 text-[#8F3E13]">
                <User size={18} />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                disabled={isPending}
                required
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Email Input Field */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
            <div className="shrink-0 text-[#8F3E13]">
              <Mail size={18} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              disabled={isPending}
              required
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input Field */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
            <div className="shrink-0 text-[#8F3E13]">
              <Lock size={18} />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              disabled={isPending}
              required
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
            />
          </div>

          {/* Error Message banner */}
          {error && (
            <div
              className="animate-fade-in rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Submission Action Control */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-[#5B1E05] py-4 font-semibold text-white transition hover:bg-[#3f1203] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Footer Navigation link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="cursor-pointer font-semibold text-[#8F3E13] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
