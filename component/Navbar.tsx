'use client';

import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();

  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-50">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/posts" className="text-2xl font-bold text-white">
          My Tiptap Blog
        </Link>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-700 rounded-md animate-pulse"></div>
          ) : user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded-md">
                Login
              </Link>
              <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1 rounded-md">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}