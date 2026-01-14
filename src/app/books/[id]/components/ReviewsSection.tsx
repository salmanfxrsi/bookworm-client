"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
}

export default function ReviewsSection({ bookId }: { bookId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews?bookId=${bookId}&status=approved`
        );
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookId]);

  if (loading) return <p className="text-center py-4">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-center py-4">No reviews yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Reviews
      </h2>

      {reviews.map((review) => (
        <div
          key={review._id}
          className="p-4 bg-white/60 backdrop-blur-md border border-zinc-200 rounded-xl dark:bg-black/60 dark:border-zinc-800 shadow-sm"
        >
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {review.userName} ⭐ {review.rating}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 mt-1">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
