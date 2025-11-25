import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUtensils, FaSearch } from 'react-icons/fa';
import { recipeService } from '../services/recipeService';
import RecipeList from '../components/Recipe/RecipeList';

const HomePage = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
    loadRecipes('');
  }, [location.pathname]);

  useEffect(() => {
    const handleResetSearch = () => {
      setSearch('');
      loadRecipes('');
    };

    window.addEventListener('resetHomeSearch', handleResetSearch);
    return () => {
      window.removeEventListener('resetHomeSearch', handleResetSearch);
    };
  }, []);

  const loadRecipes = async (searchQuery = '') => {
    try {
      setLoading(true);
      const data = await recipeService.getAllRecipes(searchQuery);
      setRecipes(data);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadRecipes(search);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4 flex justify-center">
          <FaUtensils className="text-indigo-600" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          Discover Amazing Recipes
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore delicious recipes shared by our community of home chefs
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-12 max-w-2xl mx-auto">
        <div className="flex gap-3 bg-white rounded-xl shadow-md border border-gray-200 p-2">
          <div className="flex-1 flex items-center gap-3 px-2">
            <FaSearch className="text-2xl text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for recipes by title or ingredients..."
              className="flex-1 py-3 focus:outline-none text-gray-900 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-md active:transform active:scale-[0.98] transition-all duration-200"
          >
            Search
          </button>
        </div>
      </form>

      <RecipeList recipes={recipes} loading={loading} />
    </div>
  );
};

export default HomePage;
