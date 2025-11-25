import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
} from '../controllers/recipeController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRecipe, validateId } from '../middleware/validator.js';

const router = express.Router();

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', validateId, getRecipeById);

// Protected routes
router.post('/', authenticateToken, validateRecipe, createRecipe);
router.put('/:id', authenticateToken, validateId, validateRecipe, updateRecipe);
router.delete('/:id', authenticateToken, validateId, deleteRecipe);
router.get('/user/my-recipes', authenticateToken, getMyRecipes);

export default router;
