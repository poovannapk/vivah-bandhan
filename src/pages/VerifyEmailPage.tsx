import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyEmailPage: React.FC = () => {
  const [message, setMessage] = useState('Verifying...');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from query string
  const params = new URLSearchParams(location.search);
  const token = params.get('token') || '';

  React.useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Verification failed');
        setMessage('Email verified! You can now log in.');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed');
        setMessage('');
      }
    };
    if (token) verify();
    else setError('Invalid verification link.');
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        {message && <div className="text-green-600 mb-2">{message}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
