// components/GoogleLoginComponent.jsx
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setAuthTokens } from '../services/api';

function GoogleLoginComponent({ buttonText = "signin_with", onSuccess: onSuccessCallback }) {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      // Send the Google credential to your backend for verification
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/google/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        const { user, tokens } = data;
        
        // Set authentication tokens
        if (tokens) {
          setAuthTokens(tokens.accessToken, tokens.refreshToken, user);
        } else {
          // Fallback to legacy auth if tokens not provided
          localStorage.setItem('userId', user.id);
          localStorage.setItem('userName', user.name);
          localStorage.setItem('isAdmin', user.isAdmin);
        }
        
        toast.success(`Welcome ${user.name}!`);
        
        // Call custom success callback if provided
        if (onSuccessCallback) {
          onSuccessCallback(user);
        }
        
        navigate('/');
        window.location.reload(); // Refresh to update navbar
      } else {
        toast.error(data.message || 'Google authentication failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google login failed. Please try again.');
    }
  };

  const handleError = () => {
    console.error('Google login failed');
    toast.error('Google login failed. Please try again.');
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text={buttonText}
        theme="outline"
        size="large"
        width="100%"
        logo_alignment="left"
      />
    </div>
  );
}

export default GoogleLoginComponent;