"use client";

import { signInAction } from "@/app/actions/auth";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAuthStore } from "../store/store";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const { setAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const targetForm = e.currentTarget;

    startTransition(async () => {
      const res = await signInAction(formData);

      if (res?.error) {
        setError(res.error);
        return;
      }

      const token = res.data.accessToken;

      setAuthenticated(true, token);
      targetForm.reset();

      const role = res.data?.role;
      const workerId = res.data?.workerId ?? null;
      const recruiterId = res.data?.recruiterId ?? null;

      const redirectPath =
        role === "worker"
          ? workerId
            ? "/applications/workers"
            : "/profile"
          : role === "recruiter"
            ? recruiterId
              ? "/applications/recruiters"
              : "/profile"
            : "/";

      router.push(redirectPath);
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4] px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        {/* Back Button */}
        <Link
          href="/"
          title="Go Back"
          className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5E7DA] text-[#8F3E13] transition-all duration-300 hover:scale-105 hover:bg-[#EFD8C4]"
        >
          <ArrowLeft size={20} />
        </Link>

        {/* Header */}
        <div className="mt-4 text-center">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-[#F5E7DA] p-4">
              <Sparkles className="text-[#8F3E13]" />
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-black text-[#2B0F05]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">Login to Rozgaar AI</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email input field */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-[#2B0F05]"
            >
              Email
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <Mail className="shrink-0 text-[#8F3E13]" size={18} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                disabled={isPending}
                required
              />
            </div>
          </div>

          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-semibold text-[#2B0F05]"
            >
              Password
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <Lock className="shrink-0 text-[#8F3E13]" size={18} />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                disabled={isPending}
                required
              />
            </div>
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

          {/* Dynamic Submission Control */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-2xl bg-[#5B1E05] py-4 font-semibold text-white transition hover:bg-[#3F1203] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Navigation */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#8F3E13] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
