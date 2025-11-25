import { useState } from 'react';
import { FaStar, FaLightbulb } from 'react-icons/fa';

const RatingForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
    setRating(5);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        <span>Leave a Rating</span>
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-gray-900">
          Your Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-4xl ${
                star <= rating
                  ? 'text-yellow-500 drop-shadow-md'
                  : 'text-gray-300'
              } hover:scale-125 hover:drop-shadow-lg active:scale-110 transition-all duration-200`}
            >
              ★
            </button>
          ))}
          <span className="ml-3 text-lg font-bold text-indigo-600">
            {rating} {rating === 1 ? 'Star' : 'Stars'}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-900">
          Comment <span className="text-gray-500 font-normal">(optional)</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          placeholder="Share your thoughts about this recipe..."
        />
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaLightbulb className="text-yellow-500" />
          Tell others what you loved about this recipe
        </p>
      </div>

      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-md active:transform active:scale-[0.98] transition-all duration-200 w-full"
      >
        Submit Rating
      </button>
    </form>
  );
};

export default RatingForm;
