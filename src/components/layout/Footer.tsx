const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Book<span className="text-emerald-600">Worm</span>
            </h2>

            <p className="max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              Discover, read, and organize your favorite books in one calm and
              beautiful place.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                Browse Books
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                Genres
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                Popular
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                New Releases
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-900 dark:text-zinc-100">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer">
                Contact
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          © {new Date().getFullYear()} Bookworm. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
