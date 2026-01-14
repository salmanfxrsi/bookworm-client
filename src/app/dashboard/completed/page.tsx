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

export default function CompletedPage() {
  const { data: session, status } = useSession();
  const [shelf, setShelf] = useState<ShelfBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      setError("");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to fetch shelf");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-zinc-500">Loading your shelf...</p>
    );
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  const completedBooks = shelf.filter((item) => item.status === "read");

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Completed Books
      </h1>

      {completedBooks.length === 0 ? (
        <p className="text-center py-20 text-zinc-500 dark:text-zinc-400">
          You haven&apos;t completed any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {completedBooks.map((item) => (
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
                  style={{ width: `100%` }}
                />
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">
                100%
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
