// import { PostCard } from "@/component/PostCard";
// import { DUMMY_POSTS } from "../data";
// import RteEditor from "@/component/RteEditor";
// import Tiptap from "@/component/TipTap";
// export default function Home() {
//     const sortedPosts = DUMMY_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//   return (
   
//     // <div className="">
//     //   <div className="nav bg-green-500 flex justify-between"> 
//     //     <h2 className="text-4xl">LOGO</h2>
//     //     <div className="flex justify-between gap-4"> 
//     //         <span className="bg-amber-700">username</span>
//     //         <p className="bg-blue-500">logout</p>
//     //     </div>
        
//     //   </div>

//     //   <div className="main">
//     //     {/* hero */}
//     //       <main className="hero flex justify-between">
//     //         <div className="sm:w-1/3 m-3 rounded-4xl bg-amber-400 ">
//     //             {/* <Image className="" src='' width={548} height={548} alt="sth"/> */}
//     //             <img src="/globe.svg" alt="globe_img" className=""/>
//     //         </div>
            
//     //         {/* optional image in mobile view */}
            
//     //         <div className="w-2/3 m-3 p-2 flex justify-center items-center ">
//     //                 <div className="flex flex-col gap-5">
//     //                       <h1 className=" flex justify-center text-4xl">CREANE SOAP</h1>
//     //                       <p className=" ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque facilis fuga assumenda. Harum fugit quod nam eos sequi ea cum quis fuga possimus, modi, in, molestias voluptatem fugiat magnam.</p>    
//     //                 </div>        
//     //         </div>

//     //       </main>
        
//     //     {/* service */}
//     //       <main className="services text-white bg-blue-600  ">
//     //           <h2 className=" text-4xl flex justify-center text-white"> SERVICES</h2>
//     //           <ul className="flex flex-col justify-center items-center gap-5 ">
//     //                 <li>skin care: lorem ipsum ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sed consectetur necessitatibus.</li>
//     //                 <li>skin care: lorem ipsum ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sed consectetur necessitatibus.</li>
//     //                 <li>skin care: lorem ipsum ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sed consectetur necessitatibus.</li>
//     //                 <li>skin care: lorem ipsum ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium sed consectetur necessitatibus.</li>
//     //           </ul>
//     //       </main>


//     //     {/* about */}
//     //     <main className="about">  


//     //     </main>

//     //     {/* testimonials */}

//     //     {/* footer */}
//     //   </div>
    
      
      

//     // </div>
//     <section>
              
//               {/* <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Latest Posts</h1>
//               <div className="grid grid-cols-1 gap-8">
//                 {sortedPosts.map((post) => (
//                   <PostCard key={post.slug} post={post} />
//                 ))}
//               </div> */}

//              {/* <RteEditor/>  */}
//              <Tiptap/>


//     </section>

//   );
// }



// 'use client';

// import Tiptap from '@/component/Tiptap';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// export default function Home() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleContentChange = (newContent: string) => {
//     setContent(newContent);
//   };

//   const handleSubmit = async () => {
//     if (!title || !content) {
//       alert('Title and content are required.');
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const res = await fetch('/api/posts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, content }),
//       });

//       if (res.ok) {
//         alert('Post created successfully!');
//         router.push('/posts'); // Redirect to the posts list page
//       } else {
//         throw new Error('Failed to create post');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('An error occurred. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12 bg-gray-900 text-white">
//       <div className="w-full max-w-4xl">
//         <h1 className="text-4xl font-bold text-center mb-4">Create a New Post</h1>
        
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Post Title"
//           className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
//         />

//         <Tiptap content={content} onChange={handleContentChange} />

//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//             className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold shadow-lg disabled:bg-gray-500"
//           >
//             {isSubmitting ? 'Saving...' : 'Save Post'}
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';
import Navbar from '@/component/Navbar';
import Tiptap from '@/component/Tiptap';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const handleContentChange = (newContent: string) => setContent(newContent);

  const handleSubmit = async () => {
    // ... same handleSubmit logic from before
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        router.push('/posts');
      } else { throw new Error('Failed to create post'); }
    } catch (error) {
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center pt-20">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start p-6 md:p-12">
        {!user ? (
          <div className="text-center">
            <h2 className="text-2xl">Access Denied</h2>
            <p className="mt-2">You must be logged in to create a post.</p>
            <Link href="/login" className="mt-4 inline-block text-blue-400 hover:underline">
              Go to Login
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <h1 className="text-4xl font-bold text-center mb-4">Create a New Post</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded-md"/>
            <Tiptap content={content} onChange={handleContentChange} />
            <div className="mt-8 flex justify-end">
              <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold disabled:bg-gray-500">
                {isSubmitting ? 'Saving...' : 'Save Post'}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}