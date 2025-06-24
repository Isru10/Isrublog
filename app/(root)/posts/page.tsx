// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { PenSquare } from 'lucide-react';
// import { useAuth } from '@/lib/context/AuthContext';
// import Navbar from '@/component/Navbar';
// import RemoveBtn from '@/component/RemoveBtn';

// interface Post {
//   _id: string;
//   title: string;
//   authorName: string;
//   createdAt: string;
//   authorId: string;
// }

// export default function PostsList() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loadingPosts, setLoadingPosts] = useState(true);
//   const { user, isLoading: isAuthLoading } = useAuth();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoadingPosts(true);
//       try {
//         const res = await fetch('/api/posts');
//         if (res.ok) {
//           const data = await res.json();
//           setPosts(data.posts);
//         }
//       } catch (error) {
//         console.error("Failed to fetch posts:", error);
//       } finally {
//         setLoadingPosts(false);
//       }
//     };
//     fetchPosts();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-4xl mx-auto p-6 md:p-12">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold">All Posts</h1>
//           {user && (
//             <Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold">
//               Create New Post
//             </Link>
//           )}
//         </div>
//         {loadingPosts || isAuthLoading ? (
//           <p>Loading...</p>
//         ) : posts.length > 0 ? (
//           <div className="space-y-4">
//             {posts.map((post) => (
//               <div key={post._id} className="p-4 border border-gray-700 rounded-lg flex items-center justify-between">
//                 <Link href={`/posts/${post._id}`} className="flex-grow">
//                   <div>
//                     <h2 className="text-2xl font-semibold hover:text-blue-400">{post.title}</h2>
//                     <p className="text-sm text-gray-400">
//                       By {post.authorName} on {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </Link>
//                 {user && user.id === post.authorId && (
//                   <div className="flex gap-4 items-center">
//                     <Link href={`/posts/edit/${post._id}`}><PenSquare size={20} className="text-green-400 hover:text-green-600" /></Link>
//                     <RemoveBtn id={post._id} />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No posts found.</p>
//         )}
//       </main>
//     </>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PenSquare, User, Calendar } from 'lucide-react'; // Added new icons
import { useAuth } from '@/lib/context/AuthContext';
import Navbar from '@/component/Navbar';
import RemoveBtn from '@/component/RemoveBtn';

interface Post {
  _id: string;
  title: string;
  authorName: string;
  createdAt: string;
  authorId: string;
}

// A new component for the loading state UI
const PostCardSkeleton = () => (
  <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 animate-pulse">
    <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
    <div className="flex items-center gap-4">
      <div className="h-5 w-5 bg-gray-700 rounded-full"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      <div className="h-5 w-5 bg-gray-700 rounded-full ml-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
    </div>
  </div>
);

export default function PostsList() {
  // --- All of this TypeScript logic remains identical ---
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { user, isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    };
    fetchPosts();
  }, []);
  // --- End of unchanged logic ---

  return (
    // Set a deep black background for the entire page context
    <div className="bg-black min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            All Posts
          </h1>
          {user && (
            <Link 
              href="/" 
              className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
            >
              Create New Post
            </Link>
          )}
        </div>

        {loadingPosts || isAuthLoading ? (
          // Display the new skeleton loader
          <div className="space-y-6">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              // --- THE NEW, REDESIGNED POST CARD ---
              <div 
                key={post._id} 
                className="group relative bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 ease-in-out"
              >
                {/* Subtle glowing effect on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                
                <div className="relative flex items-center justify-between">
                  {/* Main content area */}
                  <Link href={`/posts/${post._id}`} className="flex-grow">
                    <h2 className="text-2xl font-bold text-gray-100 group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{post.authorName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Action buttons - fade in on hover */}
                  {user && user.id === post.authorId && (
                    <div className="flex gap-4 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link href={`/posts/edit/${post._id}`} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                        <PenSquare size={20} className="text-green-400" />
                      </Link>
                      <div className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                         <RemoveBtn id={post._id} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-900 rounded-lg">
            <h3 className="text-2xl font-semibold">No Posts Found</h3>
            <p className="text-gray-500 mt-2">Why not be the first to create one?</p>
          </div>
        )}
      </main>
    </div>
  );
}