import { useState } from 'react';
import { FaUserPlus, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const RegisterForm = ({ onSubmit, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

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
          <FaUserPlus className="text-green-600" />
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
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
          minLength="6"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="At least 6 characters"
        />
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaLightbulb className="text-yellow-500" />
          Use at least 6 characters for security
        </p>
      </div>

      <div className="mb-8">
        <label className="block text-gray-900 font-semibold mb-2 text-sm">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
          minLength="6"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          placeholder="Re-enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3.5 rounded-lg font-semibold hover:bg-green-700 hover:shadow-md active:transform active:scale-[0.98] transition-all duration-200"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
