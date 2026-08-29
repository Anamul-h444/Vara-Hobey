/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/controllers/flatController.js
 * Description: Controller handling Flat properties create, update, status, and delete.
 * ==============================================================================
 */

import Flat from "../models/Flat.js";
import User from "../models/User.js";
import { flatSlugify } from "../slugify/flatSlugify.js";

// ১. ফ্ল্যাট অ্যাড তৈরি বা ড্রাফট সেভ করা
export const createOrUpdateFlat = async (req, res) => {
  try {
    const { userId, title, status, ...otherData } = req.body;
    const { flatId } = req.query; // যদি অলরেডি ড্রাফট আইডি থাকে (Update এর জন্য)

    let slug = title ? flatSlugify(title) : "";

    let expiresAt = null;
    if (status === "active") {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // ১ মাসের মেয়াদ
    }

    let flatProperty;
    if (flatId) {
      flatProperty = await Flat.findByIdAndUpdate(
        flatId,
        { title, slug, status, expiresAt, ...otherData },
        { new: true, runValidators: true },
      );
    } else {
      flatProperty = await Flat.create({
        userId,
        title,
        slug,
        status: status || "draft",
        expiresAt,
        ...otherData,
      });

      // ইউজারের মোট অ্যাড পোস্টের হিসাব বাড়ানো
      await User.findByIdAndUpdate(userId, {
        $inc: { "stats.totalAdsPosted": 1 },
      });
    }

    return res.status(200).json({
      success: true,
      message:
        status === "active"
          ? "ফ্ল্যাটের বিজ্ঞাপন সফলভাবে প্রকাশিত হয়েছে!"
          : "ড্রাফট সফলভাবে সংরক্ষিত হয়েছে!",
      data: flatProperty,
    });
  } catch (error) {
    console.error("Flat Save Error:", error);
    return res.status(500).json({
      success: false,
      message: "ফ্ল্যাটের তথ্য সেভ করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// ২. ফ্ল্যাটের স্ট্যাটাস পরিবর্তন (যেমন: Paused / Rented অথবা Active করা)
export const updateFlatStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body; // status (paused/active), reason (কারণ)

    const flat = await Flat.findById(id);
    if (!flat) {
      return res.status(404).json({
        success: false,
        message: "ফ্ল্যাটের বিজ্ঞাপনটি খুঁজে পাওয়া যায়নি",
      });
    }

    if (status === "paused" && reason) {
      flat.pauseReason = reason;

      // যদি বাসা সফলভাবে ভাড়া হয়ে যায়
      if (
        reason === "rented_successfully" ||
        reason.includes("ভাড়া হয়ে গেছে")
      ) {
        flat.isSuccessfullyRented = true;
        // ইউজারের সফল ভাড়ার কাউন্ট ১ বাড়লো
        await User.findByIdAndUpdate(flat.userId, {
          $inc: { "stats.successfulRents": 1 },
        });
      }
    }

    flat.status = status;
    if (status === "active") {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      flat.expiresAt = expiresAt;
    }

    await flat.save();

    return res.status(200).json({
      success: true,
      message:
        status === "paused"
          ? "বিজ্ঞাপনটি সফলভাবে পস করা হয়েছে।"
          : "বিজ্ঞাপনটি পুনরায় সচল করা হয়েছে।",
      data: flat,
    });
  } catch (error) {
    console.error("Flat Status Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// ৩. ফ্ল্যাট বিজ্ঞাপন ডিলিট করা (কারণ সহ)
export const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { deleteReason } = req.body;

    const flat = await Flat.findById(id);
    if (!flat) {
      return res.status(404).json({
        success: false,
        message: "ফ্ল্যাটের বিজ্ঞাপনটি খুঁজে পাওয়া যায়নি",
      });
    }

    if (
      deleteReason &&
      (deleteReason === "rented_successfully" ||
        deleteReason.includes("ভাড়া হয়ে গেছে"))
    ) {
      await User.findByIdAndUpdate(flat.userId, {
        $inc: { "stats.successfulRents": 1 },
      });
    }

    await Flat.findByIdAndDelete(id);
    await User.findByIdAndUpdate(flat.userId, {
      $inc: { "stats.totalDeletedAds": 1 },
    });

    return res.status(200).json({
      success: true,
      message: "ফ্ল্যাটের বিজ্ঞাপনটি সফলভাবে মুছে ফেলা হয়েছে।",
    });
  } catch (error) {
    console.error("Flat Delete Error:", error);
    return res.status(500).json({
      success: false,
      message: "বিজ্ঞাপন ডিলিট করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};

// ৪. নির্দিষ্ট ইউজারের সমস্ত ফ্ল্যাট বিজ্ঞাপন ড্যাশবোর্ডে দেখানোর জন্য
export const getUserFlats = async (req, res) => {
  try {
    const { userId } = req.params;

    const flats = await Flat.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: flats.length,
      data: flats,
    });
  } catch (error) {
    console.error("Get User Flats Error:", error);
    return res.status(500).json({
      success: false,
      message: "বিজ্ঞাপনগুলো লোড করতে সমস্যা হয়েছে",
      error: error.message,
    });
  }
};
