import RatingStars from "./RatingStars";


export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (!reviews.length)
    return <p className="text-zinc-500 mt-4">No reviews yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Reviews</h2>
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl bg-white/80 dark:bg-black/80"
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {review.username}
            </span>
            <RatingStars rating={review.rating} />
          </div>
          <p className="mt-2 text-zinc-700 dark:text-zinc-300">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
