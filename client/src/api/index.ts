/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * HTTP client configuration for BitBlog API
 *
 * ⚠️ NOTE:
 * - `withCredentials` is intentionally NOT used
 * - Auth should be handled via Authorization headers (Bearer tokens)
 * - Backend should NOT rely on cookies (req.cookies)
 */

import axios from 'axios';

export const bitblogApi = axios.create({
  // Base URL is injected via Vite environment variables
  // Example: https://blog-api.onrender.com/api/v1
  baseURL: import.meta.env.VITE_API_URL,
});
