import {
  mockRecipes,
  searchRecipes,
  getRecipeById as getMockRecipeById,
  getUserRecipes
} from '../data/mockData';

// Simulate async delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get all recipes from localStorage or use default mock data
const getStoredRecipes = () => {
  const stored = localStorage.getItem('recipes');
  return stored ? JSON.parse(stored) : [...mockRecipes];
};

// Save recipes to localStorage
const saveRecipes = (recipes) => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

export const recipeService = {
  getAllRecipes: async (search = '') => {
    await delay();
    const recipes = getStoredRecipes();

    if (!search) return recipes;

    const lowerQuery = search.toLowerCase();
    return recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.toLowerCase().includes(lowerQuery)
    );
  },

  getRecipeById: async (id) => {
    await delay();
    const recipes = getStoredRecipes();
    const recipe = recipes.find(r => r.id === parseInt(id));

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return recipe;
  },

  createRecipe: async (recipeData) => {
    await delay();
    const recipes = getStoredRecipes();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const newRecipe = {
      id: Math.max(...recipes.map(r => r.id), 0) + 1,
      ...recipeData,
      user_id: currentUser.id,
      user_name: currentUser.name,
      average_rating: 0,
      rating_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    recipes.push(newRecipe);
    saveRecipes(recipes);

    return newRecipe;
  },

  updateRecipe: async (id, recipeData) => {
    await delay();
    const recipes = getStoredRecipes();
    const index = recipes.findIndex(r => r.id === parseInt(id));

    if (index === -1) {
      throw new Error('Recipe not found');
    }

    recipes[index] = {
      ...recipes[index],
      ...recipeData,
      updated_at: new Date().toISOString()
    };

    saveRecipes(recipes);
    return recipes[index];
  },

  deleteRecipe: async (id) => {
    await delay();
    const recipes = getStoredRecipes();
    const filteredRecipes = recipes.filter(r => r.id !== parseInt(id));

    if (recipes.length === filteredRecipes.length) {
      throw new Error('Recipe not found');
    }

    saveRecipes(filteredRecipes);

    // Also delete associated ratings
    const ratings = JSON.parse(localStorage.getItem('ratings') || '[]');
    const filteredRatings = ratings.filter(r => r.recipe_id !== parseInt(id));
    localStorage.setItem('ratings', JSON.stringify(filteredRatings));

    return { message: 'Recipe deleted successfully' };
  },

  getMyRecipes: async () => {
    await delay();
    const recipes = getStoredRecipes();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return recipes.filter(r => r.user_id === currentUser.id);
  },
};
