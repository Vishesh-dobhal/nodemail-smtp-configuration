import nodemailer from "nodemailer";
import dotenv from "dotenv";
import juice from 'juice'; // Import juice for inlining CSS

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // Set to true for SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const SendEmail = async (email, subject, content) => {
  try {
    // Inline the CSS using juice
    const inlinedContent = juice(content);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      html: inlinedContent, // Use the inlined content
      headers: {
        'Content-Type': 'text/html; charset=UTF-8', // Ensure email is sent as HTML
      },
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error occurred while sending email", error.message);
  }
};

export default SendEmail;