"use client";

import {
  Menu,
  PlusCircle,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">

          <Link href="/" className="hover:text-[#8F3E13]">Home</Link>
          <Link href="/jobs" className="hover:text-[#8F3E13]">Jobs</Link>
          <Link href="/dashboard" className="hover:text-[#8F3E13]">Dashboard</Link>
          <Link href="/applications" className="hover:text-[#8F3E13]">Applications</Link>
          <Link href="/ai-assistant" className="hover:text-[#8F3E13]">AI</Link>

        </nav>

        {/* ACTIONS (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/post-job"
            className="flex items-center gap-2 rounded-xl bg-[#5B1E05] px-4 py-2 text-white hover:bg-[#3f1203]"
          >
            <PlusCircle size={16} />
            Post Job
          </Link>

          <Link
            href="/login"
            className="rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4]"
          >
            Login
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl border"
        >
          {open ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">

          <Link onClick={() => setOpen(false)} href="/">Home</Link>
          <Link onClick={() => setOpen(false)} href="/jobs">Jobs</Link>
          <Link onClick={() => setOpen(false)} href="/dashboard">Dashboard</Link>
          <Link onClick={() => setOpen(false)} href="/applications">Applications</Link>
          <Link onClick={() => setOpen(false)} href="/ai-assistant">AI Assistant</Link>

          <div className="pt-4 border-t space-y-3">

            <Link
              onClick={() => setOpen(false)}
              href="/post-job"
              className="block bg-[#5B1E05] text-white text-center py-2 rounded-xl"
            >
              Post Job
            </Link>

            <Link
              onClick={() => setOpen(false)}
              href="/login"
              className="block border text-center py-2 rounded-xl"
            >
              Login
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}
