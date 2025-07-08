import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CompleteProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    phone: user?.phone || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Profile update failed');
      updateUser({
        firstName: form.name.split(' ')[0],
        lastName: form.name.split(' ').slice(1).join(' '),
        dateOfBirth: form.dateOfBirth,
        gender: form.gender as 'male' | 'female' | 'other',
        phone: form.phone,
        profileComplete: true,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <input
          type="text"
          name="name"
          className="border p-2 w-full mb-4"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          className="border p-2 w-full mb-4"
          placeholder="Date of Birth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          className="border p-2 w-full mb-4"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="tel"
          name="phone"
          className="border p-2 w-full mb-4"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfilePage;
