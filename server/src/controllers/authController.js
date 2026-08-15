import User from '../models/User.js';
import Otp from '../models/Otp.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/sendEmail.js';

// টোকেন জেনারেটর
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ১. সাইনআপের জন্য OTP পাঠানো
export const sendSignupOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি করা আছে।' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email }); // পুরনোগুলো ডিলিট
    await Otp.create({ email, otp: otpCode });

    // ইমেইল টেমপ্লেট
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d111a; color: #fff; border-radius: 10px;">
        <h2 style="color: #10b981;">Vara Hobe - Email Verification</h2>
        <p>আপনার অ্যাকাউন্ট ভেরিফিকেশনের জন্য নিচের ওটিপি কোডটি ব্যবহার করুন:</p>
        <h1 style="background: #141923; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: #34d399; text-align: center;">${otpCode}</h1>
        <p style="color: #94a3b8; font-size: 12px;">কোডটির মেয়াদ ৫ মিনিট থাকবে।</p>
      </div>
    `;

    await sendEmail(email, 'Vara Hobe - Registration OTP', html);
    res.status(200).json({ success: true, message: 'ইমেইলে ওটিপি কোড পাঠানো হয়েছে।' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ২. OTP ভেরিফাই এবং অ্যাকাউন্ট ক্রিয়েট (ছবি আপলোড সাপোর্ট সহ)
export const verifyAndRegister = async (req, res) => {
  try {
    const { name, email, phone, password, otp } = req.body;

    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let avatarUrl = undefined;
    if (req.file) {
      avatarUrl = req.file.path; // ক্লাউডিনারি লিংক
    }

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      avatar: avatarUrl,
      isVerified: true,
    });

    await Otp.deleteMany({ email });

    res.status(201).json({
      success: true,
      message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!',
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৩. সাইন ইন (Login)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'পাসওয়ার্ড ভুল হয়েছে!' });
    }

    res.status(200).json({
      success: true,
      message: 'সফলভাবে লগইন হয়েছে!',
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৪. ফরগট পাসওয়ার্ড OTP
export const sendForgotOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'এই ইমেইলে কোনো ব্যবহারকারী খুঁজে পাওয়া যায়নি।' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: otpCode });

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d111a; color: #fff; border-radius: 10px;">
        <h2 style="color: #f59e0b;">Vara Hobe - Password Reset</h2>
        <p>পাসওয়ার্ড রিসেট করার ওটিপি কোড:</p>
        <h1 style="background: #141923; padding: 10px 20px; border-radius: 8px; letter-spacing: 5px; color: #fbbf24; text-align: center;">${otpCode}</h1>
      </div>
    `;

    await sendEmail(email, 'Vara Hobe - Password Reset Code', html);
    res.status(200).json({ success: true, message: 'রিসেট ওটিপি কোড পাঠানো হয়েছে।' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৫. নতুন পাসওয়ার্ড সেট (Reset Password)
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'ভুল বা মেয়াদোত্তীর্ণ ওটিপি কোড!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    await Otp.deleteMany({ email });

    res.status(200).json({ success: true, message: 'পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};