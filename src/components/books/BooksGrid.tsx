import Link from "next/link";
import BookCard from "./BookCard";

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  avgRating: number;
}

interface Props {
  books: Book[];
  loading: boolean;
}

const BooksGrid = ({ books, loading }: Props) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (!books.length) {
    return <p className="text-center text-sm text-zinc-500">No books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <Link
          key={book._id}
          href={`/books/${book._id}`}
          className="block" 
        >
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BooksGrid;
