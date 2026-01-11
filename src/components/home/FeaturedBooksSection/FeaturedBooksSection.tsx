"use client";
import BookCard from "./BookCard";
import useBooks from "@/hooks/useBooks";

const FeaturedBooksSection = () => {
  const { books, loading, error } = useBooks();

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <section className="my-20 px-6 sm:px-16">
      <h2 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Featured Books
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooksSection;
