"use client";

import { useState } from "react";

interface Props {
  bookId: string;
}

const BookActions: React.FC<Props> = ({ bookId }) => {
  const [isRead, setIsRead] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => setIsRead(!isRead)}
        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
          isRead
            ? "bg-emerald-600 text-white"
            : "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        {isRead ? "Read ✔" : "Mark as Read"}
      </button>
      <button
        onClick={() => setIsWishlist(!isWishlist)}
        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
          isWishlist
            ? "bg-emerald-400 text-white"
            : "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        }`}
      >
        {isWishlist ? "In Wishlist ✔" : "Add to Wishlist"}
      </button>
    </div>
  );
};

export default BookActions;
