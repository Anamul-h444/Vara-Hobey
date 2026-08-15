import { v2 as cloudinary } from 'cloudinary';
import pkg from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// ESM ও CJS এর ইন্টারপ হ্যান্ডলিং
const CloudinaryStorage = pkg.CloudinaryStorage || pkg.default?.CloudinaryStorage || pkg;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vara_hobe_users',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

export default cloudinary;