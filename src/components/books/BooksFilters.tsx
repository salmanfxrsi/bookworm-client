import { FaSearch } from "react-icons/fa";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  genres: { _id: string; name: string }[];
  selectedGenre: string;
  setGenre: (v: string) => void;
}

const BooksFilters = ({
  search,
  setSearch,
  genres,
  selectedGenre,
  setGenre,
}: Props) => {
  return (
    <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-md space-y-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative">
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Search
        </h3>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author"
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-10 py-2 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black dark:text-zinc-100"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Genre
        </h3>
        <div className="relative">
          <select
            value={selectedGenre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full rounded-full border border-zinc-200 bg-zinc-50 px-10 py-2 text-sm outline-none transition focus:ring-2 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-black dark:text-zinc-100"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={() => {
          setSearch("");
          setGenre("");
        }}
        className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default BooksFilters;
