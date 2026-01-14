"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import BookDetails from "./components/BookDetails";
import ReviewsSection from "./components/ReviewsSection";
import WriteReview from "./components/WriteReview";

export default function BookDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading")
    return <p className="text-center py-20">Checking login...</p>;
  if (!session) {
    router.push(`/auth/login`);
    return null;
  }

  if (!id) return <p className="text-center py-20">Invalid book id</p>;

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <BookDetails bookId={id} />

      <ReviewsSection bookId={id} />

      <WriteReview bookId={id} userName={session.user?.name || "Anonymous"} />
    </div>
  );
}
