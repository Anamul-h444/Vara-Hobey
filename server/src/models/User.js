import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },
    roles: {
      type: [String],
      enum: ['tenant', 'landlord', 'admin'],
      default: ['tenant', 'landlord'], // ডুয়াল সুবিধা
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);