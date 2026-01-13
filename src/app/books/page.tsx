"use client";

import { useEffect, useState } from "react";

import BooksHeader from "@/components/books/BooksHeader";
import BooksFilters from "@/components/books/BooksFilters";
import BooksGrid from "@/components/books/BooksGrid";
import Pagination from "@/components/books/Pagination";

interface Genre {
  _id: string;
  name: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  avgRating: number;
}

const LIMIT = 8;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const BooksPage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      if (!API_URL) return;
      const res = await fetch(`${API_URL}/genres`);
      const data = await res.json();
      setGenres(data);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!API_URL) return;
      setLoading(true);

      const currentPage = 1;

      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (genre) params.append("genre", genre);
      params.append("page", currentPage.toString());
      params.append("limit", LIMIT.toString());

      const res = await fetch(`${API_URL}/books?${params.toString()}`);
      const data = await res.json();

      setBooks(data.data);
      setTotalPages(data.totalPages);
      setPage(currentPage);
      setLoading(false);
    };

    fetchBooks();
  }, [search, genre]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!API_URL) return;
      setLoading(true);

      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (genre) params.append("genre", genre);
      params.append("page", page.toString());
      params.append("limit", LIMIT.toString());

      const res = await fetch(`${API_URL}/api/books?${params.toString()}`);
      const data = await res.json();

      setBooks(data.data);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    if (page > 1) fetchBooks();
  }, [page]);

  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        <BooksHeader />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          <BooksFilters
            search={search}
            setSearch={setSearch}
            genres={genres}
            selectedGenre={genre}
            setGenre={setGenre}
          />

          <BooksGrid books={books} loading={loading} />
        </div>

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
};

export default BooksPage;
