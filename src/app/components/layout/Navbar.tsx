"use client";

import Image from "next/image";
import Link from "next/link";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Find Work",
    href: "/jobs",
  },
  {
    title: "Hire",
    href: "/employer",
  },
  {
    title: "About",
    href: "#",
  },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ECE3DA] bg-[#FCFBF9]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="RozgaarAI"
            width={185}
            height={60}
            className="h-auto w-auto"
            priority
          />
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map(item => (
            <Link
              key={item.title}
              href={item.href}
              className="text-[15px] font-medium text-[#55463E] transition-colors hover:text-[#5B1E05]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl px-5 py-2 text-[#5B1E05] transition hover:bg-[#F5ECE4]"
          >
            Login
          </button>

          <button
            type="button"
            className="rounded-xl bg-[#5B1E05] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#442003]"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
