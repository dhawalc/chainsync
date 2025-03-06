'use client';

// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "Jeff",
  company: "Nvidia",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const Navbar = () => {
  const [supplyChainOpen, setSupplyChainOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);
  const [mdmOpen, setMdmOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const pathname = usePathname();
  
  // Refs for dropdown containers
  const supplyChainRef = useRef<HTMLDivElement>(null);
  const planningRef = useRef<HTMLDivElement>(null);
  const mdmRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setSupplyChainOpen(false);
    setPlanningOpen(false);
    setMdmOpen(false);
    setAnalysisOpen(false);
  };

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside all dropdown containers
      if (
        supplyChainRef.current && !supplyChainRef.current.contains(event.target as Node) &&
        planningRef.current && !planningRef.current.contains(event.target as Node) &&
        mdmRef.current && !mdmRef.current.contains(event.target as Node) &&
        analysisRef.current && !analysisRef.current.contains(event.target as Node)
      ) {
        closeAllDropdowns();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            
            {/* Master Data Management Dropdown */}
            <div ref={mdmRef} className="relative inline-block text-left">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setMdmOpen(!mdmOpen);
                  setSupplyChainOpen(false);
                  setPlanningOpen(false);
                  setAnalysisOpen(false);
                }}
                className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
              >
                Master Data
                <ChevronDownIcon
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${mdmOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {mdmOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/mdm" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      MDM Dashboard
                    </Link>
                    <Link href="/mdm/material" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Material Master
                    </Link>
                    <Link href="/mdm/customer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Customer Master
                    </Link>
                    <Link href="/mdm/vendor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Vendor Master
                    </Link>
                    <Link href="/mdm/bom" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Bill of Materials
                    </Link>
                    <Link href="/mdm/routing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Routing & Work Centers
                    </Link>
                    <Link href="/mdm/production-version" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Production Version
                    </Link>
                    <Link href="/mdm/calendar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Calendars
                    </Link>
                    <Link href="/mdm/transportation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Transportation
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link href="/mdm/integration" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Integration
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Supply Chain Dropdown */}
            <div ref={supplyChainRef} className="relative inline-block text-left">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSupplyChainOpen(!supplyChainOpen);
                  setMdmOpen(false);
                  setPlanningOpen(false);
                  setAnalysisOpen(false);
                }}
                className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
              >
                Supply Chain
                <ChevronDownIcon
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${supplyChainOpen ? 'rotate-180' : ''}`}
                />
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
            <div ref={planningRef} className="relative inline-block text-left">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setPlanningOpen(!planningOpen);
                  setSupplyChainOpen(false);
                  setMdmOpen(false);
                  setAnalysisOpen(false);
                }}
                className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
              >
                Planning & Analytics
                <ChevronDownIcon
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${planningOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {planningOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/forecast" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Forecast
                    </Link>
                    <Link href="/demand" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Demand Planning
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
            
            {/* Analysis Dropdown */}
            <div ref={analysisRef} className="relative inline-block text-left">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAnalysisOpen(!analysisOpen);
                  setSupplyChainOpen(false);
                  setMdmOpen(false);
                  setPlanningOpen(false);
                }}
                className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
              >
                Analysis
                <ChevronDownIcon
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${analysisOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {analysisOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/analysis" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Dashboard
                    </Link>
                    <Link href="/analysis/explainability" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Explainability Grid
                    </Link>
                    <Link href="/analysis/performance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Performance Dashboard
                    </Link>
                    <Link href="/analysis/what-if" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      What-If Analysis
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/audit" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
              Audit
            </Link>
            
            <Link href="/landing" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
              Landing
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
