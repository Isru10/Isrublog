// components/Header.tsx
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold hover:text-slate-300 transition-colors">
          My Blog
        </Link>
        <nav>
          <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};