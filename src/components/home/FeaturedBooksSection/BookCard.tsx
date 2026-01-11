import { Book } from "@/lib/books";
import Image from "next/image";
import Link from "next/link";


const BookCard = ({ book }: { book: Book }) => (
  <div className="group relative flex w-44 flex-col items-center rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-2xl hover:-translate-y-2 dark:bg-zinc-800">
    <div className="relative w-36 h-52 overflow-hidden rounded-lg">
      <Image
        src={book.coverImage}
        alt={book.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50 text-center">
      {book.title}
    </h3>
    <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">{book.author}</p>
    <Link
      href={`/books/${book._id}`}
      className="mt-2 text-xs font-medium text-emerald-600 hover:underline"
    >
      View Details
    </Link>
  </div>
);


export default BookCard;