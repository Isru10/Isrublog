// app/data.tsx
import React from 'react';

// Define the type for a post right here
export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: React.ReactNode; // Content is now JSX
}

// Define the dummy posts data
export const DUMMY_POSTS: Post[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World!',
    date: '2023-10-26',
    author: 'Jane Doe',
    excerpt: 'This is my very first blog post on this new platform. Welcome!',
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          This is the main content of my first blog post. Its written directly as JSX with{' '}
          <strong className="font-semibold text-gray-800">Tailwind classes</strong> applied to each element.
        </p>
        <h2 className="text-3xl font-bold mt-8 mb-4 border-b pb-2">A Deeper Look</h2>
        <p className="mb-4 leading-relaxed">
          You can structure your content with any components you like.
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li className="mb-2">This is a list item.</li>
          <li className="mb-2">And another list item.</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          Heres a link to the{' '}
          <a href="https://nextjs.org" className="text-blue-600 hover:underline">
            Next.js documentation
          </a>
          .
        </p>
      </>
    ),
  },
  {
    slug: 'styling-with-tailwind',
    title: 'Styling with Tailwind CSS',
    date: '2023-11-15',
    author: 'John Smith',
    excerpt: 'Learn how Tailwind CSS can make styling your blog a breeze, even without plugins.',
    content: (
      <>
        <p className="mb-4 leading-relaxed">
          Tailwind CSS is a utility-first CSS framework that allows for rapid UI development. Instead of writing custom CSS, you apply pre-existing classes directly in your markup.
        </p>
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6">
          <p>This is a blockquote. Its a great way to highlight a key piece of information. Weve given it a nice style with a border and italic text using only Tailwind classes.</p>
        </blockquote>
        <p className="mb-4 leading-relaxed">
          Working this way keeps your styles co-located with your components, which can make maintenance much easier in the long run.
        </p>
      </>
    ),
  },
];