"use client";

import { resetPasswordAction } from "@/app/features/auth/actions/auth";
import { resetPasswordModel } from "@/app/server/models/auth.model";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setFormError(null);
    setSuccessMessage(null);

    const parsed = resetPasswordModel.safeParse({
      token,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });

    if (!parsed.success) {
      parsed.error.issues.forEach(issue => {
        const field = issue.path[0] as keyof ResetPasswordFormValues;
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
    formData.set("token", token);
    formData.set("newPassword", parsed.data.newPassword);
    formData.set("confirmPassword", parsed.data.confirmPassword);

    const res = await resetPasswordAction(formData);

    if (res?.error) {
      setFormError(res.error);
      return;
    }

    setSuccessMessage("Password reset successfully. Redirecting to login...");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  const missingToken = !token;

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
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create a new secure password
          </p>
        </div>

        {!missingToken ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold text-[#2B0F05]"
              >
                New Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
                <Lock className="shrink-0 text-[#8F3E13]" size={18} />
                <input
                  id="newPassword"
                  type="password"
                  {...register("newPassword")}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-[#2B0F05]"
              >
                Confirm Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
                <Lock className="shrink-0 text-[#8F3E13]" size={18} />
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                  disabled={isSubmitting}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {errors.confirmPassword.message}
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
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            Invalid or missing reset token. Please request a new password reset
            link.
          </div>
        )}

        <p className="mt-6 text-center text-sm text-gray-500">
          Need to go back?{" "}
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
