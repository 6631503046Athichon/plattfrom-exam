import { useNavigate } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';
import { recipeService } from '../services/recipeService';
import RecipeForm from '../components/Recipe/RecipeForm';

const CreateRecipePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (recipeData) => {
    try {
      await recipeService.createRecipe(recipeData);
      navigate('/my-recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="text-5xl mb-4 flex justify-center">
          <FaPlusCircle className="text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Recipe</h1>
        <p className="text-gray-600">Share your culinary masterpiece with the community</p>
      </div>
      <RecipeForm onSubmit={handleSubmit} buttonText="Create Recipe" />
    </div>
  );
};

export default CreateRecipePage;
