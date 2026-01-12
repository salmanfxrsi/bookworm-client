import BooksHeader from "@/components/books/BooksHeader";
import BooksFilters from "@/components/books/BooksFilters";
import BooksGrid from "@/components/books/BooksGrid";
import Pagination from "@/components/books/Pagination";

const BooksPage = () => {
  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        <BooksHeader />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <BooksFilters />
          <BooksGrid />
        </div>

        <Pagination />
      </div>
    </section>
  );
};

export default BooksPage;
