"use client";

import { signUpAction } from "@/app/actions/auth";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { BriefcaseBusiness, Lock, Mail, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { signupModel } from "../models/auth.model";
import { useAuthStore } from "../store/store";

export default function SignupPage() {
  const [role, setRole] = useState<"worker" | "recruiter">("worker");
  const { setAuthenticated } = useAuthStore();
  const router = useRouter();

  const [lastResult, action, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      formData.set("role", role);

      const submission = parseWithZod(formData, { schema: signupModel });
      if (submission.status !== "success") {
        return submission.reply();
      }

      const res = await signUpAction(formData);

      if (res?.error) {
        return submission.reply({
          formErrors: [res.error],
        });
      }

      const token = res?.data?.accessToken;

      if (token) {
        setAuthenticated(true, token);
        router.push("/");
      } else {
        return submission.reply({
          formErrors: ["Authentication failed. No token received."],
        });
      }

      return submission.reply();
    },
    undefined
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      formData.set("role", role);
      return parseWithZod(formData, { schema: signupModel });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

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
        <form
          {...getFormProps(form)}
          action={action}
          className="mt-6 space-y-4"
        >
          {/* First Name & Last Name Input Group */}
          <div className="grid grid-cols-2 items-start gap-4">
            <div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
                <div className="shrink-0 text-[#8F3E13]">
                  <User size={18} />
                </div>
                <input
                  {...getInputProps(fields.firstName, { type: "text" })}
                  placeholder="First Name"
                  disabled={isPending}
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
                />
              </div>
              {fields.firstName.errors && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {fields.firstName.errors}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
                <div className="shrink-0 text-[#8F3E13]">
                  <User size={18} />
                </div>
                <input
                  {...getInputProps(fields.lastName, { type: "text" })}
                  placeholder="Last Name"
                  disabled={isPending}
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
                />
              </div>
              {fields.lastName.errors && (
                <p className="mt-1 text-xs font-medium text-red-600">
                  {fields.lastName.errors}
                </p>
              )}
            </div>
          </div>

          {/* Email Input Field */}
          <div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <div className="shrink-0 text-[#8F3E13]">
                <Mail size={18} />
              </div>
              <input
                {...getInputProps(fields.email, { type: "email" })}
                placeholder="Email"
                disabled={isPending}
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
            {fields.email.errors && (
              <p className="mt-1 text-xs font-medium text-red-600">
                {fields.email.errors}
              </p>
            )}
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 transition-colors focus-within:border-[#8F3E13]">
              <div className="shrink-0 text-[#8F3E13]">
                <Lock size={18} />
              </div>
              <input
                {...getInputProps(fields.password, { type: "password" })}
                placeholder="Password"
                disabled={isPending}
                className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
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
