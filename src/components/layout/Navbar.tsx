"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const dashboardRoute = session?.user?.role === "admin" ? "/admin/books" : "/dashboard/wishlist";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-black/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Book<span className="text-emerald-600">Worm</span>
        </Link>

        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/auth/login"
                className="hidden sm:inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <span className="hidden sm:inline-block text-sm text-zinc-600 dark:text-zinc-400">
                Hi,{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {session.user.name}
                </span>
              </span>

              {/* Dashboard/Admin button */}
              <Link
                href={dashboardRoute}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {session.user.role === "admin" ? "Admin Panel" : "Dashboard"}
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
