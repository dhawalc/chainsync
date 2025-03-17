"use client";

// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
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
    { href: '/kpi', label: 'KPI Dashboard' },
    { href: '/product-report', label: 'Product Report' },
    { href: '/supplier-performance', label: 'Supplier Performance' },
    { href: '/inventory-analysis', label: 'Inventory Analysis' },
    { href: '/cost-analysis', label: 'Cost Analysis' },
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
  const [supplyChainOpen, setSupplyChainOpen] = useState(false);
  const [mdmOpen, setMdmOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
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
                    <Link href="/integrations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
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
                    <Link href="/risk" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Risk Dashboard
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
                    <Link href="/yield-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Yield Management
                    </Link>
                    <Link href="/planning-setup/location-process" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Location Process Setup
                    </Link>
                    <Link href="/planning-setup/bom-time-phase" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      BOM Time Phase
                    </Link>
                    <Link href="/planning-setup/resource-mapping" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Resource Mapping
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
                    <Link href="/product-report" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Product Report
                    </Link>
                    <Link href="/performance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Performance
                    </Link>
                    <Link href="/what-if" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      What-If Analysis
                    </Link>
                    <Link href="/kpi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      KPI Dashboard
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
              <div className="text-left">
                <p className="text-sm font-medium text-indigo-100">{user.name}</p>
                <p className="text-xs text-indigo-200">{user.company}</p>
              </div>
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
                    onClick={() => setMdmOpen(!mdmOpen)}
                    className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Master Data</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${mdmOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mdmOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      <Link href="/mdm" className="block py-2 text-indigo-300 hover:text-emerald-300">MDM Dashboard</Link>
                      <Link href="/mdm/material" className="block py-2 text-indigo-300 hover:text-emerald-300">Material Master</Link>
                      <Link href="/mdm/customer" className="block py-2 text-indigo-300 hover:text-emerald-300">Customer Master</Link>
                      <Link href="/mdm/vendor" className="block py-2 text-indigo-300 hover:text-emerald-300">Vendor Master</Link>
                      <Link href="/mdm/bom" className="block py-2 text-indigo-300 hover:text-emerald-300">Bill of Materials</Link>
                      <Link href="/mdm/routing" className="block py-2 text-indigo-300 hover:text-emerald-300">Routing & Work Centers</Link>
                      <Link href="/mdm/production-version" className="block py-2 text-indigo-300 hover:text-emerald-300">Production Version</Link>
                      <Link href="/mdm/calendar" className="block py-2 text-indigo-300 hover:text-emerald-300">Calendars</Link>
                      <Link href="/mdm/transportation" className="block py-2 text-indigo-300 hover:text-emerald-300">Transportation</Link>
                      <Link href="/integrations" className="block py-2 text-indigo-300 hover:text-emerald-300">Integration</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Supply Chain Section */}
                <div className="py-2.5">
                  <button
                    onClick={() => setSupplyChainOpen(!supplyChainOpen)}
                    className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Supply Chain</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${supplyChainOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {supplyChainOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      <Link href="/products" className="block py-2 text-indigo-300 hover:text-emerald-300">Products</Link>
                      <Link href="/inventory" className="block py-2 text-indigo-300 hover:text-emerald-300">Inventory</Link>
                      <Link href="/suppliers" className="block py-2 text-indigo-300 hover:text-emerald-300">Suppliers</Link>
                      <Link href="/production" className="block py-2 text-indigo-300 hover:text-emerald-300">Production</Link>
                      <Link href="/risk" className="block py-2 text-indigo-300 hover:text-emerald-300">Risk Dashboard</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Planning & Analytics Section */}
                <div className="py-2.5">
                  <button
                    onClick={() => setPlanningOpen(!planningOpen)}
                    className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Planning & Analytics</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${planningOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {planningOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      <Link href="/forecast" className="block py-2 text-indigo-300 hover:text-emerald-300">Forecast</Link>
                      <Link href="/demand" className="block py-2 text-indigo-300 hover:text-emerald-300">Demand Planning</Link>
                      <Link href="/timephase" className="block py-2 text-indigo-300 hover:text-emerald-300">Time Phase</Link>
                      <Link href="/hierarchy" className="block py-2 text-indigo-300 hover:text-emerald-300">Hierarchy</Link>
                      <Link href="/yield-management" className="block py-2 text-indigo-300 hover:text-emerald-300">Yield Management</Link>
                      <Link href="/planning-setup/location-process" className="block py-2 text-indigo-300 hover:text-emerald-300">Location Process Setup</Link>
                      <Link href="/planning-setup/bom-time-phase" className="block py-2 text-indigo-300 hover:text-emerald-300">BOM Time Phase</Link>
                      <Link href="/planning-setup/resource-mapping" className="block py-2 text-indigo-300 hover:text-emerald-300">Resource Mapping</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Analysis Section */}
                <div className="py-2.5">
                  <button
                    onClick={() => setAnalysisOpen(!analysisOpen)}
                    className="w-full flex items-center justify-between text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Analysis</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${analysisOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {analysisOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                      <Link href="/analysis" className="block py-2 text-indigo-300 hover:text-emerald-300">Dashboard</Link>
                      <Link href="/product-report" className="block py-2 text-indigo-300 hover:text-emerald-300">Product Report</Link>
                      <Link href="/performance" className="block py-2 text-indigo-300 hover:text-emerald-300">Performance</Link>
                      <Link href="/what-if" className="block py-2 text-indigo-300 hover:text-emerald-300">What-If Analysis</Link>
                      <Link href="/kpi" className="block py-2 text-indigo-300 hover:text-emerald-300">KPI Dashboard</Link>
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
      </div>
    </header>
  );
};

export default memo(Navbar);
