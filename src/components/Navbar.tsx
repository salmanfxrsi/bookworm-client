"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur-md dark:border-zinc-800 dark:bg-black/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Book<span className="text-emerald-600">Worm</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link
            href="/books"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Books
          </Link>
          <Link
            href="/genres"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Genres
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
