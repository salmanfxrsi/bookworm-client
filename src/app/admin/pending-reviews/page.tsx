"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Review {
  _id: string;
  book: { title: string };
  userName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const REVIEWS_PER_PAGE = 5;

export default function PendingReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        params: { status: "pending", page, limit: REVIEWS_PER_PAGE },
      });
      setReviews(res.data.reviews);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, { status });
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(total / REVIEWS_PER_PAGE);

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pending Reviews</h1>

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No pending reviews.</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">{r.book.title}</h2>
                <p className="text-gray-600">
                  <span className="font-medium">{r.userName}</span> rated{" "}
                  <span className="font-medium">{r.rating}/5</span>
                </p>
                <p className="text-gray-700">{r.comment}</p>
                <p className="text-sm text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-2 mt-3 md:mt-0">
                <button
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                  onClick={() => updateStatus(r._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={() => updateStatus(r._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-6">
          <button
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
