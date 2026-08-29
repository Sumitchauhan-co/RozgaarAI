"use client";

import { signInAction } from "@/app/features/auth/actions/auth";
import {
  fetchRecruiterProfileAction,
  fetchWorkerProfileAction,
} from "@/app/features/auth/actions/profile";
import { signinModel } from "@/app/server/models/auth.model";
import { useAuthStore } from "@/app/store/store";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { setAuthenticated, setRecruiterId, setWorkerId } = useAuthStore();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);

    const parsed = signinModel.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof LoginFormValues;
        if (field) {
          setError(field, {
            type: "manual",
            message: issue.message,
          });
        }
      });
      return;
    }

    const formData = new FormData();
    formData.set("email", parsed.data.email);
    formData.set("password", parsed.data.password);

    const res = await signInAction(formData);

    if (res?.error) {
      setFormError(res.error);
      return;
    }

    const token = res.data.accessToken;
    setAuthenticated(true, token);

    const role = res.data.user.role;

    if (role === "worker") {
      const profile = await fetchWorkerProfileAction();
      setWorkerId(profile.id);
    } else if (role === "recruiter") {
      const profile = await fetchRecruiterProfileAction();
      setRecruiterId(profile.id);
    }

    router.back();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4] px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        <Link
          href="/"
          title="Go Back"
          className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5E7DA] text-[#8F3E13] transition-all duration-300 hover:scale-105 hover:bg-[#EFD8C4]"
        >
          <ArrowLeft size={20} />
        </Link>

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-5"
        >
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
                {...register("email")}
                placeholder="you@example.com"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-[#2B0F05]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-[#8F3E13] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <Lock className="shrink-0 text-[#8F3E13]" size={18} />
              <input
                id="password"
                type="password"
                {...register("password")}
                placeholder="••••••••"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                disabled={isSubmitting}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {formError && (
            <div
              className="animate-fade-in rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#5B1E05] py-4 font-semibold text-white transition hover:bg-[#3F1203] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

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
