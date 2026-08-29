/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/models/RentType.js
 * Description: Mongoose schema for rent types using ES Module export.
 * ==============================================================================
 */

import mongoose from "mongoose";

const rentTypeSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, unique: true }, // যেমন: flat, sublet, office ইত্যাদি
    name: { type: String, required: true }, // English name (e.g. Flat / Apartment)
    bnName: { type: String, required: true }, // Bengali name (e.g. ফ্ল্যাট / অ্যাপার্টমেন্ট)
    category: {
      type: String,
      enum: ["residential", "commercial", "transport", "land", "event"],
      required: true,
    }, // ক্যাটাগরি
  },
  { timestamps: true },
);

const RentType =
  mongoose.models.RentType || mongoose.model("RentType", rentTypeSchema);

export default RentType;
