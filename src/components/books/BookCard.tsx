import Image from "next/image";

interface Props {
  book: {
    title: string;
    author: string;
    cover: string;
    avgRating: number;
  };
}

const BookCard = ({ book }: Props) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < Math.round(book.avgRating) ? "★" : "☆"
  ).join("");

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative w-full aspect-[3/4] rounded-md bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1024px) 50vw,
                 25vw"
          priority={false}
        />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {book.title}
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          {book.author}
        </p>
        <p className="mt-1 text-xs text-emerald-600">{stars}</p>
      </div>
    </div>
  );
};

export default BookCard;
