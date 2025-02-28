// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "Jeff",
  company: "Nvidia",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

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
      
      <div className="flex items-center">
        <nav className="space-x-8 mr-8">
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
          <Link href="/timephase" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
            Time Phase
          </Link>
        </nav>
        
        {/* User profile */}
        <div className="flex items-center">
          <div className="text-right mr-3">
            <p className="text-indigo-100 text-sm">Welcome, <span className="font-semibold">{user.name}</span></p>
            <p className="text-emerald-300 text-xs">{user.company}</p>
          </div>
          <div className="relative">
            <img
              src={user.avatar}
              alt={`${user.name}'s profile`}
              className="h-8 w-8 rounded-full border-2 border-emerald-400"
            />
            <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-indigo-900"></span>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Navbar;
