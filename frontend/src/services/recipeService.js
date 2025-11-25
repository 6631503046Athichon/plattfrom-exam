import api from './api';

export const recipeService = {
  getAllRecipes: async (search = '') => {
    const response = await api.get(`/recipes?search=${search}`);
    return response.data;
  },

  getRecipeById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  createRecipe: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  },

  updateRecipe: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data;
  },

  deleteRecipe: async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  },

  getMyRecipes: async () => {
    const response = await api.get('/recipes/user/my-recipes');
    return response.data;
  },
};
