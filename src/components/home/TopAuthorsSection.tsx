"use client";

import Image from "next/image";

interface Author {
  id: string;
  name: string;
  avatar: string;
  booksCount: number;
}

const authors: Author[] = [
  {
    id: "1",
    name: "J.K. Rowling",
    avatar: "https://i.ibb.co.com/0jCLnNNT/image.jpg",
    booksCount: 15,
  },
  {
    id: "2",
    name: "George R.R. Martin",
    avatar: "https://i.ibb.co/1bQY5jX/grrm.jpg",
    booksCount: 20,
  },
  {
    id: "3",
    name: "Agatha Christie",
    avatar: "https://i.ibb.co/mH7v4Yx/agatha.jpg",
    booksCount: 85,
  },
  {
    id: "4",
    name: "Paulo Coelho",
    avatar: "https://i.ibb.co/dKW7y8p/paulo.jpg",
    booksCount: 30,
  },
  {
    id: "5",
    name: "Stephen King",
    avatar: "https://i.ibb.co/YyMpjk6/stephen.jpg",
    booksCount: 60,
  },
];

const TopAuthorsSection = () => {
  return (
    <section className="w-full py-16 bg-zinc-50 dark:bg-black/90 px-6 sm:px-16">
      <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 text-center mb-8">
        Top Authors
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {authors.map((author) => (
          <div
            key={author.id}
            className="min-w-[180px] flex-shrink-0 rounded-xl bg-white dark:bg-zinc-800 p-4 text-center shadow-md hover:shadow-lg transition"
          >
            <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-emerald-600">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {author.name}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {author.booksCount} books
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopAuthorsSection;
