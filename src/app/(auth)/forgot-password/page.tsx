"use client";

import { forgotPasswordAction } from "@/app/features/auth/actions/auth";
import { forgotPasswordModel } from "@/app/server/models/auth.model";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setFormError(null);
    setSuccessMessage(null);

    const parsed = forgotPasswordModel.safeParse(values);
    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof ForgotPasswordFormValues;
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

    const res = await forgotPasswordAction(formData);

    if (res?.error) {
      setFormError(res.error);
      return;
    }

    setSuccessMessage(
      "A password reset link has been sent to your email if that account exists."
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4] px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        <Link
          href="/login"
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
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email to receive a reset link
          </p>
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

          {formError && (
            <div
              className="animate-fade-in rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {formError}
            </div>
          )}

          {successMessage && (
            <div
              className="animate-fade-in rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700"
              role="status"
            >
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-[#5B1E05] py-4 font-semibold text-white transition hover:bg-[#3F1203] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#8F3E13] hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
