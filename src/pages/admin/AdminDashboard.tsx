import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get('/api/admin/analytics', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setStats(res.data));
  }, []);

  if (!stats) return <div>Loading...</div>;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Analytics</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-6">
          <p className="text-gray-500">Total Users</p>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <p className="text-gray-500">Active Today</p>
          <p className="text-2xl font-bold">{stats.activeToday}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
