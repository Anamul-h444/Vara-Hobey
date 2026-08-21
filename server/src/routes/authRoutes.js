/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/routes/authRoutes.js
 * Description: Authentication, Password Management, and Profile API Routes.
 * ==============================================================================
 */

import express from 'express';

// Middlewares
import { protect } from '../middlewares/authMiddleware.js';
import { handleMulterError } from '../middlewares/multerErrorMiddleware.js';
import { uploadAvatar } from '../config/cloudinary.js';

// Controllers
import { 
  sendSignupOtp, 
  verifyAndRegister, 
  login, 
  sendForgotOtp, 
  verifyOtpOnly,
  resetPassword,
  updateProfile,
  changePassword,
  googleAuth
} from '../controllers/authController.js';

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                Public Routes                               */
/* -------------------------------------------------------------------------- */

// 1. User Registration & Sign Up
router.post('/send-signup-otp', sendSignupOtp);
router.post(
  '/verify-and-register', 
  handleMulterError(uploadAvatar.single('avatar')), 
  verifyAndRegister
);

// 2. User Authentication
router.post('/login', login);
router.post('/google', googleAuth);

// 3. Password Recovery Flow
router.post('/send-forgot-otp', sendForgotOtp);
router.post('/verify-otp', verifyOtpOnly);
router.post('/reset-password', resetPassword);

/* -------------------------------------------------------------------------- */
/*                              Protected Routes                              */
/* -------------------------------------------------------------------------- */

// 4. Profile & Security Updates (Requires Valid Bearer JWT)
router.put(
  '/update-profile', 
  protect, 
  handleMulterError(uploadAvatar.single('avatar')), 
  updateProfile
);

router.put('/change-password', protect, changePassword);

export default router;