import { FaSearch } from 'react-icons/fa';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading delicious recipes...</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
        <div className="text-6xl mb-4 flex justify-center">
          <FaSearch className="text-gray-400" />
        </div>
        <p className="text-gray-900 text-xl font-bold mb-2">No recipes found</p>
        <p className="text-gray-600 text-sm">Try adjusting your search or create a new recipe!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
