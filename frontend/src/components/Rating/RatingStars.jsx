const RatingStars = ({ rating, size = 'text-lg' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`transition-colors ${
            star <= fullStars
              ? 'text-yellow-500 drop-shadow-sm'
              : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span className="text-yellow-500 drop-shadow-sm -ml-1">½</span>
      )}
      <span className="text-sm font-semibold text-gray-700 ml-2">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default RatingStars;
