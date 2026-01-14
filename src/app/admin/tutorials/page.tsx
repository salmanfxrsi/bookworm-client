"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Tutorial {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });

  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchTutorials();
  }, [page]);

  const fetchTutorials = async (searchQuery = search) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutorials`,
        {
          params: { search: searchQuery, page, limit: 6 },
        }
      );

      setTutorials(res.data.tutorials || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error(err);
      setTutorials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tutorials/${editId}`,
          form
        );
        setActionMessage("Tutorial updated successfully!");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tutorials`, form);
        setActionMessage("Tutorial added successfully!");
      }

      resetForm();
      fetchTutorials();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("Action failed");
    }
  };

  const deleteTutorial = async (id: string) => {
    if (!confirm("Delete this tutorial?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tutorials/${id}`);
      setActionMessage("Tutorial deleted!");
      fetchTutorials();
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("Delete failed");
    }
  };

  const startEdit = (tutorial: Tutorial) => {
    setEditId(tutorial._id);
    setForm({
      title: tutorial.title,
      description: tutorial.description,
      videoUrl: tutorial.videoUrl,
    });
  };

  const resetForm = () => {
    setEditId(null);
    setForm({ title: "", description: "", videoUrl: "" });
  };

  const handleSearch = () => {
    setPage(1);
    fetchTutorials(search);
  };

  const handleResetSearch = () => {
    setSearch("");
    setPage(1);
    fetchTutorials("");
  };

  if (loading)
    return (
      <p className="text-center py-20 text-zinc-500">Loading tutorials...</p>
    );

  return (
    <div className="container mx-auto px-6 py-12 space-y-8">
      {actionMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg backdrop-blur-md">
          {actionMessage}
        </div>
      )}

      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Tutorial Management
      </h1>

      {/* Add / Edit Tutorial */}
      <div className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-6 space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {editId ? "Edit Tutorial" : "Add New Tutorial"}
        </h2>

        <input
          type="text"
          placeholder="Tutorial Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />

        <input
          type="text"
          placeholder="Video URL (YouTube)"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition"
          >
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              onClick={resetForm}
              className="bg-zinc-300 dark:bg-zinc-700 px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
        >
          Search
        </button>
        <button
          onClick={handleResetSearch}
          className="bg-zinc-300 dark:bg-zinc-700 px-4 py-2 rounded-xl"
        >
          Reset
        </button>
      </div>

      {tutorials.length === 0 ? (
        <p className="text-center py-20 text-zinc-500">No tutorials found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div
                key={tutorial._id}
                className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {tutorial.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  {tutorial.description.slice(0, 80)}...
                </p>

                <a
                  href={tutorial.videoUrl}
                  target="_blank"
                  className="text-emerald-600 text-sm mt-3 inline-block"
                >
                  Watch Video →
                </a>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => startEdit(tutorial)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-xl"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTutorial(tutorial._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-xl bg-zinc-300 dark:bg-zinc-700 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-xl bg-zinc-300 dark:bg-zinc-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
