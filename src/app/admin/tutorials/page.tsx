"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Tutorial {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  url?: string;
}

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutorials`
      );

      const mapped: Tutorial[] = res.data.map((t: any) => ({
        _id: t._id,
        title: t.title,
        description: t.description,
        videoUrl: t.videoUrl || t.url || "",
      }));

      setTutorials(mapped);
    } catch (err) {
      console.error("Fetch tutorials error:", err);
      setTutorials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.videoUrl) {
      setActionMessage("Title and Video URL are required!");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      url: form.videoUrl,
    };

    try {
      if (editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/tutorials/${editId}`,
          payload
        );
        setActionMessage("Tutorial updated successfully!");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/tutorials`,
          payload
        );
        setActionMessage("Tutorial added successfully!");
      }

      resetForm();
      fetchTutorials();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (err: any) {
      console.error(
        "Tutorial action error:",
        err.response?.data || err.message
      );
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
    } catch (err: any) {
      console.error(
        "Delete tutorial error:",
        err.response?.data || err.message
      );
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

      {tutorials.length === 0 ? (
        <p className="text-center py-20 text-zinc-500">No tutorials found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => {
            const videoIdMatch = tutorial.videoUrl.match(
              /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/
            );
            const videoId = videoIdMatch ? videoIdMatch[1] : null;

            return (
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

                {videoId ? (
                  <div className="mt-3 w-full aspect-video">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={tutorial.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-red-500 mt-2 text-sm">
                    Invalid YouTube URL
                  </p>
                )}

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
            );
          })}
        </div>
      )}
    </div>
  );
}
