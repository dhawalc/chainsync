'use client';

// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "Jeff",
  company: "Nvidia",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const Navbar = () => {
  const [supplyChainOpen, setSupplyChainOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);
  
  return (
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
          <nav className="space-x-6 mr-8">
            <Link href="/" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
              Dashboard
            </Link>
            <Link href="/landing" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
              Landing
            </Link>
            
            {/* Supply Chain Dropdown */}
            <div className="relative inline-block text-left">
              <button 
                onClick={() => {
                  setSupplyChainOpen(!supplyChainOpen);
                  if (planningOpen) setPlanningOpen(false);
                }}
                className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
              >
                Supply Chain
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={supplyChainOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {supplyChainOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/products" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Products
                    </Link>
                    <Link href="/inventory" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Inventory
                    </Link>
                    <Link href="/suppliers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Suppliers
                    </Link>
                    <Link href="/production" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Production
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Planning & Analytics Dropdown */}
            <div className="relative inline-block text-left">
              <button 
                onClick={() => {
                  setPlanningOpen(!planningOpen);
                  if (supplyChainOpen) setSupplyChainOpen(false);
                }}
                className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
              >
                Planning & Analytics
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={planningOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
              </button>
              
              {planningOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/forecasting" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Forecasting
                    </Link>
                    <Link href="/timephase" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Time Phase
                    </Link>
                    <Link href="/hierarchy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Hierarchy
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/audit" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
              Audit
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
};

export default Navbar;
