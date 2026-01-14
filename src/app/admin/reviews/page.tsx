"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  _id: string;
  book: { _id: string; title: string };
  userName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const fetchReviews = async (searchQuery = search) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          params: {
            status: "pending",
            page,
            limit: 6,
            bookName: searchQuery || undefined,
          },
        }
      );
      setReviews(res.data.reviews || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (id: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
        status: "approved",
      });
      setActionMessage("Review approved successfully!");
      fetchReviews();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("Failed to approve review");
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchReviews(search);
  };

  const handleReset = () => {
    setSearch("");
    setPage(1);
    fetchReviews("");
  };

  const handlePrevPage = () => page > 1 && setPage(page - 1);
  const handleNextPage = () => page < totalPages && setPage(page + 1);

  if (loading)
    return (
      <p className="text-center py-20 text-zinc-500">Loading reviews...</p>
    );

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Review Management
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by Book Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-xl hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
        >
          Reset
        </button>
      </div>

      {reviews.length === 0 ? (
        <p className="text-center py-20 text-zinc-500">No pending reviews.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 flex flex-col justify-between hover:scale-[1.02] transition"
              >
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {review.book.title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Reviewer: {review.userName}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Rating: {review.rating}/5
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    {review.comment}
                  </p>
                </div>

                <button
                  onClick={() => approveReview(review._id)}
                  className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition mt-4"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl bg-zinc-300 dark:bg-zinc-700 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl bg-zinc-300 dark:bg-zinc-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
