import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SocialLoginSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      refreshUser()
        .then(() => {
          navigate('/dashboard');
        })
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [location, navigate, refreshUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Signing you in...</h2>
      </div>
    </div>
  );
};

export default SocialLoginSuccess;
