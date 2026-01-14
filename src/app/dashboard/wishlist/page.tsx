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

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const [shelf, setShelf] = useState<ShelfBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

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

  const removeFromWishlist = async (shelfId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/shelves/${shelfId}`
      );
      setActionMessage("Removed from Wishlist");
      fetchShelf();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setError("Failed to remove book from Wishlist");
    }
  };

  const moveToOngoing = async (shelfId: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/shelves/${shelfId}`, {
        status: "reading",
        progress: 0,
      });
      setActionMessage("Moved to Currently Reading");
      fetchShelf();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setError("Failed to move book to Currently Reading");
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-zinc-500">Loading your shelf...</p>
    );
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  const wishlistBooks = shelf.filter((item) => item.status === "want");

  return (
    <div className="container mx-auto px-6 py-12 space-y-8 relative">
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        My Wishlist
      </h1>

      {wishlistBooks.length === 0 ? (
        <p className="text-center py-20 text-zinc-500 dark:text-zinc-400">
          No books in your wishlist.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistBooks.map((item) => (
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

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => moveToOngoing(item._id)}
                  className="bg-emerald-500 text-white px-4 py-1 rounded-xl hover:bg-emerald-600 transition"
                >
                  Start Reading
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 px-4 py-1 rounded-xl hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
