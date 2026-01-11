"use client";

import { useState } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log({ name, email, password });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-200 dark:from-zinc-900 dark:via-black dark:to-zinc-900 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/20 dark:bg-black/20 p-10 backdrop-blur-[40px] shadow-2xl border border-white/30 dark:border-zinc-700">
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 text-center">
          Join Bookworm
        </h1>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          Create your account and start your reading adventure
        </p>

        <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-5">
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-xl border border-white/30 dark:border-zinc-600 bg-white/30 dark:bg-black/30 px-5 py-3 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-70 backdrop-blur-sm transition"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-white/30 dark:border-zinc-600 bg-white/30 dark:bg-black/30 px-5 py-3 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-70 backdrop-blur-sm transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-white/30 dark:border-zinc-600 bg-white/30 dark:bg-black/30 px-5 py-3 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-70 backdrop-blur-sm transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald-600 px-6 py-3 text-white font-bold text-lg transition-all hover:bg-emerald-500 hover:scale-105 disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-600 dark:text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
