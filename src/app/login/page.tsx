"use client";

import { signInAction } from "@/app/actions/auth";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signinModel } from "../models/auth.model";
import { useAuthStore } from "../store/store";

export default function LoginPage() {
  const { setAuthenticated } = useAuthStore();
  const router = useRouter();

  const [lastResult, action, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const submission = parseWithZod(formData, { schema: signinModel });
      if (submission.status !== "success") {
        return submission.reply();
      }

      const res = await signInAction(formData);

      if (res?.error) {
        return submission.reply({
          formErrors: [res.error],
        });
      }

      const token = res.data.accessToken;
      setAuthenticated(true, token);

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
      return submission.reply();
    },
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinModel });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

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
        <form
          {...getFormProps(form)}
          action={action}
          className="mt-8 space-y-5"
        >
          {/* Email input field */}
          <div>
            <label
              htmlFor={fields.email.id}
              className="text-sm font-semibold text-[#2B0F05]"
            >
              Email
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <Mail className="shrink-0 text-[#8F3E13]" size={18} />
              <input
                {...getInputProps(fields.email, { type: "email" })}
                placeholder="you@example.com"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                disabled={isPending}
              />
            </div>
            {fields.email.errors && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {fields.email.errors}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div>
            <label
              htmlFor={fields.password.id}
              className="text-sm font-semibold text-[#2B0F05]"
            >
              Password
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <Lock className="shrink-0 text-[#8F3E13]" size={18} />
              <input
                {...getInputProps(fields.password, { type: "password" })}
                placeholder="••••••••"
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none"
                disabled={isPending}
              />
            </div>
            {fields.password.errors && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {fields.password.errors}
              </p>
            )}
          </div>

          {/* Error Message banner */}
          {form.errors && (
            <div
              className="animate-fade-in rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600"
              role="alert"
            >
              {form.errors}
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
