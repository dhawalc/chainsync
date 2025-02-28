// components/Navbar.tsx

import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => (
  <header className="bg-indigo-900 shadow-md">
    <div className="max-w-7xl mx-auto py-3 px-6 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-3">
        <Image 
          src="/logocs.png" 
          alt="ChainSync Logo" 
          width={40} 
          height={40} 
          className="h-10 w-auto"
          priority
        />
        <h1 className="text-2xl font-bold text-indigo-100">
          <span className="text-emerald-400">Chain</span>Sync
        </h1>
      </Link>
      
      <nav className="space-x-8">
        <Link href="/" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
          Home
        </Link>
        <Link href="/products" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
          Products
        </Link>
        <Link href="/hierarchy" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
          Hierarchy
        </Link>
        <Link href="/audit" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
          Audit
        </Link>
      </nav>
    </div>
  </header>
);

export default Navbar;
