const nodemailer = require("nodemailer");

const emailSender = async (options) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,      // e.g., "Gmail"
      host: process.env.MAIL_HOST,       // e.g., "smtp.gmail.com"
      port: 587,
      secure: false,                     // true for 465, false for 587
      auth: {
        user: process.env.APP_USER,      // your verified email
        pass: process.env.APP_PASSWORD,  // app password for Gmail
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"SnapBreakfast" <${process.env.APP_USER}>`, // corrected from process.env.USER
      to: options.email,
      subject: options.subject,
      html: options.html,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;  // re-throw so caller can handle it
  }
};

module.exports = emailSender;
