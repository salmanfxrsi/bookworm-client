"use client";

import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative flex flex-col items-center justify-center py-24 px-6 sm:px-16 bg-gradient-to-b from-emerald-50 via-white to-emerald-100 dark:from-black dark:via-zinc-900 dark:to-black/90">
      <div className="backdrop-blur-md bg-white/20 dark:bg-zinc-900/40 rounded-3xl p-12 max-w-3xl w-full text-center shadow-lg border border-white/10 dark:border-zinc-700/50">
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Stay Updated
        </h2>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Subscribe to our newsletter to get the latest book releases, updates,
          and personalized recommendations.
        </p>

        {submitted ? (
          <p className="mt-6 text-lg font-medium text-emerald-600 dark:text-emerald-400">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 bg-white/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-emerald-500"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
