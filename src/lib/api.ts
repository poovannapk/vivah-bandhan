import { User } from '../types';

type AuthResponse = {
  token: string;
  user: User;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const getAuthToken = () => localStorage.getItem('token');

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = getAuthToken();
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }

  return data as T;
};

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  adminLogin: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (userData: Partial<User> & { password?: string }) =>
    request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  me: () => request<{ user: User }>('/api/auth/me'),
};
