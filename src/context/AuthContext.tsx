import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      // Save token and user info
      localStorage.setItem('token', data.token);
      setUser({
        id: Date.now().toString(),
        email: data.user.email,
        firstName: data.user.name?.split(' ')[0] || '',
        lastName: data.user.name?.split(' ').slice(1).join(' ') || '',
        dateOfBirth: '',
        gender: 'male',
        phone: '',
        isVerified: true,
        profileComplete: true,
        subscription: 'free',
        isActive: true,
        lastSeen: new Date().toISOString(),
        joinedDate: new Date().toISOString(),
        verificationStatus: 'verified',
        role: data.user.role || 'user',
      });
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message || 'Login failed');
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User> & { password?: string }) => {
    setIsLoading(true);
    try {
      // Real API call
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
          email: userData.email,
          password: userData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      // Only set user as unverified, let them verify via email
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || 'male',
        phone: userData.phone || '',
        isVerified: false,
        profileComplete: false,
        subscription: 'free',
        isActive: true,
        lastSeen: new Date().toISOString(),
        joinedDate: new Date().toISOString(),
        verificationStatus: 'pending',
        role: 'user',
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message || 'Registration failed');
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isLoading,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};