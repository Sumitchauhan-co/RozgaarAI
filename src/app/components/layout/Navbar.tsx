"use client";

import { signOutAction } from "@/app/actions/auth";
import { getAccessToken, useAuthStore } from "@/app/store/store";
import api from "@/app/utils/api";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const links = [
  { title: "Home", href: "/" },
  { title: "Find Work", href: "/jobs" },
  { title: "Hire", href: "/hire" },
  { title: "About", href: "#" },
];

export default function Navbar() {
  const { isAuthenticated, setAuthenticated, clearAuth } = useAuthStore();
  // const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getAccessToken();
    const publicAuthRoutes = ["/login", "/signup"];

    if (publicAuthRoutes.includes(pathname)) {
      setAuthenticated(false);
      return;
    }
    const sessionChecked =
      typeof window !== "undefined"
        ? sessionStorage.getItem("session_checked")
        : null;

    if (!token && sessionChecked === "dead") {
      setAuthenticated(false);
      return;
    }
    api
      .get("/api/auth/getUser")
      .then(res => {
        if (res.data) setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, [setAuthenticated, pathname]);

  const handleSignOut = async () => {
    const res = await signOutAction();
    if (!res.error) {
      clearAuth();
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
          {/* FIX: Inverted condition fixed (Show Signout if authenticated) */}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleSignOut} // FIX: Removed wrapping arrow function syntax
              className="rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4]"
            >
              Signout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl border px-4 py-2 text-sm font-semibold text-[#5B1E05] hover:bg-[#F8ECE4]"
            >
              Login
            </Link>
          )}

          <Link
            href="/signup"
            className="rounded-xl bg-[#5B1E05] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#442003]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
