import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SocialLoginSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(user => {
          if (auth && auth.updateUser) {
            auth.updateUser({
              email: user.email,
              firstName: user.name?.split(' ')[0] || '',
              lastName: user.name?.split(' ').slice(1).join(' ') || '',
              isVerified: true,
              role: user.role || 'user',
            });
          }
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/dashboard');
        });
    } else {
      navigate('/login');
    }
  }, [location, navigate, auth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Signing you in...</h2>
      </div>
    </div>
  );
};

export default SocialLoginSuccess;
