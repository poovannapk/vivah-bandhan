const User = require('../models/User');
const { calculateCompatibility } = require('../utils/matchmaking');
const { getHoroscopeMatch } = require('../utils/astrologyApi');

exports.getMatches = async (req, res) => {
  // Example: return all users except self
  const users = await User.find({ _id: { $ne: req.user.id } });
  res.json(users);
};

exports.getCompatibility = async (req, res) => {
  const { userId } = req.body;
  const userA = await User.findById(req.user.id);
  const userB = await User.findById(userId);
  const score = calculateCompatibility(userA, userB);
  // Optionally, call astrology API
  let horoscope = null;
  if (userA.religion?.religion === 'Hindu' && userB.religion?.religion === 'Hindu') {
    horoscope = await getHoroscopeMatch(userA.religion, userB.religion);
  }
  res.json({ score, horoscope });
};
