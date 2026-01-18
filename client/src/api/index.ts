/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import axios from 'axios';

export const bitblogApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});