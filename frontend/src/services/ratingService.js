import { mockRatings } from '../data/mockData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredRatings = () => {
  const stored = localStorage.getItem('ratings');
  return stored ? JSON.parse(stored) : [...mockRatings];
};

const saveRatings = (ratings) => {
  localStorage.setItem('ratings', JSON.stringify(ratings));
};

const updateRecipeRating = (recipeId) => {
  const recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
  const ratings = getStoredRatings();

  const recipeRatings = ratings.filter(r => r.recipe_id === parseInt(recipeId));
  const avgRating = recipeRatings.length > 0
    ? recipeRatings.reduce((sum, r) => sum + r.rating, 0) / recipeRatings.length
    : 0;

  const recipeIndex = recipes.findIndex(r => r.id === parseInt(recipeId));
  if (recipeIndex !== -1) {
    recipes[recipeIndex].average_rating = avgRating;
    recipes[recipeIndex].rating_count = recipeRatings.length;
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }
};

export const ratingService = {
  getRatings: async (recipeId) => {
    await delay();
    const ratings = getStoredRatings();
    return ratings.filter(r => r.recipe_id === parseInt(recipeId));
  },

  addRating: async (recipeId, ratingData) => {
    await delay();
    const ratings = getStoredRatings();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const existingRating = ratings.find(
      r => r.recipe_id === parseInt(recipeId) && r.user_id === currentUser.id
    );

    if (existingRating) {
      throw new Error('You have already rated this recipe');
    }

    const newRating = {
      id: Math.max(...ratings.map(r => r.id), 0) + 1,
      recipe_id: parseInt(recipeId),
      user_id: currentUser.id,
      user_name: currentUser.name,
      rating: ratingData.rating,
      comment: ratingData.comment || '',
      created_at: new Date().toISOString()
    };

    ratings.push(newRating);
    saveRatings(ratings);
    updateRecipeRating(recipeId);

    return newRating;
  },

  updateRating: async (id, ratingData) => {
    await delay();
    const ratings = getStoredRatings();
    const index = ratings.findIndex(r => r.id === parseInt(id));

    if (index === -1) {
      throw new Error('Rating not found');
    }

    ratings[index] = {
      ...ratings[index],
      rating: ratingData.rating,
      comment: ratingData.comment || ratings[index].comment,
      updated_at: new Date().toISOString()
    };

    saveRatings(ratings);
    updateRecipeRating(ratings[index].recipe_id);

    return ratings[index];
  },

  deleteRating: async (id) => {
    await delay();
    const ratings = getStoredRatings();
    const rating = ratings.find(r => r.id === parseInt(id));

    if (!rating) {
      throw new Error('Rating not found');
    }

    const filteredRatings = ratings.filter(r => r.id !== parseInt(id));
    saveRatings(filteredRatings);
    updateRecipeRating(rating.recipe_id);

    return { message: 'Rating deleted successfully' };
  },
};
