"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "Jeff",
  company: "Acme, Inc.",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const Navbar = () => {
  const [supplyChainOpen, setSupplyChainOpen] = useState(false);
  const [mdmOpen, setMdmOpen] = useState(false);
  const [planningOpen, setPlanningOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
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

  // For debugging
  console.log("[Navbar] Render. Current path:", pathname);
  console.log("[Navbar] Mobile menu state:", mobileMenuOpen);
  console.log("[Navbar] Mobile MDM state:", mobileMdmOpen);

  // Close mobile menu on navigation
  useEffect(() => {
    console.log("[useEffect] Path changed, closing mobile menu");
    setMobileMenuOpen(false);
    setMobileMdmOpen(false);
    setMobileSupplyChainOpen(false);
    setMobilePlanningOpen(false);
    setMobileAnalysisOpen(false);
  }, [pathname]);

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

  // Handle mobile navigation
  const handleMobileNavigation = (path: string) => {
    console.log("[handleMobileNavigation] Navigating to:", path);
    router.push(path);
  };

  // Handle mobile dropdowns
  const handleMobileDropdownToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    currentState: boolean,
    section: string
  ) => {
    console.log(`[Mobile ${section}] Toggling from:`, currentState);
    setter(!currentState);
  };

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
            <Link
              href="/"
              className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
            >
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
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    mdmOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mdmOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                  >
                    <Link
                      href="/mdm"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      MDM Dashboard
                    </Link>
                    <Link
                      href="/mdm/material"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Material Master
                    </Link>
                    <Link
                      href="/mdm/customer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Customer Master
                    </Link>
                    <Link
                      href="/mdm/vendor"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Vendor Master
                    </Link>
                    <Link
                      href="/mdm/bom"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Bill of Materials
                    </Link>
                    <Link
                      href="/mdm/routing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Routing & Work Centers
                    </Link>
                    <Link
                      href="/mdm/production-version"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Production Version
                    </Link>
                    <Link
                      href="/mdm/calendar"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Calendars
                    </Link>
                    <Link
                      href="/mdm/transportation"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Transportation
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link
                      href="/integrations"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Integration
                    </Link>
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
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    supplyChainOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {supplyChainOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Products
                    </Link>
                    <Link
                      href="/inventory"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Inventory
                    </Link>
                    <Link
                      href="/suppliers"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Suppliers
                    </Link>
                    <Link
                      href="/production"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Production
                    </Link>
                    <Link
                      href="/risk"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Risk Dashboard
                    </Link>
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
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    planningOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {planningOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      href="/forecast"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Forecast
                    </Link>
                    <Link
                      href="/demand"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Demand Planning
                    </Link>
                    <Link
                      href="/timephase"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Time Phase
                    </Link>
                    <Link
                      href="/hierarchy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Hierarchy
                    </Link>
                    <Link
                      href="/yield-management"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Yield Management
                    </Link>
                    <Link
                      href="/planning-setup/location-process"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Location Process Setup
                    </Link>
                    <Link
                      href="/planning-setup/bom-time-phase"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      BOM Time Phase
                    </Link>
                    <Link
                      href="/planning-setup/resource-mapping"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Resource Mapping
                    </Link>
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
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    analysisOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {analysisOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link
                      href="/analysis"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/product-report"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Product Report
                    </Link>
                    <Link
                      href="/performance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Performance
                    </Link>
                    <Link
                      href="/what-if"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      What-If Analysis
                    </Link>
                    <Link
                      href="/kpi"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      KPI Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/audit"
              className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
            >
              Audit
            </Link>

            <Link
              href="/landing"
              className="text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
            >
              Landing
            </Link>
          </nav>

          {/* Desktop User profile */}
          <div className="flex items-center">
            <div className="text-right mr-3">
              <p className="text-indigo-100 text-sm">
                Welcome, <span className="font-semibold">{user.name}</span>
              </p>
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
                  <p className="text-indigo-100">
                    Welcome, <span className="font-semibold">{user.name}</span>
                  </p>
                  <p className="text-emerald-300 text-sm">{user.company}</p>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="py-4 space-y-2">
                <Link
                  href="/"
                  className="block w-full text-left py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>

                {/* Mobile MDM Section */}
                <div className="w-full">
                  <button
                    onClick={() => handleMobileDropdownToggle(setMobileMdmOpen, mobileMdmOpen, "MDM")}
                    className="w-full flex items-center justify-between py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Master Data</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileMdmOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {mobileMdmOpen && (
                    <div className="pl-4 py-2 space-y-2 border-l border-indigo-800 mt-2">
                      <Link
                        href="/mdm"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        MDM Dashboard
                      </Link>
                      <Link
                        href="/mdm/material"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Material Master
                      </Link>
                      <Link
                        href="/mdm/customer"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Customer Master
                      </Link>
                      <Link
                        href="/mdm/vendor"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Vendor Master
                      </Link>
                      <Link
                        href="/mdm/bom"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Bill of Materials
                      </Link>
                      <Link
                        href="/mdm/routing"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Routing & Work Centers
                      </Link>
                      <Link
                        href="/mdm/production-version"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Production Version
                      </Link>
                      <Link
                        href="/mdm/calendar"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Calendars
                      </Link>
                      <Link
                        href="/mdm/transportation"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Transportation
                      </Link>
                      <Link
                        href="/integrations"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Integration
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Supply Chain Section */}
                <div className="w-full">
                  <button
                    onClick={() => handleMobileDropdownToggle(setMobileSupplyChainOpen, mobileSupplyChainOpen, "Supply Chain")}
                    className="w-full flex items-center justify-between py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Supply Chain</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileSupplyChainOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {mobileSupplyChainOpen && (
                    <div className="pl-4 py-2 space-y-2 border-l border-indigo-800 mt-2">
                      <Link
                        href="/products"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Products
                      </Link>
                      <Link
                        href="/inventory"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Inventory
                      </Link>
                      <Link
                        href="/suppliers"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Suppliers
                      </Link>
                      <Link
                        href="/production"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Production
                      </Link>
                      <Link
                        href="/risk"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Risk Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Planning & Analytics Section */}
                <div className="w-full">
                  <button
                    onClick={() => handleMobileDropdownToggle(setMobilePlanningOpen, mobilePlanningOpen, "Planning")}
                    className="w-full flex items-center justify-between py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Planning & Analytics</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobilePlanningOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {mobilePlanningOpen && (
                    <div className="pl-4 py-2 space-y-2 border-l border-indigo-800 mt-2">
                      <Link
                        href="/forecast"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Forecast
                      </Link>
                      <Link
                        href="/demand"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Demand Planning
                      </Link>
                      <Link
                        href="/timephase"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Time Phase
                      </Link>
                      <Link
                        href="/hierarchy"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Hierarchy
                      </Link>
                      <Link
                        href="/yield-management"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Yield Management
                      </Link>
                      <Link
                        href="/planning-setup/location-process"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Location Process Setup
                      </Link>
                      <Link
                        href="/planning-setup/bom-time-phase"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        BOM Time Phase
                      </Link>
                      <Link
                        href="/planning-setup/resource-mapping"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Resource Mapping
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Analysis Section */}
                <div className="w-full">
                  <button
                    onClick={() => handleMobileDropdownToggle(setMobileAnalysisOpen, mobileAnalysisOpen, "Analysis")}
                    className="w-full flex items-center justify-between py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  >
                    <span>Analysis</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform duration-200 ${
                        mobileAnalysisOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {mobileAnalysisOpen && (
                    <div className="pl-4 py-2 space-y-2 border-l border-indigo-800 mt-2">
                      <Link
                        href="/analysis"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/product-report"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Product Report
                      </Link>
                      <Link
                        href="/performance"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Performance
                      </Link>
                      <Link
                        href="/what-if"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        What-If Analysis
                      </Link>
                      <Link
                        href="/kpi"
                        className="block w-full text-left py-2 text-indigo-300 hover:text-emerald-300 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        KPI Dashboard
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Direct Links */}
                <Link
                  href="/audit"
                  className="block w-full text-left py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Audit
                </Link>

                <Link
                  href="/landing"
                  className="block w-full text-left py-2.5 text-indigo-200 hover:text-emerald-300 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
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

export default Navbar;
