const BookCard = () => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-[3/4] w-full rounded-md bg-zinc-100 dark:bg-zinc-800" />

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Book Title
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Author Name</p>
        <p className="mt-1 text-xs text-emerald-600">★★★★☆</p>
      </div>
    </div>
  );
};

export default BookCard;
