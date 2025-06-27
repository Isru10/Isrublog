import EditPostForm from "@/component/EditPostForm";

const getPostById = async (id: string) => {
  try {
    // const baseURL = process.env.VERCEL_URL
    // ? `https://` + process.env.VERCEL_URL
    // : 'http://localhost:3000';
// changed the url process env variable to NEXT_PUBLIC_BASE_URL 
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch post');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function EditPost({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getPostById(id);

  if (!data || !data.post) {
    return <div className="text-center mt-20">Error loading post. It may not exist.</div>
  }

  const { title, content } = data.post;

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      {/* edit post form for dynamic page */}
      <EditPostForm id={id} title={title} content={content} />
    </main>
  );
}