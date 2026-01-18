/**
 * scripts/test-resend.ts
 */

import 'dotenv/config';
import { sendContactEmail } from '@/lib/resend';

async function testEmail() {
  console.log('🧪 Starting Resend email test...');

  try {
    const result = await sendContactEmail({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email from Blog',
      message: 'This is a test message to verify Resend is working.',
    });

    console.log('✅ Email sent successfully!');
    console.log('📧 Email ID:', result.id);
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmail()
  .then(() => {
    console.log('🏁 Test script finished');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Unhandled error:', err);
    process.exit(1);
  });
