// src/components/EditPostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Tiptap from './Tiptap';

interface EditPostFormProps {
  id: string;
  title: string;
  content: string;
}

export default function EditPostForm({ id, title, content }: EditPostFormProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleContentChange = (newContentValue: string) => {
    setNewContent(newContentValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newContent }),
      });

      if (!res.ok) {
        throw new Error('Failed to update post');
      }
      
      alert('Post updated successfully!');
      router.push('/posts'); // Redirect to the posts list
      router.refresh(); // Ensure the list is up-to-date
    } catch (error) {
      console.log(error);
      alert('An error occurred while updating the post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
        type="text"
        placeholder="Post Title"
      />

      <Tiptap content={newContent} onChange={handleContentChange} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold shadow-lg disabled:bg-gray-500 self-end"
      >
        {isSubmitting ? 'Updating...' : 'Update Post'}
      </button>
    </form>
  );
}