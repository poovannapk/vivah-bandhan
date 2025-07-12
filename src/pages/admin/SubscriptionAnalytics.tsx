import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface Analytics {
  revenue: number;
  planBreakdown: { [plan: string]: number };
  churnRate: number;
}

const SubscriptionAnalytics: React.FC = () => {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    axios.get('/api/admin/analytics', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setData(res.data));
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Subscription Analytics</h2>
      <div className="bg-white rounded shadow p-6 mb-4">
        <p className="mb-2">Total Revenue: <span className="font-semibold">₹{data.revenue}</span></p>
        <p className="mb-2">Churn Rate: <span className="font-semibold">{data.churnRate}%</span></p>
        <div>
          <h3 className="font-semibold mb-2">Plan Breakdown:</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={Object.entries(data.planBreakdown).map(([plan, count]) => ({ plan, count }))}>
              <XAxis dataKey="plan" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={Object.entries(data.planBreakdown).map(([plan, count]) => ({ name: plan, value: count }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#2563eb" label>
                {Object.entries(data.planBreakdown).map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={["#2563eb", "#f59e42", "#10b981"][idx % 3]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAnalytics;
