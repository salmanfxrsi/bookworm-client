"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Genre {
  _id: string;
  name: string;
}

export default function AdminGenresPage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
      setGenres(res.data);
    } catch (err) {
      console.error("Fetch genres error:", err);
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

  const addGenre = async () => {
    if (!genreName.trim()) {
      setActionMessage("Genre name cannot be empty!");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/genres`, {
        name: genreName,
      });
      setActionMessage("Genre added successfully!");
      setGenreName("");
      fetchGenres();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (err: any) {
      console.error("Add genre error:", err.response?.data || err.message);
      setActionMessage("Failed to add genre");
    }
  };

  const deleteGenre = async (id: string) => {
    if (!confirm("Delete this genre?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/genres/${id}`);
      setActionMessage("Genre deleted!");
      fetchGenres();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (err: any) {
      console.error("Delete genre error:", err.response?.data || err.message);
      setActionMessage("Failed to delete genre");
    }
  };

  if (loading)
    return <p className="text-center py-20 text-zinc-500">Loading genres...</p>;

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Genre Management
      </h1>

      <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="New Genre Name"
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full sm:w-auto flex-1"
        />
        <button
          onClick={addGenre}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
        >
          Add Genre
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {genres.map((genre) => (
          <div
            key={genre._id}
            className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 flex justify-between items-center hover:scale-[1.02] transition-transform"
          >
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {genre.name}
            </span>
            <button
              onClick={() => deleteGenre(genre._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {genres.length === 0 && (
        <p className="text-center py-20 text-zinc-500">
          No genres found. Add some!
        </p>
      )}
    </div>
  );
}
