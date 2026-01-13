"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        name,
        email,
        password,
        photo: photo || undefined,
      });

      router.push("/auth/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white/80 backdrop-blur p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Join <span className="text-emerald-600">BookWorm</span>
        </h1>

        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Create your account and start tracking your reading journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
          />

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
          />

          <input
            type="text"
            placeholder="Photo URL (optional)"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-zinc-700 dark:text-zinc-100"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-emerald-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
