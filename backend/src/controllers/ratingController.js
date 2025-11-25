import { query, run, get } from '../config/database.js';

// @desc    Get all ratings for a recipe
// @route   GET /api/recipes/:recipeId/ratings
// @access  Public
export const getRecipeRatings = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Check if recipe exists
    const recipe = await get('SELECT id FROM recipes WHERE id = ?', [recipeId]);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const ratings = await query(
      `
      SELECT
        r.*,
        u.name as user_name
      FROM ratings r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.recipe_id = ?
      ORDER BY r.created_at DESC
      `,
      [recipeId]
    );

    res.json(ratings);
  } catch (error) {
    console.error('Get ratings error:', error);
    res.status(500).json({ error: 'Failed to fetch ratings' });
  }
};

// @desc    Add rating to recipe
// @route   POST /api/recipes/:recipeId/ratings
// @access  Private
export const addRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, comment } = req.body;
    const user_id = req.user.id;

    // Check if recipe exists
    const recipe = await get('SELECT id, user_id FROM recipes WHERE id = ?', [recipeId]);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Prevent users from rating their own recipes
    if (recipe.user_id === user_id) {
      return res.status(400).json({ error: 'Cannot rate your own recipe' });
    }

    // Check if user already rated this recipe
    const existingRating = await get(
      'SELECT id FROM ratings WHERE recipe_id = ? AND user_id = ?',
      [recipeId, user_id]
    );

    if (existingRating) {
      return res.status(409).json({ error: 'You have already rated this recipe' });
    }

    // Create rating
    const result = await run(
      'INSERT INTO ratings (recipe_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [recipeId, user_id, rating, comment || null]
    );

    const newRating = await get(
      `
      SELECT
        r.*,
        u.name as user_name
      FROM ratings r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.id = ?
      `,
      [result.id]
    );

    res.status(201).json({
      message: 'Rating added successfully',
      rating: newRating
    });
  } catch (error) {
    console.error('Add rating error:', error);
    res.status(500).json({ error: 'Failed to add rating' });
  }
};

// @desc    Update rating
// @route   PUT /api/ratings/:id
// @access  Private
export const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const user_id = req.user.id;

    // Check if rating exists and belongs to user
    const existingRating = await get(
      'SELECT * FROM ratings WHERE id = ?',
      [id]
    );

    if (!existingRating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    if (existingRating.user_id !== user_id) {
      return res.status(403).json({ error: 'Not authorized to update this rating' });
    }

    // Update rating
    await run(
      'UPDATE ratings SET rating = ?, comment = ? WHERE id = ?',
      [rating, comment || null, id]
    );

    const updatedRating = await get(
      `
      SELECT
        r.*,
        u.name as user_name
      FROM ratings r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.id = ?
      `,
      [id]
    );

    res.json({
      message: 'Rating updated successfully',
      rating: updatedRating
    });
  } catch (error) {
    console.error('Update rating error:', error);
    res.status(500).json({ error: 'Failed to update rating' });
  }
};

// @desc    Delete rating
// @route   DELETE /api/ratings/:id
// @access  Private
export const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Check if rating exists and belongs to user
    const rating = await get(
      'SELECT * FROM ratings WHERE id = ?',
      [id]
    );

    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    if (rating.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this rating' });
    }

    // Delete rating
    await run('DELETE FROM ratings WHERE id = ?', [id]);

    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Delete rating error:', error);
    res.status(500).json({ error: 'Failed to delete rating' });
  }
};
