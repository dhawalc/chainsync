'use client';

import Link from 'next/link';
import { 
  CubeIcon, 
  BuildingOfficeIcon, 
  UserGroupIcon, 
  CubeTransparentIcon,
  WrenchScrewdriverIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  TruckIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CircleStackIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const mdmModules = [
  {
    title: 'Material Master',
    description: 'Manage materials, products, and services',
    icon: <CubeIcon className="h-8 w-8 text-indigo-600" />,
    count: 1245,
    path: '/mdm/material',
    color: 'bg-indigo-50 border-indigo-200',
  },
  {
    title: 'Technology Node',
    description: 'Manage technology nodes and process mappings',
    icon: <CircleStackIcon className="h-8 w-8 text-cyan-600" />,
    count: 5,
    path: '/mdm/technology-node',
    color: 'bg-cyan-50 border-cyan-200',
  },
  {
    title: 'Process Master',
    description: 'Manage semiconductor fabrication processes',
    icon: <Cog6ToothIcon className="h-8 w-8 text-lime-600" />,
    count: 8,
    path: '/mdm/process',
    color: 'bg-lime-50 border-lime-200',
  },
  {
    title: 'Location Master',
    description: 'Manage plants, storage locations, and distribution centers',
    icon: <BuildingOfficeIcon className="h-8 w-8 text-emerald-600" />,
    count: 87,
    path: '/mdm/location',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    title: 'Customer Master',
    description: 'Manage customers, sales areas, and partner functions',
    icon: <UserGroupIcon className="h-8 w-8 text-blue-600" />,
    count: 532,
    path: '/mdm/customer',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    title: 'Bill of Materials',
    description: 'Manage product structures and components',
    icon: <CubeTransparentIcon className="h-8 w-8 text-amber-600" />,
    count: 328,
    path: '/mdm/bom',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    title: 'Routing & Work Centers',
    description: 'Manage production processes and resources',
    icon: <WrenchScrewdriverIcon className="h-8 w-8 text-rose-600" />,
    count: 156,
    path: '/mdm/routing',
    color: 'bg-rose-50 border-rose-200',
  },
  {
    title: 'Production Version',
    description: 'Link materials, BOMs, and routings for production',
    icon: <DocumentDuplicateIcon className="h-8 w-8 text-purple-600" />,
    count: 203,
    path: '/mdm/production-version',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    title: 'Calendars',
    description: 'Manage factory and resource calendars',
    icon: <CalendarIcon className="h-8 w-8 text-teal-600" />,
    count: 42,
    path: '/mdm/calendar',
    color: 'bg-teal-50 border-teal-200',
  },
  {
    title: 'Transportation Lanes',
    description: 'Manage transportation network and shipping methods',
    icon: <TruckIcon className="h-8 w-8 text-orange-600" />,
    count: 118,
    path: '/mdm/transportation',
    color: 'bg-orange-50 border-orange-200',
  },
];

export default function MdmDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Master Data Management</h1>
          <p className="text-gray-700 max-w-3xl">
            Centralized management of core business data entities. Create, read, update, and delete master data records across your organization.
          </p>
        </div>
        
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            <button className="flex items-center text-indigo-600 hover:text-indigo-800">
              <ArrowPathIcon className="h-4 w-4 mr-1" />
              Refresh
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-800 text-sm font-medium">Total Records</p>
                  <p className="text-3xl font-bold text-indigo-900">2,711</p>
                </div>
                <ChartBarIcon className="h-10 w-10 text-indigo-400" />
              </div>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-800 text-sm font-medium">Active</p>
                  <p className="text-3xl font-bold text-emerald-700">2,543</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold">
                  94%
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-800 text-sm font-medium">Pending Changes</p>
                  <p className="text-3xl font-bold text-amber-700">168</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold">
                  6%
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm font-medium">Last Sync</p>
                  <p className="text-xl font-medium text-blue-700">Today, 09:45 AM</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white">
                  <ArrowPathIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mdmModules.map((module, index) => (
            <Link 
              href={module.path} 
              key={index}
              className={`${module.color} border rounded-lg p-6 transition-all hover:shadow-md hover:scale-[1.02]`}
            >
              <div className="flex items-start mb-4">
                <div className="mr-4">
                  {module.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">{module.count} records</span>
                <span className="text-indigo-600 text-sm font-medium">View →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 