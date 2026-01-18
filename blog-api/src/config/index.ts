/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import dotenv from 'dotenv';
import type ms from 'ms';

dotenv.config();

const config = {
  // Server port
  PORT: process.env.PORT || 3000,

  // Node environment ('development', 'production', etc.)
  NODE_ENV: process.env.NODE_ENV!,

  // CORS whitelist origins
  // ✅ In development, allow any localhost port automatically
  // ✅ In production, only allow listed domains
  WHITELIST_ORIGINS: process.env.NODE_ENV === 'development'
    ? ['http://localhost:5173'] // you can also add more localhost ports if needed
    : [
        'https://blog.Adrianwachana.com',
        'https://docs.blog-api.Adrianwachana.com',
      ],

  // MongoDB connection URI
  MONGO_URI: process.env.MONGO_URI!,

  // Logtail configuration
  LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN!,
  LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST!,

  // Logging level
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  // JWT secrets
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  // JWT token expiry times
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,

  // Resend API key for sending emails
  RESEND_API_KEY: process.env.RESEND_API_KEY!,

  // Contact form configuration
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO!,
  EMAIL_FROM: process.env.EMAIL_FROM || 'BitBlog <onboarding@resend.dev>',

  // Default pagination values
  defaultResLimit: 20,
  defaultResOffset: 0,

  // Cloudinary credentials
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,

  // Admin emails for whitelist
  WHITELIST_ADMINS_MAIL: [
    'mohammadsadee24@gmail.com',
    'tokeeabdullah5@gmail.com',
    'tests@gmail.com',
  ],
};

export default config;
