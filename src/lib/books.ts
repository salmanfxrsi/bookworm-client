export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export const getBooks = async (): Promise<Book[]> => {
  try {
    const res = await fetch("http://localhost:5000/api/books", {
      cache: "no-store", 
    });
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await res.json();
    return data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
