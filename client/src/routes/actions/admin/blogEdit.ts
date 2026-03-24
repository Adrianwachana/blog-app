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
import type { ActionResponse } from '@/types';

const blogEditAction: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const slug = params.slug;

  /**
   * Safely read accessToken from localStorage.
   * On iOS Safari (Private Browsing or strict ITP settings),
   * localStorage access can throw instead of returning null,
   * which would crash the action and silently prevent the edit
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
    const response = await bitblogApi.put(`/blogs/${slug}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Encoding': 'multipart/form-data',
      },
    });
    const responseData = response.data;

    return {
      ok: true,
      data: responseData,
    } as ActionResponse;
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

export default blogEditAction;