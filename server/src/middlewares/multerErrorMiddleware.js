/**
 * ==============================================================================
 * Project: Vara Hobe API Server
 * File: server/src/middlewares/multerErrorMiddleware.js
 * Description: Higher-order wrapper middleware to catch and format Multer upload errors.
 * ==============================================================================
 */

import multer from 'multer';

/**
 * Wraps Multer middleware to catch errors and return consistent JSON responses
 * @param {Function} uploadMiddleware - Multer upload middleware instance (e.g., uploadAvatar.single('avatar'))
 * @returns {Function} Express middleware function
 */
export const handleMulterError = (uploadMiddleware) => {
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      // Handle Multer-specific errors (file size limit, unexpected field, etc.)
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'ফাইলের সাইজ সর্বোচ্চ ৩ মেগাবাইট (3 MB) হতে পারবে!',
          });
        }
        return res.status(400).json({
          success: false,
          message: `ফাইল আপলোড সমস্যা: ${err.message}`,
        });
      }

      // Handle custom fileFilter validation errors (e.g., invalid extension/mime type)
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || 'অবৈধ ফাইল ফরম্যাট!',
        });
      }

      // Proceed to the next middleware/controller if no error occurred
      return next();
    });
  };
};