"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  avgRating: number;
}

export default function BookDetails({ bookId }: { bookId: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`)
      .then((res) => setBook(res.data))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) return <p className="text-center py-20">Loading book...</p>;
  if (!book) return <p className="text-center py-20">Book not found.</p>;

  const handleAddToShelves = () => alert("Book added to your shelves!");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white/50 dark:bg-black/50 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <div className="flex justify-center md:items-start">
        <div className="relative w-full max-w-xs aspect-[3/4]">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="rounded-xl shadow-md object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
            priority
          />
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col space-y-4">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          {book.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-1">
          by {book.author}
        </p>

        <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
          {book.description}
        </p>

        <button
          onClick={handleAddToShelves}
          className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold shadow-md hover:bg-emerald-700 transition w-auto self-start"
        >
          Add to Shelves
        </button>
      </div>
    </div>
  );
}
