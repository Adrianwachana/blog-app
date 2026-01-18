
/**
 * controllers/v1/contact/send_contact_email.ts
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import type { Request, Response } from 'express';
import { sendContactEmail, sendContactAutoReply } from '@/lib/resend';
import { logger } from '@/lib/winston';

const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    // Send main email to admin
    await sendContactEmail({ name, email, subject, message });
    
    // Send auto-reply to user (non-blocking)
    sendContactAutoReply({ name, email, subject, message }).catch((err) => {
      logger.warn('Auto-reply failed but continuing:', err);
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });

    logger.info('Contact form submission processed', { name, email });
  } catch (error: any) {
    logger.error('Error processing contact form:', error);
    
    res.status(500).json({
      success: false,
      code: 'ServerError',
      message: 'Failed to send message. Please try again later.',
    });
  }
};

export default sendContactMessage;