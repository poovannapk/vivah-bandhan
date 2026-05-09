import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  AlertTriangle,
  Ban,
  Crown,
  IndianRupee,
  Mail,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

type AdminAnalytics = {
  totals: {
    users: number;
    activeUsers: number;
    bannedUsers: number;
    verifiedUsers: number;
    premiumUsers: number;
    newUsersToday: number;
    newUsers30Days: number;
    profileCompletionRate: number;
  };
  sales: {
    revenueTotal: number;
    revenueThisMonth: number;
    activeSubscriptions: number;
    subscriptionBreakdown: Record<string, number>;
    salesByMonth: Array<{ month: string; revenue: number }>;
  };
  engagement: {
    totalMessages: number;
    unreadMessages: number;
    flaggedMessages: number;
    flaggedPhotoUsers: number;
  };
  userGrowth: Array<{ month: string; users: number }>;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
    joinedDate: string;
    verified: boolean;
    premium: boolean;
    banned: boolean;
    role: string;
  }>;
};

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat('en-IN');

const AdminDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<AdminAnalytics>('/api/admin/analytics', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => setAnalytics(res.data))
      .catch(err => setError(err.response?.data?.error || 'Unable to load admin report'))
      .finally(() => setLoading(false));
  }, []);

  const subscriptionRows = useMemo(() => {
    if (!analytics) return [];
    return Object.entries(analytics.sales.subscriptionBreakdown).map(([plan, count]) => ({ plan, count }));
  }, [analytics]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading admin report...</div>;
  }

  if (error || !analytics) {
    return (
      <div className="p-6">
        <Card className="p-6 border-red-200 bg-red-50 text-red-700">
          {error || 'Unable to load admin report'}
        </Card>
      </div>
    );
  }

  const summaryCards = [
    {
      label: 'Total Users',
      value: number.format(analytics.totals.users),
      detail: `${number.format(analytics.totals.newUsers30Days)} joined in 30 days`,
      icon: Users,
      tone: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Revenue',
      value: currency.format(analytics.sales.revenueTotal),
      detail: `${currency.format(analytics.sales.revenueThisMonth)} this month`,
      icon: IndianRupee,
      tone: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Active Subscriptions',
      value: number.format(analytics.sales.activeSubscriptions),
      detail: `${number.format(analytics.totals.premiumUsers)} premium users`,
      icon: Crown,
      tone: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Profile Completion',
      value: `${analytics.totals.profileCompletionRate}%`,
      detail: `${number.format(analytics.totals.verifiedUsers)} verified users`,
      icon: ShieldCheck,
      tone: 'text-violet-600 bg-violet-50',
    },
  ];

  const operationalCards = [
    { label: 'Active Users', value: analytics.totals.activeUsers, icon: UserCheck },
    { label: 'Banned Users', value: analytics.totals.bannedUsers, icon: Ban },
    { label: 'Messages', value: analytics.engagement.totalMessages, icon: MessageSquare },
    { label: 'Unread Messages', value: analytics.engagement.unreadMessages, icon: Mail },
    { label: 'Flagged Messages', value: analytics.engagement.flaggedMessages, icon: AlertTriangle },
    { label: 'Flagged Photo Users', value: analytics.engagement.flaggedPhotoUsers, icon: AlertTriangle },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 text-primary-600 mb-2">
          <TrendingUp className="h-6 w-6" />
          <span className="text-sm font-semibold uppercase tracking-wide">Business owner report</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Complete overview of users, sales, subscriptions, and platform health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{item.value}</p>
                  <p className="text-sm text-gray-500 mt-2">{item.detail}</p>
                </div>
                <div className={`p-3 rounded-lg ${item.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 xl:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Sales Trend</h2>
              <p className="text-sm text-gray-500">Revenue from subscriptions by month</p>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.sales.salesByMonth}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => currency.format(Number(value))} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#revenueFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900">Subscription Mix</h2>
          <p className="text-sm text-gray-500 mb-5">Plan distribution</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionRows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="plan" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#7c3aed" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Operations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
            {operationalCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{number.format(item.value)}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
          <p className="text-sm text-gray-500 mb-5">New registered users by month</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.userGrowth}>
                <defs>
                  <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#2563eb" fill="url(#usersFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
          <p className="text-sm text-gray-500">Latest accounts created on the platform</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {analytics.recentUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={user.verified ? 'success' : 'warning'} size="sm">
                        {user.verified ? 'Verified' : 'Pending'}
                      </Badge>
                      {user.premium && <Badge variant="primary" size="sm">Premium</Badge>}
                      {user.banned && <Badge variant="error" size="sm">Banned</Badge>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
