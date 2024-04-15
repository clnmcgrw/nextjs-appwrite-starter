

// Determine environment
const IS_PREVIEW = process?.env?.VERCEL_ENV === 'preview';
const IS_DEV = process?.env?.NODE_ENV !== 'production' && !IS_PREVIEW;
const APP_ENV = IS_DEV ? 'local' : (IS_PREVIEW ? 'preview' : 'production');

// Base URL config
const APP_ROOT_URL = {
  local: 'http://localhost:3000',
  preview: `https://${process?.env?.VERCEL_URL}`,
  production: 'https://mag-proposals.vercel.app',
}[APP_ENV];

// Exports
export const RECOVERY_REDIRECT = `${APP_ROOT_URL}/reset`;
export const EMAIL_VERIFY_REDIRECT = `${APP_ROOT_URL}/dashboard`;

export const SESSION_COOKIE_KEY = 'nas-session';