import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { recipeService } from '../services/recipeService';
import { useAuth } from '../hooks/useAuth';
import RecipeForm from '../components/Recipe/RecipeForm';

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    try {
      const data = await recipeService.getRecipeById(id);
      
      const isOwner = user && user.id === data.user_id;
      const isAdmin = user && user.role === 'admin';
      
      if (!isOwner && !isAdmin) {
        setError('You are not authorized to edit this recipe');
        return;
      }
      
      setRecipe(data);
    } catch (error) {
      console.error('Error loading recipe:', error);
      setError('Recipe not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (recipeData) => {
    try {
      await recipeService.updateRecipe(id, recipeData);
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Error updating recipe. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 font-semibold">Recipe not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4 flex justify-center">
          <FaEdit className="text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Recipe</h1>
        <p className="text-gray-600">Update your culinary masterpiece</p>
      </div>
      <RecipeForm 
        onSubmit={handleSubmit} 
        initialData={recipe}
        buttonText="Update Recipe" 
      />
    </div>
  );
};

export default EditRecipePage;

