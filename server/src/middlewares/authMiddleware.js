/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/middlewares/authMiddleware.js
 * Description: JWT verification middleware to protect private API endpoints.
 * ==============================================================================
 */

import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * ==============================================================================
 * Protect Middleware
 * ==============================================================================
 * Verifies Bearer JWT and attaches the authenticated user to req.user.
 * ==============================================================================
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // --------------------------------------------------------------------------
    // Check Authorization header
    // --------------------------------------------------------------------------

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "অননুমোদিত রিকোয়েস্ট, কোনো বৈধ টোকেন দেওয়া হয়নি!",
      });
    }

    // --------------------------------------------------------------------------
    // Extract token
    // --------------------------------------------------------------------------

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "অননুমোদিত রিকোয়েস্ট, টোকেন পাওয়া যায়নি!",
      });
    }

    // --------------------------------------------------------------------------
    // JWT verification
    // --------------------------------------------------------------------------

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in environment variables.");

      return res.status(500).json({
        success: false,
        message: "Server authentication configuration is missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // --------------------------------------------------------------------------
    // Support common JWT payload formats
    // --------------------------------------------------------------------------

    const userId = decoded.id || decoded.userId || decoded._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "অননুমোদিত রিকোয়েস্ট, টোকেনের user ID পাওয়া যায়নি!",
      });
    }

    // --------------------------------------------------------------------------
    // Find authenticated user
    // --------------------------------------------------------------------------

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "ইউজার খুঁজে পাওয়া যায়নি!",
      });
    }

    // --------------------------------------------------------------------------
    // Attach user to request
    // --------------------------------------------------------------------------

    req.user = user;

    return next();
  } catch (error) {
    console.error("JWT Auth Middleware Error:", error.message);

    // Expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "সেশন শেষ হয়ে গেছে। অনুগ্রহ করে আবার লগইন করুন!",
      });
    }

    // Invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "অননুমোদিত রিকোয়েস্ট, টোকেন সঠিক নয়!",
      });
    }

    return res.status(401).json({
      success: false,
      message: "অননুমোদিত রিকোয়েস্ট, authentication ব্যর্থ হয়েছে!",
    });
  }
};

/**
 * ==============================================================================
 * Admin Only Middleware
 * ==============================================================================
 */
export const adminOnly = (req, res, next) => {
  const isAdmin =
    (Array.isArray(req.user?.roles) && req.user.roles.includes("admin")) ||
    req.user?.role === "admin";

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "অননুমোদিত রিকোয়েস্ট, আগে লগইন করুন!",
    });
  }

  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Access denied! Admin only route.",
    });
  }

  return next();
};
