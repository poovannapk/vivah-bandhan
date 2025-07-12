const User = require('../models/User');

exports.searchProfiles = async (req, res) => {
  const { community, caste, age, religion, education, income, location, height } = req.query;
  let query = {};
  if (community) query['religion.community'] = community;
  if (caste) query['religion.caste'] = caste;
  if (religion) query['religion.religion'] = religion;
  if (education) query['education.degree'] = education;
  if (location) query['personal.location'] = location;
  // Add more filters as needed
  // Age, height, income can be handled with $gte/$lte
  const users = await User.find(query);
  res.json(users);
};
