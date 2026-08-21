/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/models/User.js
 * Description: Mongoose schema and model definition for application users.
 * ==============================================================================
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Password is required only if the user did not register via Google OAuth
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    // Phone number is optional on initial Google sign-in; updated later from profile
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    },
    googleId: {
      type: String,
      default: null,
    },
    roles: {
      type: [String],
      enum: ['renter', 'owner', 'admin', 'tenant', 'landlord', 'user'],
      default: ['tenant'],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);