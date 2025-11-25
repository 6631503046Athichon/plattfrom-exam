import { useState } from 'react';
import { FaLock, FaExclamationTriangle, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3 flex justify-center">
          <FaLock className="text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-gray-600 mt-2 text-sm">Sign in to continue to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 flex items-start gap-3">
          <FaExclamationTriangle className="text-xl flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div className="mb-8">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
            style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors z-10 flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash className="text-xl flex-shrink-0" />
            ) : (
              <FaEye className="text-xl flex-shrink-0" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3.5 rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-md active:transform active:scale-[0.98] transition-all duration-200"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
