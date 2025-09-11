// pages/AuthSuccess.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAuthTokens } from '../services/api';

function AuthSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh');
    const userData = searchParams.get('user');

    if (token && refreshToken && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));
        setAuthTokens(token, refreshToken, user);
        toast.success(`Welcome ${user.name}!`);
        navigate('/');
        window.location.reload(); // Refresh to update navbar
      } catch (error) {
        toast.error('Authentication failed');
        navigate('/login');
      }
    } else {
      toast.error('Authentication failed');
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-32 h-32 border-b-2 rounded-full animate-spin border-primary-600"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default AuthSuccess;