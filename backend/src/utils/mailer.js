/*const nodemailer = require("nodemailer");
require("dotenv").config();

// Creates a test account automatically
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,  // Generated test user
    pass: testAccount.pass   // Generated test password
  }
});*/

/*
//version 2 OAuthen UNfinished set up
console.log('[DEBUG] Email User:', process.env.EMAIL_USER ? '***' : 'MISSING');
console.log('[DEBUG] Email Service:', process.env.EMAIL_SERVICE);

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: 'smtp.gmail.com', // ← Explicitly set
  port: 587,
  secure: false,
  auth: {
    type:'LOGIN',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
    method: 'PLAIN'
  },
  tls: {
    ciphers:'SSLv3',
    rejectUnauthorized: false // Bypass SSL errors (for local testing)
  },
  logger:true
});

module.exports = {
  sendEmail: (to, subject, text, html = null) => {
    return transporter.sendMail({
      from: `"${process.env.APP_NAME || 'Your App'}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text  // Fallback to text if no HTML
    });
  },
  sendResetCode: async (email, code) => {
    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code',
      text: `Your verification code: ${code}`,
      html: `<b>Your code:</b> ${code} <p>Expires in 10 minutes</p>`
    };
    
    await transporter.sendMail(mailOptions);
  }

};*/

const nodemailer = require('nodemailer');
require('dotenv').config();

// Validate env vars early
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  throw new Error('Missing email credentials in .env');
}

// Reusable transporter (configure once)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any SMTP service (e.g., 'SendGrid')
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * General-purpose email sender.
 * @param {string} to - Recipient email.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content.
 * @param {string|null} [html] - Optional HTML content.
 * @returns {Promise<nodemailer.SentMessageInfo>}
 */
const sendEmail = (to, subject, text, html = null) => {
  return transporter.sendMail({
    from: `"${process.env.APP_NAME || 'Your App'}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: html || text, // Fallback to plain text
  });
};

/**
 * Sends a password reset code with expiration notice.
 * @param {string} email - Recipient email.
 * @param {string} code - 6-digit reset code.
 * @returns {Promise<void>}
 */
const sendResetCode = async (email, code) => {
  const mailOptions = {
    from: `"${process.env.APP_NAME || 'Your App'}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Code',
    text: `Your verification code: ${code}\n\nExpires in 10 minutes.`,
    html: `
      <p><b>Your code:</b> ${code}</p>
      <p>Expires in 10 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, sendResetCode };