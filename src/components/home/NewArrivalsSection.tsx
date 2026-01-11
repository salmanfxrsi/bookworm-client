"use client";

import useBooks from "@/hooks/useBooks";
import BookCard from "./FeaturedBooksSection/BookCard";

const NewArrivalsSection = () => {
  const { books, loading, error } = useBooks();

  return (
    <section className="w-full py-16 bg-white dark:bg-black/90 px-6 sm:px-16">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 text-center mb-8">
        New Arrivals
      </h2>

      {loading && (
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Loading...
        </p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSection;
