/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { redirect } from 'react-router';

/**
 * Custom modules
 */
import { bitblogApi } from '@/api';

/**
 * Types
 */
import type { ActionFunction } from 'react-router';
import { AxiosError } from 'axios';
import type { ActionResponse, BlogCreateResponse } from '@/types';

const blogCreateAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  /**
   * Safely read accessToken from localStorage.
   * On iOS Safari (Private Browsing or strict ITP settings),
   * localStorage access can throw instead of returning null,
   * which would crash the action and silently prevent the post
   * from reaching the database. The try/catch handles this.
   */
  let accessToken: string | null = null;
  try {
    accessToken = localStorage.getItem('accessToken');
  } catch {
    return redirect('/');
  }

  if (!accessToken) return redirect('/');

  try {
    const response = await bitblogApi.post('/blogs', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Encoding': 'multipart/form-data',
      },
    });
    const responseData = response.data as BlogCreateResponse;

    return {
      ok: true,
      data: responseData,
    } as ActionResponse<BlogCreateResponse>;
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        ok: false,
        err: err.response?.data,
      } as ActionResponse;
    }

    throw err;
  }
};

export default blogCreateAction;