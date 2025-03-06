'use client';

import { useState } from 'react';
import MdmPageTemplate from '../components/MdmPageTemplate';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { 
  PlusCircleIcon, 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// Sample data
const routings = [
  { id: 'R1001', material: 'Final Product X', description: 'Standard Production Routing', plant: '1000', workCenters: 3, operations: 5, status: 'Active' },
  { id: 'R1002', material: 'Subassembly A', description: 'Electronics Assembly', plant: '1000', workCenters: 2, operations: 4, status: 'Active' },
  { id: 'R1003', material: 'Subassembly B', description: 'Mechanical Assembly', plant: '1000', workCenters: 2, operations: 3, status: 'Active' },
  { id: 'R1004', material: 'Final Product Y', description: 'Alternative Production Routing', plant: '1000', workCenters: 4, operations: 7, status: 'In Development' },
  { id: 'R1005', material: 'Final Product Z', description: 'Standard Production Routing', plant: '1004', workCenters: 3, operations: 6, status: 'Active' },
];

const columns = [
  { accessorKey: 'id', header: 'Routing ID' },
  { accessorKey: 'material', header: 'Material' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'plant', header: 'Plant' },
  { accessorKey: 'workCenters', header: 'Work Centers' },
  { accessorKey: 'operations', header: 'Operations' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <ClockIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

// Work Centers Tab
const workCenters = [
  { id: 'WC1001', name: 'Assembly Line 1', category: 'Assembly', plant: '1000', capacity: '100%', status: 'Active' },
  { id: 'WC1002', name: 'Assembly Line 2', category: 'Assembly', plant: '1000', capacity: '80%', status: 'Active' },
  { id: 'WC1003', name: 'Paint Shop', category: 'Finishing', plant: '1000', capacity: '90%', status: 'Active' },
  { id: 'WC1004', name: 'Testing Lab', category: 'Quality', plant: '1000', capacity: '75%', status: 'Active' },
  { id: 'WC1005', name: 'Packaging', category: 'Logistics', plant: '1000', capacity: '100%', status: 'Active' },
];

const workCenterColumns = [
  { accessorKey: 'id', header: 'Work Center ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'plant', header: 'Plant' },
  { accessorKey: 'capacity', header: 'Capacity' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
      </div>
    ),
  },
];

export default function RoutingMasterPage() {
  const [activeTab, setActiveTab] = useState<'routings' | 'workCenters'>('routings');
  
  return (
    <MdmPageTemplate
      title="Routing & Work Centers"
      description="Manage production routings and work centers. Define manufacturing processes, operations, and resource requirements for production."
    >
      <div className="mb-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('routings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'routings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Routings
            </button>
            <button
              onClick={() => setActiveTab('workCenters')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'workCenters'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Work Centers
            </button>
          </nav>
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New {activeTab === 'routings' ? 'Routing' : 'Work Center'}
            </Button>
            <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
              <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={`Search ${activeTab === 'routings' ? 'routings' : 'work centers'}...`}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
              />
            </div>
            <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-50">
              <FunnelIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-700">
            {activeTab === 'routings' ? 'Routing List' : 'Work Center List'}
          </h3>
        </div>
        
        {activeTab === 'routings' ? (
          <DataTable columns={columns} data={routings} />
        ) : (
          <DataTable columns={workCenterColumns} data={workCenters} />
        )}
      </div>
    </MdmPageTemplate>
  );
} 