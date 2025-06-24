import Navbar from '@/component/Navbar';
import DOMPurify from 'isomorphic-dompurify';

// 1. Define an interface for the page's props. This is the main fix.
interface PageProps {
  params: {
    id: string;
  };
}

// 2. Update the Post type to include the author's name, as your API now provides it.
interface Post {
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

// 3. Update the data fetching function to use the dynamic baseURL for Vercel compatibility.
const getPostById = async (id: string) => {
  const baseURL = process.env.VERCEL_URL
    ? `https://` + process.env.VERCEL_URL
    : 'http://localhost:3000';

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
      cache: 'no-store', // Ensures you always get the latest post data
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
};

// 4. Use the new PageProps interface in your component's signature.
export default async function PostPage({ params }: PageProps) {
  const data = await getPostById(params.id);

  if (!data || !data.post) {
    return (
        <>
            <Navbar />
            <div className="text-center mt-20 text-xl text-gray-400">Post not found.</div>
        </>
    );
  }

  const post: Post = data.post;
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Using Tailwind's typography plugin for beautiful default styling */}
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{post.title}</h1>
          <p className="text-gray-400 mb-8 border-b border-gray-700 pb-4">
            By {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}
          </p>
          
          {/* This div will render the rich text content from your Tiptap editor */}
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </main>
    </>
  );
}