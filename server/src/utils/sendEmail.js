/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/utils/sendEmail.js
 * Description: Nodemailer utility for sending transactional and OTP emails.
 * ==============================================================================
 */

import nodemailer from 'nodemailer';

/**
 * Send an HTML email using SMTP/Gmail transport
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject line
 * @param {string} htmlContent - HTML formatted email body
 * @returns {Promise<void>}
 */
export const sendEmail = async (to, subject, htmlContent) => {
  // Create reusable Nodemailer transporter instance
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Compose email options
  const mailOptions = {
    from: `"Vara Hobe" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  // Dispatch email
  await transporter.sendMail(mailOptions);
};