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
    <header className="sticky top-0 z-50 bg-[#FCFBF9]/90 backdrop-blur-xl border-b border-[#ECE3DA]">

      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* Logo */}

        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="RozgaarAI"
            width={185}
            height={60}
            priority
          />
        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10">

          {links.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-[15px] font-medium text-[#55463E] hover:text-[#5B1E05] transition-colors"
            >
              {item.title}
            </Link>
          ))}

        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <button className="px-5 py-2 rounded-xl text-[#5B1E05] hover:bg-[#F5ECE4] transition">
            Login
          </button>

          <button className="rounded-xl bg-[#5B1E05] px-6 py-3 font-semibold text-white transition hover:bg-[#442003] shadow-md">
            Get Started
          </button>

        </div>

      </div>

    </header>
  );
}