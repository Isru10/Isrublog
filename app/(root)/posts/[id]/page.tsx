// src/app/posts/[id]/page.tsx
import DOMPurify from 'isomorphic-dompurify';

type Post = {
  title: string;
  content: string;
  createdAt: string;
};

const getPostById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function PostPage({ params }: { params: { id: string } }) {
  const data = await getPostById(params.id);

  if (!data || !data.post) {
    return <div className="text-center mt-20">Post not found.</div>;
  }

  const post: Post = data.post;
  // Sanitize the HTML content before rendering
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12">
      <h1 className="text-5xl font-extrabold mb-4">{post.title}</h1>
      <p className="text-gray-400 mb-8">
        Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      
      {/* Render the sanitized HTML content */}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </main>
  );
}