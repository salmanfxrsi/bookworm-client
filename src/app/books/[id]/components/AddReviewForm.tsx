"use client";

import { useState } from "react";
import { Review } from "./ReviewsList";

interface AddReviewFormProps {
  onReviewAdded: (review: Omit<Review, "id">) => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ onReviewAdded }) => {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !rating || !comment) return;

    onReviewAdded({ username, rating, comment });

    setUsername("");
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Write a Review
      </h2>

      <input
        type="text"
        placeholder="Your Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 text-zinc-900 dark:text-zinc-100"
      />

      <div className="flex items-center gap-2">
        <span className="text-zinc-700 dark:text-zinc-300">Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-xl ${star <= rating ? "text-emerald-600" : "text-zinc-300 dark:text-zinc-600"}`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        placeholder="Your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/80 text-zinc-900 dark:text-zinc-100"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold"
      >
        Submit Review
      </button>
    </form>
  );
};

export default AddReviewForm;
