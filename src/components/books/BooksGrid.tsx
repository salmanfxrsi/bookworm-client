import BookCard from "./BookCard";

const BooksGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <BookCard key={i} />
      ))}
    </div>
  );
};

export default BooksGrid;
