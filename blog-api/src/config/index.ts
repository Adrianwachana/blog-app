/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import dotenv from 'dotenv';
import type ms from 'ms';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';

const config = {
  // Server port (Render injects PORT automatically)
  PORT: process.env.PORT || 3000,

  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',

  // CORS whitelist origins
  // ✅ Dev: allow localhost
  // ✅ Prod: allow only deployed domains
  WHITELIST_ORIGINS: isDev
    ? [
        'http://localhost:5173',
        'http://localhost:3000',
      ]
    : [
        // Frontend (Render)
        'https://blog-app-eoey.onrender.com',

        // Custom domains (future-proof)
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

  // JWT expiry times
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,

  // Resend email API
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO!,
  EMAIL_FROM: process.env.EMAIL_FROM || 'BitBlog <onboarding@resend.dev>',

  // Pagination defaults
  defaultResLimit: 20,
  defaultResOffset: 0,

  // Cloudinary credentials
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,

  // Admin whitelist
  WHITELIST_ADMINS_MAIL: [
    'mohammadsadee24@gmail.com',
    'tokeeabdullah5@gmail.com',
    'tests@gmail.com',
  ],
};

export default config;
