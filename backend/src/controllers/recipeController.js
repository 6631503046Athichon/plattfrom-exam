import { query, run, get } from '../config/database.js';

// @desc    Get all recipes with average ratings
// @route   GET /api/recipes
// @access  Public
export const getAllRecipes = async (req, res) => {
  try {
    const { search = '' } = req.query;

    let sql = `
      SELECT
        r.*,
        u.name as user_name,
        COALESCE(AVG(rt.rating), 0) as average_rating,
        COUNT(rt.id) as rating_count
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN ratings rt ON r.id = rt.recipe_id
    `;

    const params = [];

    if (search) {
      sql += ' WHERE r.title LIKE ? OR r.ingredients LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' GROUP BY r.id ORDER BY r.created_at DESC';

    const recipes = await query(sql, params);

    res.json(recipes);
  } catch (error) {
    console.error('Get recipes error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await get(
      `
      SELECT
        r.*,
        u.name as user_name,
        u.email as user_email,
        COALESCE(AVG(rt.rating), 0) as average_rating,
        COUNT(rt.id) as rating_count
      FROM recipes r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN ratings rt ON r.id = rt.recipe_id
      WHERE r.id = ?
      GROUP BY r.id
      `,
      [id]
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Get recipe error:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Private
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, image_url } = req.body;
    const user_id = req.user.id;

    const result = await run(
      `INSERT INTO recipes (user_id, title, ingredients, instructions, image_url)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, title, ingredients, instructions, image_url || null]
    );

    const recipe = await get(
      'SELECT * FROM recipes WHERE id = ?',
      [result.id]
    );

    res.status(201).json({
      message: 'Recipe created successfully',
      recipe
    });
  } catch (error) {
    console.error('Create recipe error:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions, image_url } = req.body;
    const user_id = req.user.id;

    // Check if recipe exists and belongs to user
    const recipe = await get(
      'SELECT * FROM recipes WHERE id = ?',
      [id]
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this recipe' });
    }

    // Update recipe
    await run(
      `UPDATE recipes
       SET title = ?, ingredients = ?, instructions = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [title, ingredients, instructions, image_url || null, id]
    );

    const updatedRecipe = await get(
      'SELECT * FROM recipes WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe
    });
  } catch (error) {
    console.error('Update recipe error:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    // Check if recipe exists and belongs to user
    const recipe = await get(
      'SELECT * FROM recipes WHERE id = ?',
      [id]
    );

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipe.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this recipe' });
    }

    // Delete recipe
    await run('DELETE FROM recipes WHERE id = ?', [id]);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete recipe error:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
};

// @desc    Get user's recipes
// @route   GET /api/recipes/my-recipes
// @access  Private
export const getMyRecipes = async (req, res) => {
  try {
    const user_id = req.user.id;

    const recipes = await query(
      `
      SELECT
        r.*,
        COALESCE(AVG(rt.rating), 0) as average_rating,
        COUNT(rt.id) as rating_count
      FROM recipes r
      LEFT JOIN ratings rt ON r.id = rt.recipe_id
      WHERE r.user_id = ?
      GROUP BY r.id
      ORDER BY r.created_at DESC
      `,
      [user_id]
    );

    res.json(recipes);
  } catch (error) {
    console.error('Get my recipes error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};
