'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {post.date} · {post.readTime} read
          </p>
          <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            {post.excerpt}
          </p>
          <div className="mt-4 text-blue-600 dark:text-blue-400">Read more →</div>
        </div>
      </Link>
    </motion.article>
  );
}