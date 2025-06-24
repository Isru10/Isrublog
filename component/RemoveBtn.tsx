// src/components/RemoveBtn.tsx
'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter();

  const removePost = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");

    if (confirmed) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Refresh the server component data without a full page reload
        router.refresh();
      } else {
        alert("Failed to delete post.");
      }
    }
  };

  return (
    <button onClick={removePost} className="text-red-400 hover:text-red-600">
      <Trash2 size={20} />
    </button>
  );
}