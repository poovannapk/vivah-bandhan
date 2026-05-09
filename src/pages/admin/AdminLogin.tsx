import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Briefcase, Lock, Mail, ShieldCheck } from 'lucide-react';
import { authApi } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setAuthenticatedUser } = useAuth();
  const navigate = useNavigate();

  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authApi.adminLogin(email.trim(), password.trim());

      setAuthenticatedUser(data.token, data.user);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Business owner login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-center">
        <div className="text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium mb-6">
            <Briefcase className="h-4 w-4" />
            Business owner access
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Vivah Bandhan Owner Console</h1>
          <p className="mt-4 text-gray-300 max-w-2xl">
            Review users, revenue, subscriptions, moderation queues, and platform performance from a dedicated admin workspace.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['User reports', 'Sales analytics', 'Moderation overview'].map(item => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="h-5 w-5 text-emerald-400 mb-3" />
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-7">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Business Owner Login</h2>
            <p className="text-sm text-gray-600 mt-2">Use the business owner email and admin password from backend/.env.</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Owner Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              icon={<Mail className="h-5 w-5" />}
              placeholder="owner@example.com"
              required
            />

            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              icon={<Lock className="h-5 w-5" />}
              placeholder="Enter password"
              required
            />

            <Button type="submit" className="w-full" isLoading={loading} disabled={!email || !password}>
              Login as Business Owner
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
