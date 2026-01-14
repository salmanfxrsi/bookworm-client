"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface GenreType {
  _id: string;
  name: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  cover?: string;
  genre?: GenreType;
  description?: string;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    cover: "",
    genre: "",
    description: "",
  });

  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editBookData, setEditBookData] = useState({
    title: "",
    author: "",
    cover: "",
    genre: "",
    description: "",
  });

  const limit = 8;

  useEffect(() => {
    fetchBooks();
  }, [page, searchQuery]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
        params: { page, limit, search: searchQuery },
      });
      const booksData = Array.isArray(res.data.data) ? res.data.data : [];
      setBooks(booksData);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const applySearch = () => {
    setPage(1);
    setSearchQuery(searchText);
  };

  const addBook = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/books`, newBook);
      setActionMessage("Book added successfully!");
      setNewBook({
        title: "",
        author: "",
        cover: "",
        genre: "",
        description: "",
      });
      fetchBooks();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("Failed to add book");
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`);
      setActionMessage("Book deleted successfully!");
      fetchBooks();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("Failed to delete book");
    }
  };

  const startEdit = (book: Book) => {
    setEditBookId(book._id);
    setEditBookData({
      title: book.title,
      author: book.author,
      cover: book.cover || "",
      genre: book.genre?._id || "",
      description: book.description || "",
    });
  };

  const saveEdit = async () => {
    if (!editBookId) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/books/${editBookId}`,
        editBookData
      );
      setActionMessage("Book updated successfully!");
      setEditBookId(null);
      fetchBooks();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("Failed to update book");
    }
  };

  const cancelEdit = () => setEditBookId(null);

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages));

  if (loading)
    return <p className="text-center py-20 text-zinc-500">Loading books...</p>;

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
        Books Management
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full sm:w-1/3"
        />
        <button
          onClick={applySearch}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
        >
          Search
        </button>
      </div>

      <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-6 mb-8 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Add New Book
        </h2>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />
        <input
          type="text"
          placeholder="Cover URL"
          value={newBook.cover}
          onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />
        <input
          type="text"
          placeholder="Genre ID"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) =>
            setNewBook({ ...newBook, description: e.target.value })
          }
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />
        <button
          onClick={addBook}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition w-32"
        >
          Add Book
        </button>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 flex flex-col items-center hover:scale-[1.02] transition-transform"
            >
              <div className="relative w-full h-56 mb-4 rounded-xl shadow-sm overflow-hidden">
                <Image
                  src={book.cover || "/placeholder-book.png"}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                />
              </div>

              {editBookId === book._id ? (
                <>
                  <input
                    type="text"
                    value={editBookData.title}
                    onChange={(e) =>
                      setEditBookData({
                        ...editBookData,
                        title: e.target.value,
                      })
                    }
                    className="px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 w-full mb-1"
                  />
                  <input
                    type="text"
                    value={editBookData.author}
                    onChange={(e) =>
                      setEditBookData({
                        ...editBookData,
                        author: e.target.value,
                      })
                    }
                    className="px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 w-full mb-1"
                  />
                  <input
                    type="text"
                    value={editBookData.cover}
                    onChange={(e) =>
                      setEditBookData({
                        ...editBookData,
                        cover: e.target.value,
                      })
                    }
                    className="px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 w-full mb-1"
                  />
                  <input
                    type="text"
                    value={editBookData.genre}
                    onChange={(e) =>
                      setEditBookData({
                        ...editBookData,
                        genre: e.target.value,
                      })
                    }
                    className="px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 w-full mb-1"
                  />
                  <textarea
                    value={editBookData.description}
                    onChange={(e) =>
                      setEditBookData({
                        ...editBookData,
                        description: e.target.value,
                      })
                    }
                    className="px-2 py-1 rounded-lg border border-zinc-300 dark:border-zinc-600 w-full mb-1"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-emerald-500 text-white px-4 py-1 rounded-xl hover:bg-emerald-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 px-4 py-1 rounded-xl hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-center">
                    {book.title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 text-center">
                    by {book.author}
                  </p>
                  {book.genre && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 text-center">
                      Genre: {book.genre.name}
                    </p>
                  )}
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 text-center">
                    {book.description?.slice(0, 60)}
                    {book.description && "..."}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEdit(book)}
                      className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-xl hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-20 text-zinc-500">No books found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="px-3 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg transition ${
                page === i + 1
                  ? "bg-emerald-500 text-white"
                  : "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
