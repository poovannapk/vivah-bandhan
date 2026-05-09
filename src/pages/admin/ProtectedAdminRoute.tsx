import React from 'react';
import { Navigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

const getTokenRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const token = localStorage.getItem('token');
  const isAdmin = user?.role === 'admin' || getTokenRole() === 'admin';

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Checking admin access...</div>;
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin access required</h1>
          <p className="mt-3 text-gray-600">
            Your account is signed in, but it is not configured as an admin owner account.
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/dashboard'}>Dashboard</Button>
            <Button className="flex-1" onClick={() => window.location.href = '/admin/login'}>Owner Login</Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
