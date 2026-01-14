"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import axios, { AxiosError } from "axios";

interface ShelfBook {
  _id: string;
  status: "want" | "reading" | "read";
  progress: number;
  book: {
    _id: string;
    title: string;
    author: string;
    cover: string;
  };
}

export default function OngoingPage() {
  const { data: session, status } = useSession();
  const [shelf, setShelf] = useState<ShelfBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [progressInputs, setProgressInputs] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user?.id) {
      setError("Please login to see your shelf.");
      setLoading(false);
      return;
    }
    fetchShelf();
  }, [session, status]);

  const fetchShelf = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/shelves?userId=${session?.user?.id}`
      );
      setShelf(res.data);
      // Initialize input values
      const inputs: { [key: string]: number } = {};
      res.data.forEach((item: ShelfBook) => {
        if (item.status === "reading") inputs[item._id] = item.progress;
      });
      setProgressInputs(inputs);
      setError("");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to fetch shelf");
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (shelfId: string) => {
    try {
      const progress = Math.min(100, Math.max(0, progressInputs[shelfId] || 0));
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shelves/${shelfId}`, {
        progress,
      });
      setActionMessage(`Progress updated to ${progress}%`);
      fetchShelf();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setError("Failed to update progress");
    }
  };

  const markAsCompleted = async (shelfId: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shelves/${shelfId}`, {
        status: "read",
        progress: 100,
      });
      setActionMessage("Book marked as completed");
      fetchShelf();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setError("Failed to mark book as completed");
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-zinc-500">Loading your shelf...</p>
    );
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  const ongoingBooks = shelf.filter((item) => item.status === "reading");

  return (
    <div className="container mx-auto px-6 py-12 space-y-8 relative">
      {/* Floating Action Message */}
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Currently Reading
      </h1>

      {ongoingBooks.length === 0 ? (
        <p className="text-center py-20 text-zinc-500 dark:text-zinc-400">
          No books in progress.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ongoingBooks.map((item) => (
            <div
              key={item._id}
              className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 flex flex-col items-center hover:scale-[1.02] transition-transform"
            >
              <div className="relative w-full h-56 mb-4 rounded-xl shadow-sm overflow-hidden">
                <Image
                  src={item.book.cover}
                  alt={item.book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                />
              </div>

              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                {item.book.title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 text-center">
                by {item.book.author}
              </p>

              {/* Progress Bar */}
              <div className="w-full mt-4 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-emerald-400 h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                {item.progress}%
              </p>

              {/* Progress input and save */}
              <div className="mt-4 flex flex-col gap-2 w-full">
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={progressInputs[item._id] || 0}
                    onChange={(e) =>
                      setProgressInputs((prev) => ({
                        ...prev,
                        [item._id]: +e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-1 rounded-xl border border-zinc-300 dark:border-zinc-600 text-sm text-zinc-900 dark:text-zinc-100"
                  />
                  <button
                    onClick={() => saveProgress(item._id)}
                    className="bg-emerald-500 text-white px-4 py-1 rounded-xl hover:bg-emerald-600 transition"
                  >
                    Save
                  </button>
                </div>
                <button
                  onClick={() => markAsCompleted(item._id)}
                  className="bg-emerald-500 text-white px-4 py-1 rounded-xl hover:bg-emerald-600 transition w-full"
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
