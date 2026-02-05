import { Resend } from 'resend';

let _resend: Resend | null = null;

export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@example.com';
export const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@resend.dev';
