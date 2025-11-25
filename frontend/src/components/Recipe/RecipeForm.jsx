import { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';

const RecipeForm = ({ onSubmit, initialData = {}, buttonText = 'Create Recipe' }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    ingredients: initialData.ingredients || '',
    instructions: initialData.instructions || '',
    image_url: initialData.image_url || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Recipe Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="e.g., Spaghetti Carbonara"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Ingredients <span className="text-red-500">*</span>
        </label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          placeholder="List ingredients, one per line&#10;e.g.,&#10;• 400g spaghetti&#10;• 200g bacon&#10;• 4 eggs"
        />
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaLightbulb className="text-yellow-500" />
          List each ingredient on a new line
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          rows="7"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          placeholder="Step-by-step cooking instructions..."
        />
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaLightbulb className="text-yellow-500" />
          Write clear, step-by-step instructions
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Image URL <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <input
          type="url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="https://example.com/delicious-recipe.jpg"
        />
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaLightbulb className="text-yellow-500" />
          Use a direct link to an image (jpg, png)
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default RecipeForm;
