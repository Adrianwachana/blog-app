/**
 * @copyright 2026 Adrianwachana
 * @license Apache-2.0
 */

import * as React from 'react';
import { useLoaderData } from 'react-router';
import { motion, type Variants } from 'motion/react';

/**
 * Custom modules & Components
 */
import { cn } from '@/lib/utils';
import { BlogCard } from '@/components/BlogCard';

/**
 * Types
 */
import type { HomeLoaderResponse } from '@/routes/loaders/user/home';

/**
 * Animation Variants
 */
const listVariant: Variants = {
  to: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant: Variants = {
  from: { opacity: 0, y: 20 },
  to: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const RecentBlogs = ({
  className,
  ...props
}: React.ComponentProps<'section'>) => {
  const loaderData = useLoaderData() as HomeLoaderResponse | undefined;
  const blogs = loaderData?.recentBlog?.blogs ?? [];

  if (blogs.length === 0) return null;

  return (
    <section
      className={cn(
        'relative py-24 lg:py-32 overflow-hidden bg-background',
        className,
      )}
      {...props}
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container relative">
        {/* Header Section */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-orange-500 font-semibold tracking-widest uppercase text-xs mb-3 block">
              My Safari
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Recent stories.
            </h2>
          </motion.div>
        </div>

        <motion.ul
          className="grid gap-10 lg:grid-cols-2 lg:grid-rows-3"
          initial="from"
          whileInView="to"
          viewport={{ once: true, margin: '-50px' }}
          variants={listVariant}
        >
          {blogs.map((blog, index) => (
            <motion.li
              key={blog.slug}
              className={cn(
                'group relative z-10',
                index === 0 && 'lg:row-span-3',
              )}
              variants={itemVariant}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              {/* Animated Glow Aura */}
              <div className="absolute -inset-4 bg-gradient-to-b from-orange-500/[0.08] to-transparent rounded-[var(--radius)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <BlogCard
                bannerUrl={blog.banner.url}
                bannerWidth={blog.banner.width}
                bannerHeight={blog.banner.height}
                title={blog.title}
                content={blog.content}
                slug={blog.slug}
                authorName={blog.author.username}
                publishedAt={blog.publishedAt}
                size={index > 0 ? 'sm' : 'default'}
                className="relative h-full border-border/40 bg-background/50 backdrop-blur-sm group-hover:border-orange-500/50 group-hover:shadow-2xl group-hover:shadow-orange-500/10 transition-all duration-500"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};
