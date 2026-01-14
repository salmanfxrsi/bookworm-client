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

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 6;

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch"))
      return url.replace("watch?v=", "embed/").split("&")[0];
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop()?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    return url;
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tutorials`
      );
      const mapped = res.data.map((t: any) => ({
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

  const filteredTutorials = tutorials.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTutorials.length / limit);

  const paginatedTutorials = filteredTutorials.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleResetSearch = () => {
    setSearch("");
    setPage(1);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-8">
        All Tutorials
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-8">
        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-600 w-full sm:w-1/3"
        />

        <button
          onClick={handleResetSearch}
          className="bg-zinc-300 dark:bg-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
        >
          Reset
        </button>
      </div>

      {loading ? (
        <p className="text-center py-20 text-zinc-500">Loading tutorials...</p>
      ) : paginatedTutorials.length === 0 ? (
        <p className="text-center py-20 text-zinc-500">No tutorials found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {paginatedTutorials.map((tutorial) => (
              <div
                key={tutorial._id}
                className="bg-white/60 dark:bg-black/60 backdrop-blur-md rounded-2xl shadow-md p-5 flex flex-col"
              >
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {tutorial.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                  {tutorial.description.length > 100
                    ? tutorial.description.slice(0, 100) + "..."
                    : tutorial.description}
                </p>

                {tutorial.videoUrl && (
                  <div className="aspect-video w-full mb-3 rounded-xl overflow-hidden shadow-sm">
                    <iframe
                      className="w-full h-full"
                      src={getEmbedUrl(tutorial.videoUrl)}
                      title={tutorial.title}
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 rounded-xl bg-zinc-300 dark:bg-zinc-700 disabled:opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
            >
              Prev
            </button>
            <span className="text-zinc-700 dark:text-zinc-300">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-xl bg-zinc-300 dark:bg-zinc-700 disabled:opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
