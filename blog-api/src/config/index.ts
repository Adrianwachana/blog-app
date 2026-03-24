/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 *
 * Central configuration file for the application.
 * All environment variables and runtime configuration
 * are defined here to keep the server organized.
 */

import dotenv from 'dotenv';
import type ms from 'ms';

// Load environment variables from the .env file
dotenv.config();

// Determine if the server is running in development
const isDev = process.env.NODE_ENV === 'development';

const config = {

  /**
   * Server Port
   * Render automatically provides PORT in production.
   * Local development defaults to 3000.
   */
  PORT: process.env.PORT || 3000,

  /**
   * Node Environment
   * Determines behavior differences between
   * development and production.
   */
  NODE_ENV: process.env.NODE_ENV || 'development',

  /**
   * CORS Whitelist
   *
   * Only the following domains are allowed
   * to make requests to the backend API.
   */
  WHITELIST_ORIGINS: isDev
    ? [
        // Local frontend (Vite)
        'http://localhost:5173',

        // Local backend testing
        'http://localhost:3000',
      ]
    : [
        /**
         * Primary production website
         */
        'https://bearbubbless.com',

        /**
         * WWW version of the main website
         * Browsers treat this as a different origin.
         */
        'https://www.bearbubbless.com',

        /**
         * Render deployed frontend (original)
         */
        'https://blog-app-eoey.onrender.com',

        /**
         * New Render frontend deployment
         */
        'https://blog-apppp-bs6r.onrender.com',

        /**
         * Future custom domains
         */
        'https://blog.Adrianwachana.com',
        'https://docs.blog-api.Adrianwachana.com',
      ],

  /**
   * MongoDB Database Connection URI
   */
  MONGO_URI: process.env.MONGO_URI!,

  /**
   * BetterStack / Logtail configuration
   * Used for centralized logging
   */
  LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN!,
  LOGTAIL_INGESTING_HOST: process.env.LOGTAIL_INGESTING_HOST!,

  /**
   * Application log level
   * Options: error | warn | info | debug
   */
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  /**
   * JWT Secrets
   * Used to sign access and refresh tokens
   */
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,

  /**
   * Token expiry times
   * Uses the "ms" library format
   * Examples: 15m, 1h, 7d
   */
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue,

  /**
   * Resend Email API configuration
   */
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO!,
  EMAIL_FROM: process.env.EMAIL_FROM || 'BitBlog <onboarding@resend.dev>',

  /**
   * Default API pagination
   */
  defaultResLimit: 20,
  defaultResOffset: 0,

  /**
   * Cloudinary credentials
   * Used for media and image uploads
   */
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,

  /**
   * Admin email whitelist
   * Only these users receive admin privileges
   */
  WHITELIST_ADMINS_MAIL: [
    'christineberny77@gmail.com',
    'tokeeabdullah5@gmail.com',
    'tests@gmail.com',
  ],
};

export default config;