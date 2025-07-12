const { sendSMS } = require('./smsHelper');
const { sendEmailOTP } = require('./emailHelper');

function generateOTP(length = 6) {
  return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
}

async function sendOTP(destination, otp, method = 'sms') {
  if (method === 'email') return sendEmailOTP(destination, otp);
  return sendSMS(destination, otp);
}

module.exports = { generateOTP, sendOTP };
