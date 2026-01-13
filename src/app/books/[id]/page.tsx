"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookDetailsHeader from "./components/BookDetailsHeader";
import BookActions from "./components/BookActions";
import AddReviewForm from "./components/AddReviewForm";
import ReviewsList from "./components/ReviewsList";

interface Book {
  _id: string;
  title: string;
  author: string;
  cover: string;
  avgRating: number;
  description: string;
}

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
}

interface Props {
  params: { id: string };
}

const BookDetailsPage: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const { data: session, status } = useSession();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data));
    }
  }, [id, status]);

  const handleReviewAdded = (review: Omit<Review, "id">) => {
    setReviews((prev) => [...prev, { ...review, id: Date.now().toString() }]);
  };

  if (status === "loading" || !book) return <p>Loading book details...</p>;

  return (
    <div className="p-6 space-y-6">
      <BookDetailsHeader book={book} />
      <BookActions bookId={book._id} />
      <p className="text-gray-700 mt-4">{book.description}</p>
      <ReviewsList reviews={reviews} />
      <AddReviewForm bookId={book._id} onReviewAdded={handleReviewAdded} />
    </div>
  );
};

export default BookDetailsPage;
