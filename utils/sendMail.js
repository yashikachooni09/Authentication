const nodemailer = require('nodemailer');

// 1. Create reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER,    // e.g. yourmail@gmail.com
    pass: process.env.EMAIL_PASS     // e.g. app-specific password
  }
});

// 2. Function to send OTP
const sendOTP = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Password Reset',
      html: `
        <div style="font-family: sans-serif; padding: 10px;">
          <h2>Hello,</h2>
          <p>You have requested to reset your password.</p>
          <p><strong>Your OTP is:</strong> <span style="font-size: 22px; color: #007bff;">${otp}</span></p>
          <p>This OTP will expire soon. Please do not share it with anyone.</p>
          <br>
          <p>Regards,<br><strong>Your App Team</strong></p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

module.exports = { sendOTP };
