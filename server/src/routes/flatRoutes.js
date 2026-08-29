/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/routes/flatRoutes.js
 * Description: API routes for managing Flat/Apartment properties.
 * ==============================================================================
 */

import express from "express";
import {
  createOrUpdateFlat,
  updateFlatStatus,
  deleteFlat,
  getUserFlats,
} from "../controllers/flatController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ১. ফ্ল্যাট তৈরি অথবা ড্রাফট হিসেবে সেভ করার রুট (Query তে flatId থাকলে আপডেট হবে)
// POST: /api/flats or /api/flats?flatId=xxxxxx
router.post("/", protect, createOrUpdateFlat);

// ২. নির্দিষ্ট ইউজারের সমস্ত ফ্ল্যাট বিজ্ঞাপন পাওয়ার রুট
// GET: /api/flats/user/:userId
router.get("/user/:userId", protect, getUserFlats);

// ৩. ফ্ল্যাটের স্ট্যাটাস পরিবর্তন করার রুট (Active, Paused, Expired)
// PATCH: /api/flats/:id/status
router.patch("/:id/status", protect, updateFlatStatus);

// ৪. ফ্ল্যাটের বিজ্ঞাপন কারণসহ ডিলিট করার রুট
// DELETE: /api/flats/:id
router.delete("/:id", protect, deleteFlat);

export default router;
