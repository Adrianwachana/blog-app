/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import uploadToCloudinary from '@/lib/cloudinary';
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/blog';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import type { UploadApiErrorResponse } from 'cloudinary';

/**
 * Constants
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (adjust as needed)

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /**
       * ✅ Allow PUT requests without a new image
       */
      if (method === 'put' && !req.file) {
        return next();
      }

      /**
       * ❌ Validate file presence
       */
      if (!req.file) {
        return res.status(400).json({
          code: 'ValidationError',
          message: 'Blog banner is required',
        });
      }

      /**
       * ❌ Validate file size
       */
      if (req.file.size > MAX_FILE_SIZE) {
        return res.status(413).json({
          code: 'ValidationError',
          message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
        });
      }

      /**
       * 🧠 Determine existing publicId (ONLY for PUT)
       */
      let existingPublicId: string | undefined;

      if (method === 'put') {
        const { blogId } = req.params;

        const blog = await Blog.findById(blogId)
          .select('banner.publicId')
          .lean()
          .exec();

        existingPublicId = blog?.banner?.publicId
          ? blog.banner.publicId.replace('blog-api/', '')
          : undefined;
      }

      /**
       * ☁️ Upload to Cloudinary
       */
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        existingPublicId
      );

      if (!uploadResult) {
        logger.error('Cloudinary upload returned null/undefined');

        return res.status(500).json({
          code: 'ServerError',
          message: 'Image upload failed',
        });
      }

      /**
       * 🧾 Build banner object
       */
      const banner = {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
      };

      logger.info('Blog banner uploaded successfully', {
        banner,
      });

      /**
       * 📦 Attach to request body for controller
       */
      req.body.banner = banner;

      return next();
    } catch (err: UploadApiErrorResponse | any) {
      const statusCode = err?.http_code || 500;

      logger.error('Error uploading blog banner', err);

      return res.status(statusCode).json({
        code: statusCode < 500 ? 'ValidationError' : 'ServerError',
        message: err?.message || 'Unexpected upload error',
      });
    }
  };
};

export default uploadBlogBanner;