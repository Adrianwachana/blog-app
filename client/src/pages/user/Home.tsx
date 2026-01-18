/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

/**
 * Components
 */
import { Page } from '@/components/Page';
import { Hero } from '@/components/Home/Hero';
import { RecentBlogs } from '@/components/Home/RecentBlogs';
import { AllBlogs } from '@/components/Home/AllBlogs';

export const Home = () => {
  return (
    <Page>
      <Hero />

      <RecentBlogs />

      <AllBlogs />
    </Page>
  );
};
