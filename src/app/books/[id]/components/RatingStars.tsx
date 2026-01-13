"use client";

interface Props {
  rating: number; // 0 to 5
}

const RatingStars: React.FC<Props> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center space-x-1 text-yellow-500">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {halfStar && <span>☆</span>}
      {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }).map((_, i) => (
        <span key={i} className="text-gray-300">★</span>
      ))}
    </div>
  );
};

export default RatingStars;
