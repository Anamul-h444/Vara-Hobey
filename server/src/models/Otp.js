import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // ৫ মিনিট পর স্বয়ংক্রিয়ভাবে ডাটাবেস থেকে ডিলিট হয়ে যাবে
  },
});

export default mongoose.model('Otp', otpSchema);