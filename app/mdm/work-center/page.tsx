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
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

// Add interface for work center data type
interface WorkCenter {
  id: string;
  name: string;
  category: string;
  plant: string;
  capacity: string;
  status: string;
}

// Sample data with proper type
const workCenters: WorkCenter[] = [
  { id: 'WC1001', name: 'Assembly Line 1', category: 'Assembly', plant: '1000', capacity: '100%', status: 'Active' },
  { id: 'WC1002', name: 'Assembly Line 2', category: 'Assembly', plant: '1000', capacity: '80%', status: 'Active' },
  { id: 'WC1003', name: 'Machine Shop 1', category: 'Machining', plant: '1000', capacity: '90%', status: 'Active' },
  { id: 'WC1004', name: 'Quality Control 1', category: 'Quality', plant: '1000', capacity: '100%', status: 'Active' },
  { id: 'WC1005', name: 'Packaging Line 1', category: 'Packaging', plant: '1000', capacity: '75%', status: 'Inactive' },
];

// Define columns with proper type
const columns: ColumnDef<WorkCenter, unknown>[] = [
  { accessorKey: 'id', header: 'Work Center ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'plant', header: 'Plant' },
  { accessorKey: 'capacity', header: 'Capacity' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <WrenchScrewdriverIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function WorkCenterMasterPage() {
  return (
    <MdmPageTemplate
      title="Work Center Master"
      description="Manage work center information. Define production capacities, categories, and status for production planning and scheduling."
      outboundApoEnabled={false}
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Work Center
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
                placeholder="Search work centers..."
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
          <h3 className="font-medium text-gray-700">Work Center List</h3>
        </div>
        <DataTable columns={columns} data={workCenters} />
      </div>
    </MdmPageTemplate>
  );
} 