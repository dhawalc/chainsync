"use client";

// components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDownIcon, Bars3Icon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import ChatAssistantModal from '@/app/components/ai/ChatAssistantModal';

// Mock user data - in a real app, this would come from authentication
const user = {
  name: "Jeff",
  company: "Acme, Inc.",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

// Menu items configuration
const menuItems = {
  mdm: [
    { href: '/mdm/material', label: 'Material Master' },
    { href: '/mdm/customer', label: 'Customer Master' },
    { href: '/mdm/supplier', label: 'Supplier Master' },
    { href: '/mdm/bom', label: 'Bill of Materials' },
    { href: '/mdm/routing', label: 'Routing & Work Centers' },
    { href: '/mdm/production-version', label: 'Production Version' },
    { href: '/mdm/calendar', label: 'Calendars' },
    { href: '/mdm/location', label: 'Location Master' },
    { href: '/mdm/technology-node', label: 'Technology Node' },
    { href: '/mdm/process', label: 'Process' },
    { href: '/mdm/technology-node/define', label: 'Define Technology' },
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
  procurement: [
    { href: '/procurement/supplier-leadtime', label: 'Supplier Lead Time' },
    { href: '/procurement/supplier-qualification', label: 'Supplier Qualification' },
    { href: '/procurement/supplier-quota', label: 'Supplier Quota Splits' },
  ],
  analysis: [
    { href: '/analysis', label: 'Dashboard' },
    { href: '/product-report', label: 'Product Report' },
    { href: '/performance', label: 'Performance' },
    { href: '/what-if', label: 'What-If Analysis' },
    { href: '/kpi', label: 'KPI Dashboard' },
    { href: '/audit', label: 'Audit' }
  ]
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
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="navbar-dropdown"
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        {items.map((item) => (
          <motion.div
            key={item.href}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.1 }}
          >
            <Link
              href={item.href}
              className="navbar-dropdown-item"
              role="menuitem"
              onClick={onClose}
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    className="navbar-link flex items-center"
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
  const [procurementOpen, setProcurementOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);

  // Mobile dropdown states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMdmOpen, setMobileMdmOpen] = useState(false);
  const [mobileSupplyChainOpen, setMobileSupplyChainOpen] = useState(false);
  const [mobilePlanningOpen, setMobilePlanningOpen] = useState(false);
  const [mobileProcurementOpen, setMobileProcurementOpen] = useState(false);
  const [mobileAnalysisOpen, setMobileAnalysisOpen] = useState(false);

  const [isChatAssistantModalOpen, setIsChatAssistantModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Refs for dropdown containers
  const supplyChainRef = useRef<HTMLDivElement>(null);
  const mdmRef = useRef<HTMLDivElement>(null);
  const planningRef = useRef<HTMLDivElement>(null);
  const procurementRef = useRef<HTMLDivElement>(null);
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
        procurementRef.current &&
        !procurementRef.current.contains(event.target as Node) &&
        analysisRef.current &&
        !analysisRef.current.contains(event.target as Node)
      ) {
        setSupplyChainOpen(false);
        setMdmOpen(false);
        setPlanningOpen(false);
        setProcurementOpen(false);
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
    setMobileProcurementOpen(false);
    setMobileAnalysisOpen(false);
  }, [pathname]);

  // Handle mobile menu item click
  const handleMobileItemClick = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="max-w-7xl mx-auto py-3 px-6 flex justify-between items-center">
        {/* Logo and brand */}
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/cslogo.jpg"
              alt="ChainSync Logo"
              width={40}
              height={40}
              className="rounded-md"
              priority
            />
          </motion.div>
          <motion.h1 
            className="text-2xl font-bold text-indigo-100"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-emerald-400">Chain</span>Sync
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <nav className="flex items-center space-x-6">
            <div ref={mdmRef} className="relative">
              <DropdownButton
                label="Master Data"
                isOpen={mdmOpen}
                onClick={() => {
                  setMdmOpen(!mdmOpen);
                  setSupplyChainOpen(false);
                  setPlanningOpen(false);
                  setProcurementOpen(false);
                  setAnalysisOpen(false);
                }}
              />
              <AnimatePresence>
                <DropdownMenu
                  isOpen={mdmOpen}
                  items={menuItems.mdm}
                  onClose={() => setMdmOpen(false)}
                />
              </AnimatePresence>
            </div>

            <div ref={supplyChainRef} className="relative">
              <DropdownButton
                label="Supply Chain"
                isOpen={supplyChainOpen}
                onClick={() => {
                  setSupplyChainOpen(!supplyChainOpen);
                  setMdmOpen(false);
                  setPlanningOpen(false);
                  setProcurementOpen(false);
                  setAnalysisOpen(false);
                }}
              />
              <AnimatePresence>
                <DropdownMenu
                  isOpen={supplyChainOpen}
                  items={menuItems.supplyChain}
                  onClose={() => setSupplyChainOpen(false)}
                />
              </AnimatePresence>
            </div>

            <div ref={planningRef} className="relative">
              <DropdownButton
                label="Planning"
                isOpen={planningOpen}
                onClick={() => {
                  setPlanningOpen(!planningOpen);
                  setMdmOpen(false);
                  setSupplyChainOpen(false);
                  setProcurementOpen(false);
                  setAnalysisOpen(false);
                }}
              />
              <AnimatePresence>
                <DropdownMenu
                  isOpen={planningOpen}
                  items={menuItems.planning}
                  onClose={() => setPlanningOpen(false)}
                />
              </AnimatePresence>
            </div>

            <div ref={procurementRef} className="relative">
              <DropdownButton
                label="Procurement"
                isOpen={procurementOpen}
                onClick={() => {
                  setProcurementOpen(!procurementOpen);
                  setMdmOpen(false);
                  setSupplyChainOpen(false);
                  setPlanningOpen(false);
                  setAnalysisOpen(false);
                }}
              />
              <AnimatePresence>
                <DropdownMenu
                  isOpen={procurementOpen}
                  items={menuItems.procurement}
                  onClose={() => setProcurementOpen(false)}
                />
              </AnimatePresence>
            </div>

            <div ref={analysisRef} className="relative">
              <DropdownButton
                label="Analysis"
                isOpen={analysisOpen}
                onClick={() => {
                  setAnalysisOpen(!analysisOpen);
                  setMdmOpen(false);
                  setSupplyChainOpen(false);
                  setPlanningOpen(false);
                  setProcurementOpen(false);
                }}
              />
              <AnimatePresence>
                <DropdownMenu
                  isOpen={analysisOpen}
                  items={menuItems.analysis}
                  onClose={() => setAnalysisOpen(false)}
                />
              </AnimatePresence>
            </div>

            <Link href="/landing" className="navbar-link">
              Landing
            </Link>

            <button
              onClick={() => setIsChatAssistantModalOpen(true)}
              className="navbar-link flex items-center"
            >
              <SparklesIcon className="h-4 w-4 mr-1.5" />
              AI Assistant
            </button>
          </nav>

          {/* Desktop User Profile */}
          <div className="navbar-profile">
            <motion.div 
              className="navbar-profile-info"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <p className="navbar-profile-name">Welcome, <span className="font-semibold">{user.name}</span></p>
              <p className="navbar-profile-company">{user.company}</p>
            </motion.div>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="navbar-profile-avatar"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden navbar-link"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="navbar-mobile-menu"
          >
            {/* Mobile User Profile */}
            <div className="flex items-center p-4 border-b border-indigo-800">
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-emerald-400"
              />
              <div className="ml-3">
                <p className="text-indigo-100">Welcome, <span className="font-semibold">{user.name}</span></p>
                <p className="text-emerald-300 text-sm">{user.company}</p>
              </div>
            </div>

            <div className="px-4 pt-2 pb-3 space-y-1">
              {/* Master Data Mobile */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileMdmOpen(!mobileMdmOpen)}
                  className="navbar-mobile-dropdown"
                >
                  Master Data
                  <ChevronDownIcon
                    className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                      mobileMdmOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileMdmOpen && (
                  <div className="pl-4 space-y-2">
                    {menuItems.mdm.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleMobileItemClick(item.href)}
                        className="navbar-mobile-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Supply Chain Mobile */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileSupplyChainOpen(!mobileSupplyChainOpen)}
                  className="navbar-mobile-dropdown"
                >
                  Supply Chain
                  <ChevronDownIcon
                    className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                      mobileSupplyChainOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileSupplyChainOpen && (
                  <div className="pl-4 space-y-2">
                    {menuItems.supplyChain.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleMobileItemClick(item.href)}
                        className="navbar-mobile-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Planning Mobile */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobilePlanningOpen(!mobilePlanningOpen)}
                  className="navbar-mobile-dropdown"
                >
                  Planning
                  <ChevronDownIcon
                    className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                      mobilePlanningOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobilePlanningOpen && (
                  <div className="pl-4 space-y-2">
                    {menuItems.planning.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleMobileItemClick(item.href)}
                        className="navbar-mobile-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Procurement Mobile */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileProcurementOpen(!mobileProcurementOpen)}
                  className="navbar-mobile-dropdown"
                >
                  Procurement
                  <ChevronDownIcon
                    className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                      mobileProcurementOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileProcurementOpen && (
                  <div className="pl-4 space-y-2">
                    {menuItems.procurement.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleMobileItemClick(item.href)}
                        className="navbar-mobile-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Analysis Mobile */}
              <div className="space-y-2">
                <button
                  onClick={() => setMobileAnalysisOpen(!mobileAnalysisOpen)}
                  className="navbar-mobile-dropdown"
                >
                  Analysis
                  <ChevronDownIcon
                    className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
                      mobileAnalysisOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileAnalysisOpen && (
                  <div className="pl-4 space-y-2">
                    {menuItems.analysis.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => handleMobileItemClick(item.href)}
                        className="navbar-mobile-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Landing Mobile */}
              <Link href="/landing" className="navbar-mobile-item block">
                Landing
              </Link>

              {/* AI Assistant Mobile */}
              <button
                onClick={() => {
                  setIsChatAssistantModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="navbar-mobile-item flex items-center w-full"
              >
                <SparklesIcon className="h-5 w-5 mr-2" />
                AI Assistant
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Assistant Modal */}
      <ChatAssistantModal
        isOpen={isChatAssistantModalOpen}
        onClose={() => setIsChatAssistantModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
