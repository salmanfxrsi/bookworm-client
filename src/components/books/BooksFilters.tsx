const BooksFilters = () => {
  return (
    <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-5 space-y-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Search
        </h3>
        <input
          type="text"
          placeholder="Search by title or author"
          className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black"
        />
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Genre
        </h3>
        <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          {["Fiction", "Non-Fiction", "Fantasy", "Mystery", "Self-Help"].map(
            (genre) => (
              <label key={genre} className="flex items-center gap-2">
                <input type="checkbox" className="accent-emerald-600" />
                {genre}
              </label>
            )
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Rating
        </h3>
        <select className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black">
          <option>All Ratings</option>
          <option>4 ★ & above</option>
          <option>3 ★ & above</option>
          <option>2 ★ & above</option>
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Sort By
        </h3>
        <select className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-800 dark:bg-black">
          <option>Most Popular</option>
          <option>Highest Rated</option>
          <option>Newest</option>
        </select>
      </div>
    </aside>
  );
};

export default BooksFilters;
