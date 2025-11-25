import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('resetHomeSearch'));
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-2">
          <FaUtensils className="text-3xl" />
          <span>Recipe Platform</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
          </Link>

          {user ? (
            <>
              <Link
                to="/my-recipes"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
              >
                My Recipes
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link
                to="/create-recipe"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
              >
                Create Recipe
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                Hello, <span className="font-medium text-gray-900">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 hover:shadow-md transition-all duration-200 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium relative group"
              >
                Login
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-200"></span>
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 hover:shadow-md transition-all duration-200 font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
