// components/PostCard.tsx
import Link from 'next/link';
import { Post } from '@/app/data'; // Import the type from our data file

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Link href={`/${post.slug}`} className="text-2xl font-bold text-slate-800 hover:text-blue-600">
        {post.title}
      </Link>
      <p className="text-sm text-slate-500 mt-2">
        By {post.author} on {post.date}
      </p>
      <p className="text-slate-600 mt-4">{post.excerpt}</p>
      <Link href={`/${post.slug}`} className="text-blue-500 hover:underline mt-4 inline-block font-semibold">
        Read More →
      </Link>
    </div>
  );
};