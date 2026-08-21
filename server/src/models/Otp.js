/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/models/Otp.js
 * Description: Mongoose schema and model definition for OTPs with TTL auto-expiry.
 * ==============================================================================
 */

import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['signup', 'forgot'],
    default: 'forgot',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // ৫ মিনিট (৩০০ সেকেন্ড) পর MongoDB TTL ইনডেক্স স্বয়ংক্রিয়ভাবে ডকুমেন্ট মুছে ফেলবে
  },
});

export default mongoose.models.Otp || mongoose.model('Otp', otpSchema);