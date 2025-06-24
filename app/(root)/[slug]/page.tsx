// app/[slug]/page.tsx
import { DUMMY_POSTS } from '@/app/data';
import { notFound } from 'next/navigation';

// This function tells Next.js which routes to pre-render at build time
// export function generateStaticParams() {
//   return DUMMY_POSTS.map((post) => ({
//     slug: post.slug,
//   }));
// }

// This is the page component
export default function PostPage({ params }: { params: { slug: string } }) {
  const post = DUMMY_POSTS.find((p) => p.slug === params.slug);

  // If the post doesn't exist, show a 404 page
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
        {post.title}
      </h1>
      <div className="text-slate-500 mb-8">
        Posted by {post.author} on {post.date}
      </div>
      
      {/* 
        Since post.content is JSX, we can render it directly.
        All styling is self-contained within the data object itself.
      */}
      <div>{post.content}</div>
    </article>
  );
}