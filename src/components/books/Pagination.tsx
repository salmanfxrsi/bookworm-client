const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
        Prev
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          {page}
        </button>
      ))}

      <button className="rounded-md border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
        Next
      </button>
    </div>
  );
};

export default Pagination;
