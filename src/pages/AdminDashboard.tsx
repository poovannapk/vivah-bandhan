import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Heart, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Settings,
  Shield,
  MessageSquare,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const stats = [
    {
      title: 'Total Users',
      value: '25,847',
      change: '+12%',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Users',
      value: '18,234',
      change: '+8%',
      icon: <UserCheck className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Matches',
      value: '12,456',
      change: '+15%',
      icon: <Heart className="h-6 w-6" />,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Revenue',
      value: '₹2,45,678',
      change: '+22%',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Premium Users',
      value: '3,456',
      change: '+18%',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Pending Verifications',
      value: '234',
      change: '-5%',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const recentUsers = [
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 98765 43210',
      joinedDate: '2024-01-15',
      status: 'active',
      subscription: 'premium',
      verificationStatus: 'verified',
      location: 'Mumbai, Maharashtra',
      avatar: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '2',
      name: 'Rahul Patel',
      email: 'rahul@example.com',
      phone: '+91 98765 43211',
      joinedDate: '2024-01-14',
      status: 'active',
      subscription: 'free',
      verificationStatus: 'pending',
      location: 'Ahmedabad, Gujarat',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: '3',
      name: 'Ananya Reddy',
      email: 'ananya@example.com',
      phone: '+91 98765 43212',
      joinedDate: '2024-01-13',
      status: 'inactive',
      subscription: 'elite',
      verificationStatus: 'verified',
      location: 'Hyderabad, Telangana',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const supportTickets = [
    {
      id: '1',
      user: 'Priya Sharma',
      subject: 'Profile verification issue',
      category: 'verification',
      priority: 'high',
      status: 'open',
      createdAt: '2024-01-15 10:30 AM'
    },
    {
      id: '2',
      user: 'Rahul Patel',
      subject: 'Payment not processed',
      category: 'billing',
      priority: 'urgent',
      status: 'in-progress',
      createdAt: '2024-01-15 09:15 AM'
    },
    {
      id: '3',
      user: 'Ananya Reddy',
      subject: 'Unable to send messages',
      category: 'technical',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-14 02:45 PM'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'verification', label: 'Verification', icon: <Shield className="h-5 w-5" /> },
    { id: 'support', label: 'Support', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const handleUserAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
  };

  const handleVerificationAction = (action: 'approve' | 'reject', userId: string) => {
    console.log(`${action} verification for user:`, userId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your matrimony platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                        {stat.icon}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - User growth over time</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart placeholder - Revenue trends</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="w-64"
                />
                <Select
                  options={[
                    { value: 'all', label: 'All Users' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' }
                  ]}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Users Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <Badge
                              variant={user.status === 'active' ? 'success' : 'gray'}
                              size="sm"
                            >
                              {user.status}
                            </Badge>
                            <Badge
                              variant={user.verificationStatus === 'verified' ? 'success' : 'warning'}
                              size="sm"
                            >
                              {user.verificationStatus}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              user.subscription === 'elite' ? 'primary' :
                              user.subscription === 'premium' ? 'secondary' : 'gray'
                            }
                          >
                            {user.subscription}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.joinedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowUserModal(true);
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction('edit', user.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction('delete', user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Verifications</h3>
              <div className="space-y-4">
                {recentUsers.filter(user => user.verificationStatus === 'pending').map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.location}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleVerificationAction('approve', user.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVerificationAction('reject', user.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Support Tab */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supportTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{ticket.id}</div>
                          <div className="text-sm text-gray-500">{ticket.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary" size="sm">
                            {ticket.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              ticket.priority === 'urgent' ? 'error' :
                              ticket.priority === 'high' ? 'warning' : 'gray'
                            }
                            size="sm"
                          >
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              ticket.status === 'resolved' ? 'success' :
                              ticket.status === 'in-progress' ? 'warning' : 'gray'
                            }
                            size="sm"
                          >
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {ticket.createdAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Platform Name"
                    value="Vivah Bandhan"
                  />
                  <Input
                    label="Support Email"
                    value="support@vivahbandhan.ai"
                  />
                  <Input
                    label="Contact Phone"
                    value="+91 12345 67890"
                  />
                  <Select
                    label="Default Currency"
                    options={[
                      { value: 'INR', label: 'Indian Rupee (₹)' },
                      { value: 'USD', label: 'US Dollar ($)' }
                    ]}
                  />
                </div>
                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <Modal
          isOpen={showUserModal}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          title="User Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.email}</p>
                <p className="text-gray-600">{selectedUser.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Status:</span>
                <Badge
                  variant={selectedUser.status === 'active' ? 'success' : 'gray'}
                  size="sm"
                  className="ml-2"
                >
                  {selectedUser.status}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Subscription:</span>
                <Badge
                  variant={
                    selectedUser.subscription === 'elite' ? 'primary' :
                    selectedUser.subscription === 'premium' ? 'secondary' : 'gray'
                  }
                  size="sm"
                  className="ml-2"
                >
                  {selectedUser.subscription}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Verification:</span>
                <Badge
                  variant={selectedUser.verificationStatus === 'verified' ? 'success' : 'warning'}
                  size="sm"
                  className="ml-2"
                >
                  {selectedUser.verificationStatus}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Joined:</span> {selectedUser.joinedDate}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Location:</span> {selectedUser.location}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => handleUserAction('edit', selectedUser.id)}
                className="flex-1"
              >
                Edit User
              </Button>
              <Button
                variant="outline"
                onClick={() => handleUserAction('suspend', selectedUser.id)}
                className="flex-1"
              >
                Suspend User
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};