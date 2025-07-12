const mongoose = require('mongoose');
const { User, Profile } = require('../models');
require('dotenv').config();

async function seedMockData() {
  await mongoose.connect(process.env.MONGODB_URI);

  const user = await User.create({
    phone: '9876543210',
    isVerified: true,
    subscriptionPlan: 'Gold'
  });

  await Profile.create({
    userId: user._id,
    personal: {
      firstName: 'Ravi',
      lastName: 'Kumar',
      gender: 'Male',
      dob: new Date('1990-01-01'),
      height: 172,
      photoUrls: ['https://example.com/photo1.jpg']
    },
    education: {
      highestDegree: 'MBA',
      university: 'IIM Bangalore',
      workingWith: 'Google',
      occupation: 'Product Manager',
      income: '25 LPA'
    },
    lifestyle: {
      diet: 'Vegetarian',
      smoke: false,
      drink: false
    },
    religion: {
      religion: 'Hindu',
      caste: 'Brahmin',
      subCaste: 'Iyer'
    },
    location: {
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India'
    },
    preferences: {
      ageRange: [24, 30],
      heightRange: [160, 175],
      religion: ['Hindu'],
      caste: ['Brahmin'],
      incomeRange: ['15 LPA', '30 LPA'],
      location: ['Bengaluru'],
      education: ['B.Tech', 'MBA']
    },
    verifiedBadges: {
      photoVerified: true,
      idVerified: true
    }
  });

  console.log('✅ Mock user and profile created');
  process.exit();
}

seedMockData();
