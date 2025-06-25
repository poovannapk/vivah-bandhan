import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Star, 
  Eye,
  UserCheck,
  Crown,
  TrendingUp,
  Calendar,
  Gift
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Profile Views',
      value: '124',
      change: '+12%',
      color: 'text-blue-600'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Likes Received',
      value: '43',
      change: '+8%',
      color: 'text-red-600'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Messages',
      value: '18',
      change: '+5%',
      color: 'text-green-600'
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: 'Matches',
      value: '7',
      change: '+2%',
      color: 'text-purple-600'
    }
  ];

  const recentActivity = [
    {
      type: 'like',
      user: 'Priya Sharma',
      action: 'liked your profile',
      time: '2 hours ago',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      type: 'view',
      user: 'Anita Patel',
      action: 'viewed your profile',
      time: '4 hours ago',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      type: 'message',
      user: 'Kavya Reddy',
      action: 'sent you a message',
      time: '1 day ago',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      type: 'match',
      user: 'Sneha Gupta',
      action: 'matched with you',
      time: '2 days ago',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const suggestedMatches = [
    {
      name: 'Neha Agarwal',
      age: 26,
      profession: 'Software Engineer',
      location: 'Mumbai, Maharashtra',
      compatibility: 94,
      avatar: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=300',
      education: 'Masters in Computer Science',
      isOnline: true
    },
    {
      name: 'Meera Singh',
      age: 24,
      profession: 'Doctor',
      location: 'Delhi, NCR',
      compatibility: 89,
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
      education: 'MBBS, MD',
      isOnline: false
    },
    {
      name: 'Riya Kapoor',
      age: 28,
      profession: 'Marketing Manager',
      location: 'Bangalore, Karnataka',
      compatibility: 87,
      avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=300',
      education: 'MBA in Marketing',
      isOnline: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your matrimony journey
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/search">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Search Profiles</h3>
                    <p className="text-sm text-gray-500">Find your match</p>
                  </div>
                </div>
              </Card>
            </Link>
            
            <Link to="/matches">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">My Matches</h3>
                    <p className="text-sm text-gray-500">7 new matches</p>
                  </div>
                </div>
              </Card>
            </Link>
            
            <Link to="/messages">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Messages</h3>
                    <p className="text-sm text-gray-500">3 unread</p>
                  </div>
                </div>
              </Card>
            </Link>
            
            <Link to="/pricing">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-r from-primary-500 to-secondary-500">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Crown className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Upgrade</h3>
                    <p className="text-sm text-white/80">Get premium features</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Analytics</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${stat.color}`}>
                        {stat.icon}
                      </div>
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Suggested Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Suggested Matches</h2>
                <Link to="/matches">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedMatches.map((match, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={match.avatar}
                        alt={match.name}
                        className="w-full h-48 object-cover"
                      />
                      {match.isOnline && (
                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          Online
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-primary-500 text-white text-sm px-2 py-1 rounded-full">
                        {match.compatibility}% Match
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{match.name}, {match.age}</h3>
                      <p className="text-sm text-gray-600 mb-1">{match.profession}</p>
                      <p className="text-sm text-gray-500 mb-2">{match.location}</p>
                      <p className="text-xs text-gray-500 mb-3">{match.education}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Heart className="h-4 w-4 mr-1" />
                          Like
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Progress</span>
                    <span className="text-sm font-medium text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">✅ Basic Info</span>
                      <span className="text-green-600">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">✅ Photos</span>
                      <span className="text-green-600">Complete</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">⏳ Preferences</span>
                      <span className="text-orange-600">Pending</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">⏳ Verification</span>
                      <span className="text-orange-600">Pending</span>
                    </div>
                  </div>
                  <Link to="/profile">
                    <Button size="sm" className="w-full">
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'like' ? 'bg-red-500' :
                        activity.type === 'message' ? 'bg-green-500' :
                        activity.type === 'match' ? 'bg-purple-500' : 'bg-blue-500'
                      }`} />
                    </div>
                  ))}
                </div>
                <Link to="/activity">
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    View All Activity
                  </Button>
                </Link>
              </Card>
            </motion.div>

            {/* Upgrade Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="p-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                <div className="text-center">
                  <Crown className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
                  <p className="text-sm text-white/80 mb-4">
                    Get unlimited matches, advanced filters, and priority support
                  </p>
                  <Link to="/pricing">
                    <Button className="bg-white text-primary-600 hover:bg-gray-100">
                      <Gift className="h-4 w-4 mr-2" />
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};