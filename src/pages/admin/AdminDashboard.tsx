import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Ban,
  CalendarDays,
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
    return (
      <div className="min-h-screen p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-36 rounded-xl bg-white" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map(item => <div key={item} className="h-36 rounded-xl bg-white" />)}
          </div>
          <div className="h-80 rounded-xl bg-white" />
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-8">
        <Card className="p-6 border-red-200 bg-red-50 text-red-700 shadow-sm">
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
      tone: 'text-sky-700 bg-sky-50',
      accent: 'border-sky-200',
    },
    {
      label: 'Revenue',
      value: currency.format(analytics.sales.revenueTotal),
      detail: `${currency.format(analytics.sales.revenueThisMonth)} this month`,
      icon: IndianRupee,
      tone: 'text-emerald-600 bg-emerald-50',
      accent: 'border-emerald-200',
    },
    {
      label: 'Active Subscriptions',
      value: number.format(analytics.sales.activeSubscriptions),
      detail: `${number.format(analytics.totals.premiumUsers)} premium users`,
      icon: Crown,
      tone: 'text-amber-600 bg-amber-50',
      accent: 'border-amber-200',
    },
    {
      label: 'Profile Completion',
      value: `${analytics.totals.profileCompletionRate}%`,
      detail: `${number.format(analytics.totals.verifiedUsers)} verified users`,
      icon: ShieldCheck,
      tone: 'text-rose-600 bg-rose-50',
      accent: 'border-rose-200',
    },
  ];

  const operationalCards = [
    { label: 'Active Users', value: analytics.totals.activeUsers, icon: UserCheck, tone: 'text-emerald-600 bg-emerald-50' },
    { label: 'Banned Users', value: analytics.totals.bannedUsers, icon: Ban, tone: 'text-red-600 bg-red-50' },
    { label: 'Messages', value: analytics.engagement.totalMessages, icon: MessageSquare, tone: 'text-sky-600 bg-sky-50' },
    { label: 'Unread Messages', value: analytics.engagement.unreadMessages, icon: Mail, tone: 'text-amber-600 bg-amber-50' },
    { label: 'Flagged Messages', value: analytics.engagement.flaggedMessages, icon: AlertTriangle, tone: 'text-orange-600 bg-orange-50' },
    { label: 'Flagged Photo Users', value: analytics.engagement.flaggedPhotoUsers, icon: AlertTriangle, tone: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <div className="space-y-7 p-8">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px]">
          <div className="p-7">
            <div className="flex items-center gap-3 text-slate-600 mb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                <TrendingUp className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Business owner report</span>
                <p className="text-sm text-slate-500">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-950">Admin Dashboard</h1>
            <p className="text-slate-600 mt-2 max-w-3xl">Complete overview of users, sales, subscriptions, moderation signals, and platform health.</p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-slate-200 border-t border-slate-200 xl:border-l xl:border-t-0">
            <div className="bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <CalendarDays className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Today</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-950">{number.format(analytics.totals.newUsersToday)}</p>
              <p className="text-sm text-slate-500">new users</p>
            </div>
            <div className="bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <Activity className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Active</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-950">{number.format(analytics.totals.activeUsers)}</p>
              <p className="text-sm text-slate-500">available profiles</p>
            </div>
            <div className="bg-white p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Verified</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-950">{number.format(analytics.totals.verifiedUsers)}</p>
              <p className="text-sm text-slate-500">trusted users</p>
            </div>
            <div className="bg-white p-5">
              <div className="flex items-center gap-2 text-slate-500">
                <Crown className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Premium</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-950">{number.format(analytics.totals.premiumUsers)}</p>
              <p className="text-sm text-slate-500">paid members</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {summaryCards.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className={`p-5 border-t-4 ${item.accent} shadow-sm hover:shadow-md`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="text-2xl font-bold text-slate-950 mt-2">{item.value}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                    <span>{item.detail}</span>
                  </div>
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
        <Card className="p-6 xl:col-span-2 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Sales Trend</h2>
              <p className="text-sm text-slate-500">Revenue from subscriptions by month</p>
            </div>
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              {currency.format(analytics.sales.revenueThisMonth)}
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
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => currency.format(Number(value))} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" fill="url(#revenueFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Subscription Mix</h2>
              <p className="text-sm text-slate-500 mb-5">Plan distribution</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
              <Crown className="h-5 w-5" />
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionRows}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="plan" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950 mb-4">Operations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
            {operationalCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  </div>
                  <span className="font-semibold text-slate-950">{number.format(item.value)}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 xl:col-span-2 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">User Growth</h2>
          <p className="text-sm text-slate-500 mb-5">New registered users by month</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.userGrowth}>
                <defs>
                  <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#2563eb" fill="url(#usersFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">Recent Users</h2>
            <p className="text-sm text-slate-500">Latest accounts created on the platform</p>
          </div>
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            {number.format(analytics.recentUsers.length)} shown
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {analytics.recentUsers.map(user => (
                <tr key={user.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold uppercase text-white">
                        {(user.name || user.email || 'U').slice(0, 1)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-950">{user.name}</div>
                        <div className="text-sm capitalize text-slate-500">{user.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-900">{user.email}</div>
                    <div className="text-sm text-slate-500">{user.phone || 'No phone added'}</div>
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
                  <td className="px-6 py-4 text-sm text-slate-500">
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
