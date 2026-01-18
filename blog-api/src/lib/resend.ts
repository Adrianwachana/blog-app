/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import { Resend } from 'resend';
import config from '@/config';
import { logger } from '@/lib/winston';

// Initialize Resend client
const resend = new Resend(config.RESEND_API_KEY);

export interface ContactEmailData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

/**
 * Send contact form email to admin
 */
export const sendContactEmail = async (
  data: ContactEmailData
): Promise<{ success: true; id?: string }> => {
  try {
    const result = await resend.emails.send({
      from: config.EMAIL_FROM,
      to: config.CONTACT_EMAIL_TO,
      replyTo: data.email,
      subject: data.subject || `New contact message from ${data.name}`,
      html: `<p>${data.message}</p>`,
    });

    logger.info('Contact email sent', {
      emailId: result.data?.id,
      from: data.email,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    logger.error('Failed to send contact email', error);
    throw error;
  }
};

/**
 * Send auto-reply to user
 */
export const sendContactAutoReply = async (
  data: ContactEmailData
): Promise<void> => {
  try {
    const result = await resend.emails.send({
      from: config.EMAIL_FROM,
      to: data.email,
      subject: 'Thanks for reaching out!',
      html: `<p>Hi ${data.name}, thanks for your message!</p>`,
    });

    logger.info('Auto-reply sent', {
      emailId: result.data?.id,
      to: data.email,
    });
  } catch (error) {
    logger.error('Failed to send auto-reply', error);
    throw error;
  }
};
