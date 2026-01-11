import { useEffect, useState } from "react";
import { fetchGenres, Genre } from "@/lib/genres";

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        setLoading(true);
        const data = await fetchGenres();
        setGenres(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getGenres();
  }, []);

  return { genres, loading, error };
};
