/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/controllers/authController.js
 * Description: Controller handling registration, login, OTP verification,
 *              password reset, Google OAuth, and profile management.
 * ==============================================================================
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { OAuth2Client } from 'google-auth-library';

// Database Models & Cloud Config
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';
import { sendEmail } from '../utils/sendEmail.js';

// Initialize Google OAuth Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */
/**
 * Generate a signed JWT token for user authorization
 * @param {string} id - Mongo User ID
 * @returns {string} Signed JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

/* -------------------------------------------------------------------------- */
/*                         1. Send Registration OTP                           */
/* -------------------------------------------------------------------------- */
export const sendSignupOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে।',
      });
    }

    // Generate 6-digit OTP and clean previous requests
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email: cleanEmail });
    await Otp.create({ email: cleanEmail, otp: otpCode, type: 'signup' });

    // HTML Email Template
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d111a; color: #fff; border-radius: 10px;">
        <h2 style="color: #10b981;">Vara Hobe - Email Verification</h2>
        <p>আপনার অ্যাকাউন্ট ভেরিফিকেশনের জন্য নিচের ওটিপি কোডটি ব্যবহার করুন:</p>
        <h1 style="background: #141923; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: #34d399; text-align: center;">${otpCode}</h1>
        <p style="color: #94a3b8; font-size: 12px;">কোডটির মেয়াদ ৫ মিনিট থাকবে।</p>
      </div>
    `;

    await sendEmail(cleanEmail, 'Vara Hobe - Registration OTP', html);
    return res.status(200).json({
      success: true,
      message: 'ইমেইলে ওটিপি কোড পাঠানো হয়েছে।',
    });
  } catch (error) {
    console.error('Send Signup OTP Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                    2. Verify OTP & Register New User                       */
/* -------------------------------------------------------------------------- */
export const verifyAndRegister = async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp ? otp.toString().trim() : '';

    // Verify OTP validity
    const validOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp });
    if (!validOtp) {
      return res.status(400).json({
        success: false,
        message: 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড!',
      });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Default avatar fallback
    let avatarUrl = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    // Upload avatar to Cloudinary from memory buffer
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.buffer);
    }

    // Create user in database
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password: hashedPassword,
      avatar: avatarUrl,
      isVerified: true,
    });

    // Remove used OTP
    await Otp.deleteMany({ email: cleanEmail });

    return res.status(201).json({
      success: true,
      message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        roles: user.roles,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.error('Verify & Register Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                         3. Standard User Login                             */
/* -------------------------------------------------------------------------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'ইমেইল এবং পাসওয়ার্ড উভয়ই প্রদান করুন!',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি!',
      });
    }

    // Guard: Accounts registered solely via Google OAuth without password
    if (!user.password && user.googleId) {
      return res.status(400).json({
        success: false,
        message:
          'এই অ্যাকাউন্টটি গুগল দিয়ে তৈরি করা হয়েছে। দয়া করে "Continue with Google" দিয়ে লগইন করুন অথবা পাসওয়ার্ড রিসেট করুন।',
      });
    }

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।',
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'লগইন সফল হয়েছে!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar,
        roles: user.roles,
        token,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'সার্ভারে সমস্যা হয়েছে, পরে চেষ্টা করুন!',
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                      4. Send Forgot Password OTP                           */
/* -------------------------------------------------------------------------- */
export const sendForgotOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'এই ইমেইলে কোনো ব্যবহারকারী খুঁজে পাওয়া যায়নি।',
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email: cleanEmail, type: 'forgot' });
    await Otp.create({ email: cleanEmail, otp: otpCode, type: 'forgot' });

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d111a; color: #fff; border-radius: 10px;">
        <h2 style="color: #f59e0b;">Vara Hobe - Password Reset</h2>
        <p>পাসওয়ার্ড রিসেট করার ওটিপি কোড:</p>
        <h1 style="background: #141923; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: #fbbf24; text-align: center;">${otpCode}</h1>
      </div>
    `;

    await sendEmail(cleanEmail, 'Vara Hobe - Password Reset Code', html);
    return res.status(200).json({
      success: true,
      message: 'রিসেট ওটিপি কোড পাঠানো হয়েছে।',
    });
  } catch (error) {
    console.error('Send Forgot OTP Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                         5. Verify OTP Code Only                            */
/* -------------------------------------------------------------------------- */
export const verifyOtpOnly = async (req, res) => {
  try {
    const { email, otp, type = 'forgot' } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'ইমেইল এবং ওটিপি কোড আবশ্যক!',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    const otpRecord = await Otp.findOne({ email: cleanEmail, otp: cleanOtp, type });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'ভুল ওটিপি কোড অথবা ওটিপির মেয়াদ শেষ হয়ে গেছে!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'ওটিপি সঠিক হয়েছে!',
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({
      success: false,
      message: 'ওটিপি যাচাই করতে সমস্যা হয়েছে!',
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                      6. Reset Password with OTP                            */
/* -------------------------------------------------------------------------- */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp ? otp.toString().trim() : '';

    const validOtp = await Otp.findOne({ email: cleanEmail, otp: cleanOtp, type: 'forgot' });
    if (!validOtp) {
      return res.status(400).json({
        success: false,
        message: 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email: cleanEmail }, { password: hashedPassword });
    await Otp.deleteMany({ email: cleanEmail });

    return res.status(200).json({
      success: true,
      message: 'পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।',
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                   7. Update Profile Information & Avatar                   */
/* -------------------------------------------------------------------------- */
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'ইউজার খুঁজে পাওয়া যায়নি!',
      });
    }

    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();

    // Handle Cloudinary Image Replacement
    if (req.file) {
      // 1. Delete previous Cloudinary image if it exists
      if (user.avatar && user.avatar.includes('cloudinary.com')) {
        await deleteFromCloudinary(user.avatar);
      }

      // 2. Upload new avatar buffer
      const avatarUrl = await uploadToCloudinary(req.file.buffer);
      user.avatar = avatarUrl;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'প্রোফাইল সফলভাবে আপডেট হয়েছে!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    return res.status(500).json({
      success: false,
      message: 'প্রোফাইল আপডেট করতে সমস্যা হয়েছে!',
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                8. Change Password (Authenticated User)                    */
/* -------------------------------------------------------------------------- */
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'বর্তমান পাসওয়ার্ডটি সঠিক নয়!',
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!',
    });
  } catch (error) {
    console.error('Change Password Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                     9. Google OAuth Login & Register                       */
/* -------------------------------------------------------------------------- */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'গুগল টোকেন দেওয়া হয়নি!',
      });
    }

    // Verify Google Token and fetch user profile
    const googleResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { email, name, picture, sub: googleId } = googleResponse.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name: name || 'Google User',
        email,
        avatar: picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        googleId,
        isVerified: true,
      });
    } else if (!user.avatar || user.avatar.includes('flaticon')) {
      user.avatar = picture || user.avatar;
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'গুগল দিয়ে সফলভাবে সাইন ইন হয়েছে!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        avatar: user.avatar,
        roles: user.roles,
        token: jwtToken,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error.response?.data || error.message);
    return res.status(401).json({
      success: false,
      message: 'গুগল যাচাইকরণ ব্যর্থ হয়েছে!',
    });
  }
};