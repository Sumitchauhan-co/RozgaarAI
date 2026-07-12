"use client";

import { Menu, PlusCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "../store/store";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="RozgaarAI Logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
          <Link href="/" className="hover:text-[#8F3E13]">
            Home
          </Link>
          <Link href="/jobs" className="hover:text-[#8F3E13]">
            Jobs
          </Link>
          <Link href="/dashboard" className="hover:text-[#8F3E13]">
            Dashboard
          </Link>
          <Link href="/applications" className="hover:text-[#8F3E13]">
            Applications
          </Link>
          <Link href="/ai-assistant" className="hover:text-[#8F3E13]">
            AI
          </Link>
        </nav>

        {/* ACTIONS (DESKTOP) */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/post-job"
            className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-4 py-2 text-white transition hover:bg-[#3f1203]"
          >
            <PlusCircle size={16} />
            Post Job
          </Link>

          {isAuthenticated ? (
            <Link
              href="/login"
              className="rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4]"
            >
              Login
            </Link>
          ) : (
            <Link
              href="/signout"
              className="rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4]"
            >
              Signout
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl border p-2 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="space-y-4 border-t bg-white px-6 py-4 md:hidden">
          <div className="sticky top-0 z-50 border-b border-[#F2E3D8] bg-white/80 backdrop-blur-md">
            <Link href="/" className="rounded-lg px-4 py-3 hover:bg-[#F8ECE4]">
              Home
            </Link>

            <Link
              href="/jobs"
              className="rounded-lg px-4 py-3 hover:bg-[#F8ECE4]"
            >
              Jobs
            </Link>

            <Link
              href="/dashboard"
              className="rounded-lg px-4 py-3 hover:bg-[#F8ECE4]"
            >
              Dashboard
            </Link>

            <Link
              href="/applications"
              className="rounded-lg px-4 py-3 hover:bg-[#F8ECE4]"
            >
              Applications
            </Link>

            <Link
              href="/assistant"
              className="rounded-lg px-4 py-3 hover:bg-[#F8ECE4]"
            >
              AI Assistant
            </Link>
          </div>
          <div className="space-y-3 border-t pt-4">
            <div className="space-y-3 border-t pt-4">
              <Link
                onClick={() => setOpen(false)}
                href="/post-job"
                className="block rounded-xl bg-[#5B1E05] py-2 text-center text-white"
              >
                Post Job
              </Link>

              <Link
                onClick={() => setOpen(false)}
                href="/login"
                className="block rounded-xl border py-2 text-center"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
