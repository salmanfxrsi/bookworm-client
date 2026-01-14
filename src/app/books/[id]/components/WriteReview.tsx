"use client";

import axios from "axios";
import { useState } from "react";

export default function WriteReview({ bookId, userName }: { bookId: string; userName: string }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment) return alert("Please fill all fields");

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        book: bookId,
        userName,
        rating,
        comment,
        status: "pending",
      });
      alert("Review submitted! Waiting for approval.");
      setRating(0);
      setComment("");
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-6 bg-white/60 backdrop-blur-md border border-zinc-200 rounded-xl dark:bg-black/60 dark:border-zinc-800 space-y-4 shadow-sm"
    >
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Write a Review
      </h3>

      <div className="flex items-center space-x-2">
        <label className="text-zinc-900 dark:text-zinc-100">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-2 border border-zinc-300 rounded dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        >
          <option value={0}>Select</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review..."
        className="w-full p-3 border border-zinc-300 rounded dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
