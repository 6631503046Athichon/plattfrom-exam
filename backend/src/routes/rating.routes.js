import express from 'express';
import {
  getRecipeRatings,
  addRating,
  updateRating,
  deleteRating
} from '../controllers/ratingController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRating, validateId } from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.get('/recipes/:recipeId/ratings', getRecipeRatings);

// Protected routes
router.post('/recipes/:recipeId/ratings', authenticateToken, validateRating, addRating);
router.put('/ratings/:id', authenticateToken, validateId, validateRating, updateRating);
router.delete('/ratings/:id', authenticateToken, validateId, deleteRating);

export default router;
