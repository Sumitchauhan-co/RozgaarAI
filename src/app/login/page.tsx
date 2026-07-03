"use client";

import axios from "axios";
import { ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
        {
          email,
          password,
        }
      );

      console.log("Login Success:", response.data);

      // Save JWT Token if your backend returns one
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redirect after successful login
      router.push("/");
    } catch (err: any) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FCF8F4]">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        {/* Back Button */}
        <button
          type="button"
          title="Go Back"
          onClick={() => router.push("/")}
          className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5E7DA] text-[#8F3E13] transition-all duration-300 hover:scale-105 hover:bg-[#EFD8C4]"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-[#F5E7DA] p-4">
              <Sparkles className="text-[#8F3E13]" />
            </div>
          </div>

          <h1 className="mt-4 text-3xl font-black text-[#2B0F05]">
            Welcome Back
          </h1>

          <p className="mt-2 text-gray-500">
            Login to Rozgaar AI
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="text-sm font-semibold">
              Email
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
              <Mail
                className="text-[#8F3E13]"
                size={18}
              />

              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">
              Password
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border p-4">
              <Lock
                className="text-[#8F3E13]"
                size={18}
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#5B1E05] py-4 font-semibold text-white transition hover:bg-[#3F1203] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
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
