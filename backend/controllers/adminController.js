const User = require('../models/User');
const Message = require('../models/Message');
const Subscription = require('../models/Subscription');

const PLAN_PRICE = {
  Free: 0,
  Gold: 1499,
  Premium: 2999,
};

exports.dashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  // Add more stats as needed
  res.json({ totalUsers });
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.banUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { banned: true });
  res.json({ success: true });
};

exports.verifyUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { verified: true });
  res.json({ success: true });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

exports.analytics = async (req, res) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalUsers,
      activeUsers,
      bannedUsers,
      verifiedUsers,
      premiumUsers,
      newUsersToday,
      newUsers30Days,
      totalMessages,
      unreadMessages,
      flaggedMessages,
      flaggedPhotoUsers,
      activeSubscriptions,
      subscriptions,
      recentUsers,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ banned: { $ne: true } }),
      User.countDocuments({ banned: true }),
      User.countDocuments({ verified: true }),
      User.countDocuments({ isPremium: true }),
      User.countDocuments({ createdAt: { $gte: startOfToday } }),
      User.countDocuments({ createdAt: { $gte: last30Days } }),
      Message.countDocuments(),
      Message.countDocuments({ seen: false }),
      Message.countDocuments({ flagged: true }),
      User.countDocuments({ flaggedPhotos: { $exists: true, $not: { $size: 0 } } }),
      Subscription.countDocuments({ status: 'active' }),
      Subscription.find().lean(),
      User.find()
        .sort({ createdAt: -1 })
        .limit(8)
        .select('email phone verified role personal isPremium banned createdAt')
        .lean(),
    ]);

    const subscriptionBreakdown = subscriptions.reduce((acc, subscription) => {
      const plan = subscription.plan || 'Free';
      acc[plan] = (acc[plan] || 0) + 1;
      return acc;
    }, {});

    const revenueTotal = subscriptions.reduce((sum, subscription) => {
      if (subscription.status === 'cancelled') return sum;
      return sum + (PLAN_PRICE[subscription.plan] || 0);
    }, 0);

    const revenueThisMonth = subscriptions.reduce((sum, subscription) => {
      if (subscription.status === 'cancelled') return sum;
      if (!subscription.startDate || new Date(subscription.startDate) < monthStart) return sum;
      return sum + (PLAN_PRICE[subscription.plan] || 0);
    }, 0);

    const monthlyRevenueMap = subscriptions.reduce((acc, subscription) => {
      if (subscription.status === 'cancelled' || !subscription.startDate) return acc;
      const date = new Date(subscription.startDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[monthKey] = (acc[monthKey] || 0) + (PLAN_PRICE[subscription.plan] || 0);
      return acc;
    }, {});

    const salesByMonth = Object.entries(monthlyRevenueMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, revenue]) => ({ month, revenue }));

    const userGrowthMap = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          users: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 6 },
    ]);

    const completedProfiles = await User.countDocuments({
      'personal.firstName': { $exists: true, $ne: '' },
      'personal.lastName': { $exists: true, $ne: '' },
      'personal.gender': { $exists: true, $ne: '' },
    });

    res.json({
      totals: {
        users: totalUsers,
        activeUsers,
        bannedUsers,
        verifiedUsers,
        premiumUsers,
        newUsersToday,
        newUsers30Days,
        profileCompletionRate: totalUsers ? Math.round((completedProfiles / totalUsers) * 100) : 0,
      },
      sales: {
        revenueTotal,
        revenueThisMonth,
        activeSubscriptions,
        subscriptionBreakdown,
        salesByMonth,
      },
      engagement: {
        totalMessages,
        unreadMessages,
        flaggedMessages,
        flaggedPhotoUsers,
      },
      userGrowth: userGrowthMap.map(item => ({ month: item._id, users: item.users })),
      recentUsers: recentUsers.map(user => ({
        id: user._id,
        name: `${user.personal?.firstName || ''} ${user.personal?.lastName || ''}`.trim() || 'Unnamed User',
        email: user.email || '-',
        phone: user.phone || '-',
        joinedDate: user.createdAt,
        verified: Boolean(user.verified),
        premium: Boolean(user.isPremium),
        banned: Boolean(user.banned),
        role: user.role,
      })),
    });
  } catch (error) {
    console.error('Admin analytics failed:', error);
    res.status(500).json({ error: 'Failed to load admin analytics' });
  }
};

exports.getFlaggedMessages = async (req, res) => {
  const messages = await Message.find({ flagged: true });
  res.json(messages);
};

exports.flagMessage = async (req, res) => {
  await Message.findByIdAndUpdate(req.params.id, { flagged: true });
  res.json({ success: true });
};

exports.getFlaggedPhotos = async (req, res) => {
  const users = await User.find({ flaggedPhotos: { $exists: true, $not: { $size: 0 } } }, { personal: 1, flaggedPhotos: 1 });
  res.json(users);
};

exports.flagPhoto = async (req, res) => {
  const { userId } = req.params;
  const { photoUrl } = req.body;
  await User.findByIdAndUpdate(userId, { $addToSet: { flaggedPhotos: photoUrl } });
  res.json({ success: true });
};
