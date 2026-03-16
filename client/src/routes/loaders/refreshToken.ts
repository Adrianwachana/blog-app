/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { data, redirect } from 'react-router';

/**
 * Custom modules
 */
import { bitblogApi } from '@/api';

/**
 * Types
 */
import type { LoaderFunction } from 'react-router';
import { AxiosError } from 'axios';

const refreshTokenLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const redirectUri = url.searchParams.get('redirect') ?? '/';

  try {
    const { data } = await bitblogApi.post(
      '/auth/refresh-token',
      {},
      { withCredentials: true },
    );

    localStorage.setItem('accessToken', data.accessToken);

    return redirect(redirectUri);
  } catch (err) {
    if (err instanceof AxiosError) {
      const message = err.response?.data?.message ?? '';
      const tokenExpired =
        typeof message === 'string' && message.includes('token expired');

      if (tokenExpired || err.response?.status === 401 || err.response?.status === 400) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        return redirect('/login');
      }

      throw data(message || err.message, {
        status: err.response?.status || err.status,
        statusText: err.response?.data?.code || err.code,
      });
    }

    throw err;
  }
};

export default refreshTokenLoader;