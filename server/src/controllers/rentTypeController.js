/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/controllers/rentTypeController.js
 * Description: Rent Type CRUD controllers using ES Module exports.
 * ==============================================================================
 */

import RentType from "../models/RentType.js";

// ১. সকল রেন্ট টাইপ গেট করা
export const getRentTypes = async (req, res) => {
  try {
    const types = await RentType.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: types });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ২. নতুন রেন্ট টাইপ তৈরি করা (Admin Only)
export const createRentType = async (req, res) => {
  try {
    const { type, name, bnName, category } = req.body;

    if (!type || !name || !bnName || !category) {
      return res
        .status(400)
        .json({ success: false, message: "সকল ফিল্ড পূরণ করা বাধ্যতামূলক।" });
    }

    const newType = await RentType.create({ type, name, bnName, category });
    res.status(201).json({
      success: true,
      message: "Rent type created successfully",
      data: newType,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ৩. রেন্ট টাইপ আপডেট করা (Admin Only)
export const updateRentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name, bnName, category } = req.body;

    const updatedType = await RentType.findByIdAndUpdate(
      id,
      { type, name, bnName, category },
      { new: true, runValidators: true },
    );

    if (!updatedType) {
      return res
        .status(404)
        .json({ success: false, message: "Rent type not found" });
    }

    res.status(200).json({
      success: true,
      message: "Rent type updated successfully",
      data: updatedType,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ৪. রেন্ট টাইপ ডিলিট করা (Admin Only)
export const deleteRentType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedType = await RentType.findByIdAndDelete(id);

    if (!deletedType) {
      return res
        .status(404)
        .json({ success: false, message: "Rent type not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Rent type deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
