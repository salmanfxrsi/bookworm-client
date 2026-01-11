"use client";

import { useGenres } from "@/hooks/useGenres";
import Link from "next/link";

const GenresSection = () => {
  const { genres, loading, error } = useGenres();

  if (loading) return <p className="text-center py-8">Loading genres...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  console.log(genres);

  return (
    <section className="w-full bg-white dark:bg-black/90 py-16 px-6 sm:px-16">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
        Explore by Genre
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.map((genre) => (
          <Link
            key={genre._id}
            href={`/genres/${genre._id}`}
            className="flex items-center justify-center rounded-lg bg-emerald-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium hover:bg-emerald-100 dark:hover:bg-zinc-700 transition py-4"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GenresSection;
