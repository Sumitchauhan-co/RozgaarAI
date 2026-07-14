"use client";

import { signOutAction } from "@/app/actions/auth";
import { useAuthStore } from "@/app/store/store";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { title: "Home", href: "/" },
  { title: "Find Work", href: "/jobs" },
  { title: "Hire", href: "/hire" },
  { title: "Applications", href: "/applications" },
  { title: "About", href: "#" },
];

export default function Navbar() {
  const { isAuthenticated, clearAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    const res = await signOutAction();
    if (!res.error) {
      clearAuth();
      setIsOpen(false);
    }
  };

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

        {/* Desktop Navigation */}
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

        {/* Desktop & Mobile Actions Combo */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* Desktop Only Signout */}
              <button
                type="button"
                onClick={handleSignOut}
                className="hidden rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4] lg:block"
              >
                Signout
              </button>

              {/* Profile Icon (Visible Everywhere) */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ECE3DA]/50 transition-colors hover:bg-[#ECE3DA]"
              >
                <User size={20} className="text-[#5B1E05]" />
              </Link>
            </>
          ) : (
            <>
              {/* Desktop Only Login */}
              <Link
                href="/login"
                className="hidden rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4] lg:block"
              >
                Login
              </Link>
            </>
          )}

          {/* Mobile Hamburger Toggle (Right of user icon) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#5B1E05] hover:bg-[#F8ECE4] lg:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="border-t border-[#ECE3DA] bg-[#FCFBF9] px-8 py-6 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-5">
            {links.map(item => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-[#55463E] transition-colors hover:text-[#5B1E05]"
              >
                {item.title}
              </Link>
            ))}

            {/* Auth specific mobile buttons attached at the bottom of the drawer */}
            <div className="mt-4 border-t border-[#ECE3DA]/60 pt-4">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-xl border border-[#ECE3DA] py-3 text-center text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4]"
                >
                  Signout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-xl bg-[#5B1E05] py-3 text-center text-sm font-semibold text-white hover:bg-[#421503]"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
