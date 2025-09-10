const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendEmail(to, subject, text, html) {
  const msg = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text,
    html
  };
  await transporter.sendMail(msg);
}

module.exports = { sendEmail };