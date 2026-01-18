/**
 * routes/v1/contact.ts
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import sendContactMessage from '@/controllers/v1/contact/send_contact_email';
import validationError from '@/middlewares/validationError';

const router = Router();

/**
 * Rate limiting middleware
 * Limits each IP to 5 contact form submissions per hour
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    success: false,
    code: 'RateLimitError',
    message: 'Too many contact form submissions. Please try again later.',
  },
  standardHeaders: true, // Send rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});

/**
 * POST /api/v1/contact
 * Handles contact form submissions
 */
router.post(
  '/',
  contactLimiter,
  // Validate name
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name must be less than 100 characters'),

  // Validate email
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),

  // Validate subject (optional)
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must be less than 200 characters'),

  // Validate message (required, between 10 and 100 characters)
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 100 })
    .withMessage('Message must be between 10 and 100 characters'),

  // Middleware to handle validation errors
  validationError,

  // Controller to send contact message
  sendContactMessage
);

export default router;
