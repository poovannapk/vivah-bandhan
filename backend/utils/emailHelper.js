const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmailOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your Matrimony OTP Code',
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 5 minutes only.</p>`
  };
  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailOTP };
