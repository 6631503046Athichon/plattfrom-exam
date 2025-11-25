import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCarrot, FaClipboardList, FaComments, FaUserChef, FaEdit, FaTrash, FaQuestionCircle, FaSadTear } from 'react-icons/fa';
import { recipeService } from '../services/recipeService';
import { ratingService } from '../services/ratingService';
import { useAuth } from '../hooks/useAuth';
import RatingStars from '../components/Rating/RatingStars';
import RatingForm from '../components/Rating/RatingForm';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecipe();
    loadRatings();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await recipeService.getRecipeById(id);
      setRecipe(data);
    } catch (error) {
      console.error('Error loading recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRatings = async () => {
    try {
      const data = await ratingService.getRatings(id);
      setRatings(data);
    } catch (error) {
      console.error('Error loading ratings:', error);
    }
  };

  const handleRatingSubmit = async (ratingData) => {
    try {
      await ratingService.addRating(id, ratingData);
      loadRatings();
      loadRecipe();
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(id);
        navigate('/my-recipes');
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 flex justify-center">
            <FaSadTear className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user && user.id === recipe.user_id;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Recipe Image */}
        <div className="relative">
          <img
            src={recipe.image_url || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&h=400&fit=crop'}
            alt={recipe.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        <div className="p-8 md:p-12">
          {/* Title and Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {recipe.title}
            </h1>
            {isOwner && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/edit-recipe/${id}`)}
                  className="bg-yellow-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-yellow-600 hover:shadow-md transition-all flex items-center gap-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 hover:shadow-md transition-all flex items-center gap-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {/* Rating and Author Info */}
          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
            <RatingStars rating={recipe.average_rating || 0} size="text-2xl" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">
                  {recipe.user_name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created by</p>
                <p className="font-semibold text-gray-900">{recipe.user_name}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Published on</p>
              <p className="font-semibold text-gray-900">
                {new Date(recipe.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <FaCarrot className="text-orange-500" />
              <span>Ingredients</span>
            </h2>
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
              <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                {recipe.ingredients}
              </pre>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 flex items-center gap-2">
              <FaClipboardList className="text-indigo-500" />
              <span>Instructions</span>
            </h2>
            <div className="bg-white border border-gray-200 p-6 rounded-xl">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          </div>

          {/* Ratings & Reviews */}
          <div className="mt-12 border-t pt-10">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-2">
              <FaComments className="text-indigo-500" />
              <span>Ratings & Reviews</span>
              <span className="text-lg text-gray-500 font-normal">({ratings.length})</span>
            </h2>

            {/* Rating Form */}
            {user && !isOwner && (
              <div className="mb-8">
                <RatingForm onSubmit={handleRatingSubmit} />
              </div>
            )}

            {/* Login Prompt */}
            {!user && (
              <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl mb-8 text-center">
                <p className="text-indigo-900 font-medium">
                  Please{' '}
                  <a href="/login" className="text-indigo-600 hover:text-indigo-700 underline font-bold">
                    login
                  </a>
                  {' '}to rate this recipe and share your experience.
                </p>
              </div>
            )}

            {/* Owner Notice */}
            {isOwner && (
              <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl mb-8 text-center">
                <p className="text-gray-700 font-medium flex items-center justify-center gap-2">
                  <FaUserChef className="text-xl" />
                  You cannot rate your own recipe
                </p>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {ratings.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-5xl mb-3 flex justify-center">
                    <FaQuestionCircle className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">No reviews yet</p>
                  <p className="text-gray-500 text-sm mt-1">Be the first to share your thoughts!</p>
                </div>
              ) : (
                ratings.map((rating) => (
                  <div
                    key={rating.id}
                    className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-lg">
                            {rating.user_name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">{rating.user_name}</span>
                      </div>
                      <RatingStars rating={rating.rating} />
                    </div>
                    {rating.comment && (
                      <p className="text-gray-700 leading-relaxed mb-3 pl-13">
                        {rating.comment}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 pl-13">
                      {new Date(rating.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
