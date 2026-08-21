/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/config/cloudinary.js
 * Description: Cloudinary storage configuration, Multer memory storage setup,
 *              image upload buffer stream, and remote file deletion helper.
 * ==============================================================================
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

// Load Environment Variables
dotenv.config();

/* -------------------------------------------------------------------------- */
/*                         Cloudinary SDK Credentials                         */
/* -------------------------------------------------------------------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* -------------------------------------------------------------------------- */
/*                        Multer Upload Configuration                         */
/* -------------------------------------------------------------------------- */
// Image Format & Mime-type Filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('শুধুমাত্র JPG, JPEG, PNG এবং WEBP ফরম্যাটের ছবি আপলোড করা যাবে!'), false);
  }
};

// Store files directly in RAM as Buffer
const storage = multer.memoryStorage();

export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // Maximum allowed size: 3 MB
  fileFilter,
});

/* -------------------------------------------------------------------------- */
/*                        Cloudinary Utility Functions                        */
/* -------------------------------------------------------------------------- */
/**
 * Upload image buffer directly to Cloudinary
 * @param {Buffer} fileBuffer - File binary data in RAM
 * @param {string} folder - Target Cloudinary folder
 * @returns {Promise<string>} - Returns the secure image URL
 */
export const uploadToCloudinary = (fileBuffer, folder = 'varahobe_avatars') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Extract public_id and delete image from Cloudinary
 * @param {string} imageUrl - Full Cloudinary image URL
 * @returns {Promise<void>}
 */
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl || !imageUrl.includes('cloudinary.com')) return;

    // Extract public_id matching: .../upload/(v12345/)?folder/filename.ext
    const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
    const match = imageUrl.match(regex);

    if (match && match[1]) {
      const publicId = match[1];
      const result = await cloudinary.uploader.destroy(publicId);
      console.log(`Cloudinary old image deleted: ${publicId}`, result);
    }
  } catch (error) {
    console.error('Cloudinary Delete Error:', error);
  }
};

export { cloudinary };