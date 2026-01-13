"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white/80 backdrop-blur p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Welcome back to{" "}
          <span className="text-emerald-600">BookWorm</span>
        </h1>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Login to continue tracking your reading journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-md bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-emerald-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
