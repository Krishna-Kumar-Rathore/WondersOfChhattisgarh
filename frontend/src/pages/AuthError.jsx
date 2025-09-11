import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AuthError() {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error('Authentication failed. Please try again.');
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mb-4 text-gray-600">Something went wrong during authentication.</p>
        <p className="text-sm text-gray-500">Redirecting to login page...</p>
      </div>
    </div>
  );
}

export default AuthError;