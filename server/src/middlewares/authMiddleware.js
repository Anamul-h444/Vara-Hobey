/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/middlewares/authMiddleware.js
 * Description: JWT verification middleware to protect private API endpoints.
 * ==============================================================================
 */

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware to verify Bearer JWT token and attach user to request object
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token string after 'Bearer '
      token = req.headers.authorization.split(' ')[1];

      // Verify JWT token signature with secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user profile from database excluding password hash
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'ইউজার খুঁজে পাওয়া যায়নি!',
        });
      }

      return next();
    } catch (error) {
      console.error('JWT Auth Middleware Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'অননুমোদিত রিকোয়েস্ট, টোকেন সঠিক নয়!',
      });
    }
  }

  // Fallback if no token is provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'অননুমোদিত রিকোয়েস্ট, কোনো টোকেন দেওয়া হয়নি!',
    });
  }
};