import React, { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authApi } from '../lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password?: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setAuthenticatedUser: (token: string, user: User) => void;
  refreshUser: () => Promise<void>;
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const setAuthenticatedUser = useCallback((token: string, nextUser: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { user: nextUser } = await authApi.me();
      localStorage.setItem('user', JSON.stringify(nextUser));
      setUser(nextUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authApi.login(email, password);
      setAuthenticatedUser(data.token, data.user);
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
      const data = await authApi.register(userData);
      setAuthenticatedUser(data.token, data.user);
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
    localStorage.removeItem('token');
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
      setAuthenticatedUser,
      refreshUser,
      isLoading,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
