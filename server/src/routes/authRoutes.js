import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import { 
  sendSignupOtp, 
  verifyAndRegister, 
  login, 
  sendForgotOtp, 
  resetPassword 
} from '../controllers/authController.js';

const upload = multer({ storage });
const router = express.Router();

router.post('/send-signup-otp', sendSignupOtp);
router.post('/verify-and-register', upload.single('avatar'), verifyAndRegister);
router.post('/login', login);
router.post('/send-forgot-otp', sendForgotOtp);
router.post('/reset-password', resetPassword);

export default router;