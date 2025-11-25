import api from './api';

export const ratingService = {
  getRatings: async (recipeId) => {
    const response = await api.get(`/recipes/${recipeId}/ratings`);
    return response.data;
  },

  addRating: async (recipeId, ratingData) => {
    const response = await api.post(`/recipes/${recipeId}/ratings`, ratingData);
    return response.data;
  },

  updateRating: async (id, ratingData) => {
    const response = await api.put(`/ratings/${id}`, ratingData);
    return response.data;
  },

  deleteRating: async (id) => {
    const response = await api.delete(`/ratings/${id}`);
    return response.data;
  },
};
