import Image from "next/image";
import RatingStars from "./RatingStars";

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  avgRating: number;
}

interface Props {
  book: Book;
}

const BookDetailsHeader: React.FC<Props> = ({ book }) => {
    console.log(book)
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <Image
        src={book.cover}
        alt={book.title}
        className="w-48 h-64 object-cover rounded-xl shadow-sm"
      />
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{book.title}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{book.author}</p>
        <div className="mt-2">
          <RatingStars rating={book.avgRating} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsHeader;
