"use client";

import { BriefcaseBusiness, Menu, PlusCircle, X } from "lucide-react";
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
          <div className="rounded-xl bg-[#F5E7DA] p-2">
            <BriefcaseBusiness className="text-[#8F3E13]" />
          </div>

          <span className="text-xl font-black text-[#2B0F05]">
            Rozgaar<span className="text-[#8F3E13]">AI</span>
          </span>
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
            className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-4 py-2 text-white hover:bg-[#3f1203]"
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
          <Link onClick={() => setOpen(false)} href="/">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} href="/jobs">
            Jobs
          </Link>
          <Link onClick={() => setOpen(false)} href="/dashboard">
            Dashboard
          </Link>
          <Link onClick={() => setOpen(false)} href="/applications">
            Applications
          </Link>
          <Link onClick={() => setOpen(false)} href="/ai-assistant">
            AI Assistant
          </Link>

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
      )}
    </header>
  );
}
