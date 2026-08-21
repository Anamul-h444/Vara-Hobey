/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server.js
 * Description: Application entry point, middleware setup, database initialization,
 *              and global error handling.
 * ==============================================================================
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';

// Internal Configurations & Routes
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

// Initialize Database Connection
connectDB();

// Initialize Express Application
const app = express();

/* -------------------------------------------------------------------------- */
/*                              Global Middleware                             */
/* -------------------------------------------------------------------------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------------------------------------------------------------- */
/*                               API Endpoints                                */
/* -------------------------------------------------------------------------- */
// Root Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 Vara Hobe API Server Running...');
});

// Authentication & User Profile Routes
app.use('/api/auth', authRoutes);

/* -------------------------------------------------------------------------- */
/*                       Global Error Handling Middleware                     */
/* -------------------------------------------------------------------------- */
app.use((err, req, res, next) => {
  // Multer Specific Upload Errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'ছবির সাইজ অনেক বড়! সর্বোচ্চ ৩ মেগাবাইট (3 MB) সাইজের ছবি আপলোড করুন।',
      });
    }
    return res.status(400).json({
      success: false,
      message: `ফাইল আপলোড সমস্যা: ${err.message}`,
    });
  }

  // Application & Custom Errors
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'সার্ভারে সমস্যা হয়েছে!',
    });
  }

  next();
});

/* -------------------------------------------------------------------------- */
/*                               Server Bootup                                */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});