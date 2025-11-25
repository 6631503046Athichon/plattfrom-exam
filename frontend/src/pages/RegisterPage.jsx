import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/Auth/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (userData) => {
    try {
      setError('');
      await register(userData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Email may already exist.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <RegisterForm onSubmit={handleSubmit} error={error} />
      <p className="text-center mt-4 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
