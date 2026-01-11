export interface Genre {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch genres");
    }

    const data = await res.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};
