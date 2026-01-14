"use client";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-emerald-100 dark:from-black dark:via-zinc-900 dark:to-black/90 text-center px-6 sm:px-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight max-w-3xl">
        Discover Your{" "}
        <span className="text-emerald-600">Next Favorite Book</span>
      </h1>

      <p className="mt-4 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl animate-fadeIn">
        Track your reading journey, explore genres, and get personalized
        recommendations tailored just for you.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link
          href="/auth/register"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition hover:bg-emerald-500 hover:scale-105"
        >
          Get Started
        </Link>
        <Link
          href="/books"
          className="inline-flex items-center justify-center rounded-full border border-emerald-600 px-6 py-3 text-lg font-medium text-emerald-600 transition hover:bg-emerald-50 hover:scale-105 dark:hover:bg-zinc-800 dark:border-emerald-500 dark:text-emerald-400"
        >
          Browse Books
        </Link>
      </div>

      <div className="absolute top-10 left-5 w-4 h-4 bg-emerald-200 rounded-full blur-lg opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-emerald-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
    </section>
  );
}; 

export default HeroSection;
