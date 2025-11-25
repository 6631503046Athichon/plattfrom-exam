import { Link } from 'react-router-dom';
import RatingStars from '../Rating/RatingStars';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image_url || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=300&h=200&fit=crop'}
          alt={recipe.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
          {recipe.rating_count || 0} reviews
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {recipe.instructions?.substring(0, 100)}...
        </p>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <RatingStars rating={recipe.average_rating || 0} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-sm">
                {recipe.user_name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900">{recipe.user_name}</p>
              <p className="text-xs text-gray-500">{new Date(recipe.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <Link
            to={`/recipe/${recipe.id}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200 text-sm font-medium"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
