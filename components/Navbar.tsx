"use client";

// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "Jeff",
  company: "Acme, Inc.",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

// Menu items configuration
const menuItems = {
  mdm: [
    { href: '/mdm', label: 'MDM Dashboard' },
    { href: '/mdm/material', label: 'Material Master' },
    { href: '/mdm/customer', label: 'Customer Master' },
    { href: '/mdm/vendor', label: 'Vendor Master' },
    { href: '/mdm/bom', label: 'Bill of Materials' },
    { href: '/mdm/routing', label: 'Routing & Work Centers' },
    { href: '/mdm/production-version', label: 'Production Version' },
    { href: '/mdm/calendar', label: 'Calendars' },
    { href: '/mdm/location', label: 'Location Master' },
    { href: '/mdm/transportation', label: 'Transportation' },
    { href: '/integrations', label: 'Integration' },
  ],
  supplyChain: [
    { href: '/products', label: 'Products' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/suppliers', label: 'Suppliers' },
    { href: '/production', label: 'Production' },
    { href: '/risk', label: 'Risk Dashboard' },
  ],
  planning: [
    { href: '/forecast', label: 'Forecast' },
    { href: '/demand', label: 'Demand Planning' },
    { href: '/timephase', label: 'Time Phase' },
    { href: '/hierarchy', label: 'Hierarchy' },
    { href: '/yield-management', label: 'Yield Management' },
    { href: '/planning-setup/location-process', label: 'Location Process Setup' },
    { href: '/planning-setup/bom-time-phase', label: 'BOM Time Phase' },
    { href: '/planning-setup/resource-mapping', label: 'Resource Mapping' },
  ],
  analysis: [
    { href: '/analysis', label: 'Dashboard' },
    { href: '/product-report', label: 'Product Report' },
    { href: '/performance', label: 'Performance' },
    { href: '/what-if', label: 'What-If Analysis' },
    { href: '/kpi', label: 'KPI Dashboard' },
  ],
  additional: [
    { href: '/audit', label: 'Audit' },
    { href: '/landing', label: 'Landing' },
  ],
};

// Memoized dropdown menu component
const DropdownMenu = memo(({ 
  isOpen, 
  items, 
  onClose 
}: { 
  isOpen: boolean; 
  items: { href: string; label: string }[]; 
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
      <div className="py-1" role="menu" aria-orientation="vertical">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
});

DropdownMenu.displayName = 'DropdownMenu';

// Memoized dropdown button component
const DropdownButton = memo(({ 
  label, 
  isOpen, 
  onClick 
}: { 
  label: string; 
  isOpen: boolean; 
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium flex items-center"
  >
    {label}
    <ChevronDownIcon
      className={`ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    />
  </button>
));

DropdownButton.displayName = 'DropdownButton';

const Navbar = () => {
  // Desktop dropdown states
  const [supplyChainOpen, setSupplyChainOpen] = useState(false);
  const [mdmOpen, setMdmOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  // Mobile dropdown states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMdmOpen, setMobileMdmOpen] = useState(false);
  const [mobileSupplyChainOpen, setMobileSupplyChainOpen] = useState(false);
  const [mobilePlanningOpen, setMobilePlanningOpen] = useState(false);
  const [mobileAnalysisOpen, setMobileAnalysisOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Refs for dropdown containers
  const supplyChainRef = useRef<HTMLDivElement>(null);
  const mdmRef = useRef<HTMLDivElement>(null);
  const planningRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close dropdowns if user clicks outside of them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        supplyChainRef.current &&
        !supplyChainRef.current.contains(event.target as Node) &&
        mdmRef.current &&
        !mdmRef.current.contains(event.target as Node) &&
        planningRef.current &&
        !planningRef.current.contains(event.target as Node) &&
        analysisRef.current &&
        !analysisRef.current.contains(event.target as Node)
      ) {
        setSupplyChainOpen(false);
        setMdmOpen(false);
        setPlanningOpen(false);
        setAnalysisOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu and all mobile dropdowns on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileMdmOpen(false);
    setMobileSupplyChainOpen(false);
    setMobilePlanningOpen(false);
    setMobileAnalysisOpen(false);
  }, [pathname]);

  return (
    <header className="bg-indigo-900 shadow-md relative">
      <div className="max-w-7xl mx-auto py-3 px-6 flex justify-between items-center">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/cslogo.jpg"
            alt="ChainSync Logo"
            width={40}
            height={40}
            className="h-10 w-auto rounded-md"
            priority
          />
          <h1 className="text-2xl font-bold text-indigo-100">
            <span className="text-emerald-400">Chain</span>Sync
          </h1>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="md:hidden text-indigo-200 hover:text-emerald-300 transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="space-x-6 mr-8">
            <Link href="/" className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
              Dashboard
            </Link>

            {/* MDM Dropdown */}
            <div ref={mdmRef} className="relative inline-block text-left">
              <button
                onClick={() => {
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
                    {menuItems.mdm.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setMdmOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Supply Chain Dropdown */}
            <div ref={supplyChainRef} className="relative inline-block text-left">
              <button
                onClick={() => {
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
                    {menuItems.supplyChain.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setSupplyChainOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Planning & Analytics Dropdown */}
            <div ref={planningRef} className="relative inline-block text-left">
              <button
                onClick={() => {
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
                    {menuItems.planning.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setPlanningOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Dropdown */}
            <div ref={analysisRef} className="relative inline-block text-left">
              <button
                onClick={() => {
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
                    {menuItems.analysis.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setAnalysisOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
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
          
          {/* Desktop User profile */}
          <div className="flex items-center">
            <div className="text-right mr-3">
              <p className="text-indigo-100 text-sm">Welcome, <span className="font-semibold">{user.name}</span></p>
              <p className="text-emerald-300 text-xs">{user.company}</p>
            </div>
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-indigo-900 shadow-lg md:hidden z-50">
          <div className="px-4 py-2 border-t border-indigo-800">
            {/* Mobile User Profile */}
            <div className="flex items-center py-4 border-b border-indigo-800">
              <img
                src={user.avatar}
                alt={`${user.name}'s profile`}
                className="h-10 w-10 rounded-full border-2 border-emerald-400"
              />
              <div className="ml-3">
                <p className="text-indigo-100">Welcome, <span className="font-semibold">{user.name}</span></p>
                <p className="text-emerald-300 text-sm">{user.company}</p>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="py-4">
              <Link href="/" className="block py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
                Dashboard
              </Link>

              {/* Mobile MDM Section */}
              <div className="py-2.5">
                <button
                  onClick={() => setMobileMdmOpen(!mobileMdmOpen)}
                  className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                >
                  <span>Master Data</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mobileMdmOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileMdmOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {menuItems.mdm.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-indigo-300 hover:text-emerald-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Supply Chain Section */}
              <div className="py-2.5">
                <button
                  onClick={() => setMobileSupplyChainOpen(!mobileSupplyChainOpen)}
                  className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                >
                  <span>Supply Chain</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mobileSupplyChainOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileSupplyChainOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {menuItems.supplyChain.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-indigo-300 hover:text-emerald-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Planning & Analytics Section */}
              <div className="py-2.5">
                <button
                  onClick={() => setMobilePlanningOpen(!mobilePlanningOpen)}
                  className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                >
                  <span>Planning & Analytics</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mobilePlanningOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobilePlanningOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {menuItems.planning.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-indigo-300 hover:text-emerald-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Analysis Section */}
              <div className="py-2.5">
                <button
                  onClick={() => setMobileAnalysisOpen(!mobileAnalysisOpen)}
                  className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                >
                  <span>Analysis</span>
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mobileAnalysisOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileAnalysisOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {menuItems.analysis.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-indigo-300 hover:text-emerald-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/audit" className="block py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
                Audit
              </Link>
              
              <Link href="/landing" className="block py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium">
                Landing
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default memo(Navbar);
