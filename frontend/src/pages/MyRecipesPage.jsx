import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { recipeService } from '../services/recipeService';
import RecipeList from '../components/Recipe/RecipeList';

const MyRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyRecipes();
  }, []);

  const loadMyRecipes = async () => {
    try {
      const data = await recipeService.getMyRecipes();
      setRecipes(data);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaUser className="text-5xl text-indigo-600" />
          <span>My Recipes</span>
        </h1>
        <p className="text-gray-600 text-lg ml-16">
          Manage and showcase your culinary creations
        </p>
      </div>
      <RecipeList recipes={recipes} loading={loading} />
    </div>
  );
};

export default MyRecipesPage;
