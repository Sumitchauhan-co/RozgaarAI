"use client";

import { signUpAction } from "@/app/features/auth/actions/auth";
import {
  fetchRecruiterProfileAction,
  fetchWorkerProfileAction,
} from "@/app/features/auth/actions/profile";
import { signupModel } from "@/app/server/models/auth.model";
import { useAuthStore } from "@/app/store/store";
import { BriefcaseBusiness, Lock, Mail, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SignupFormValues = {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [role, setRole] = useState<"worker" | "recruiter">("worker");
  const { setAuthenticated, setRecruiterId, setWorkerId } = useAuthStore();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    defaultValues: { firstName: "", lastName: "", email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: SignupFormValues) => {
    setFormError(null);

    const parsed = signupModel.safeParse({ ...values, role });
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof SignupFormValues;
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
    formData.set("firstName", parsed.data.firstName);
    formData.set("lastName", parsed.data.lastName ?? "");
    formData.set("role", parsed.data.role);
    formData.set("email", parsed.data.email);
    formData.set("password", parsed.data.password);

    const res = await signUpAction(formData);

    if (res?.error) {
      setFormError(res.error);
      return;
    }

    const token = res?.data?.accessToken;
    const userRole = res.data.user.role;

    if (userRole === "worker") {
      const profile = await fetchWorkerProfileAction();
      setWorkerId(profile.id);
    } else if (userRole === "recruiter") {
      const profile = await fetchRecruiterProfileAction();
      setRecruiterId(profile.id);
    }

    if (token) {
      setAuthenticated(true, token);
      toast.success("Account created successfully. Welcome to RozgaarAI!");
      router.push("/");
      return;
    }

    setFormError("Authentication failed. No token received.");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4] px-4 py-8">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-10">
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

        <div className="mt-8">
          <p className="mb-2 text-sm font-semibold text-[#2B0F05]">I am a</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-6 space-y-4"
        >
          <div className="grid grid-cols-2 items-start gap-4">
            <div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
                <div className="shrink-0 text-[#8F3E13]">
                  <User size={18} />
                </div>
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
                <div className="shrink-0 text-[#8F3E13]">
                  <User size={18} />
                </div>
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  disabled={isSubmitting}
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <div className="shrink-0 text-[#8F3E13]">
                <Mail size={18} />
              </div>
              <input
                {...register("email")}
                placeholder="Email"
                disabled={isSubmitting}
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <div className="shrink-0 text-[#8F3E13]">
                <Lock size={18} />
              </div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                disabled={isSubmitting}
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
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
            className="w-full rounded-2xl bg-[#5B1E05] py-4 font-semibold text-white transition hover:bg-[#3f1203] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

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
