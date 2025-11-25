import { useState } from 'react';
import { FaUserPlus, FaExclamationTriangle, FaLightbulb, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match!');
      return;
    }
    setPasswordError('');
    onSubmit({ name: formData.name, email: formData.email, password: formData.password });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="text-4xl mb-3 flex justify-center">
          <FaUserPlus className="text-indigo-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-600 mt-2 text-sm">Join us to share your amazing recipes</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 flex items-start gap-3">
          <FaExclamationTriangle className="text-xl flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {passwordError && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 flex items-start gap-3">
          <FaExclamationTriangle className="text-xl flex-shrink-0 mt-0.5" />
          <span className="text-sm">{passwordError}</span>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="Your full name"
        />
      </div>

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

      <div className="mb-6">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
            minLength="6"
            autoComplete="new-password"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="At least 6 characters"
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
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaLightbulb className="text-yellow-500" />
          Use at least 6 characters for security
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
            minLength="6"
            autoComplete="new-password"
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Re-enter your password"
            style={{ WebkitTextSecurity: showConfirmPassword ? 'none' : 'disc' }}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors z-10 flex items-center justify-center"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
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
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
