// components/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 p-4 mt-12">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};