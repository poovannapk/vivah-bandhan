const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const from = process.env.TWILIO_FROM;

const client = twilio(accountSid, authToken);

const sendSMS = async (to, otp) => {
  return client.messages.create({
    body: `Your Matrimony OTP is ${otp}`,
    from,
    to: `+91${to}`
  });
};

module.exports = { sendSMS };
