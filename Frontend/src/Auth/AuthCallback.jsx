// src/pages/AuthCallback.jsx or src/components/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const error = params.get('error');

    if (token) {
      // Store the token (e.g., in localStorage or sessionStorage)
      localStorage.setItem('authToken', token);
      console.log("Token received and stored:", token);
      // Redirect to your main application page
      navigate('/');
    } else if (error) {
      // Handle the error (e.g., display a message, redirect to login with error)
      console.error("OAuth Callback Error:", error);
      alert(`Authentication failed: ${error}`);
      navigate('/login'); // Redirect to login page if there's an error
    } else {
      // No token or error found, redirect to login as a fallback
      console.warn("No token or error found in OAuth callback. Redirecting to login.");
      navigate('/login');
    }
  }, [navigate, location]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-lg">Processing authentication...</p>
    </div>
  );
}