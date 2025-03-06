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
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Sample data
const locations = [
  { id: '1000', name: 'Main Plant', type: 'Plant', region: 'North', country: 'USA', status: 'Active' },
  { id: '1001', name: 'Distribution Center East', type: 'DC', region: 'East', country: 'USA', status: 'Active' },
  { id: '1002', name: 'Storage Area A', type: 'Storage Location', region: 'North', country: 'USA', status: 'Active' },
  { id: '1003', name: 'MRP Area Production', type: 'MRP Area', region: 'North', country: 'USA', status: 'Active' },
  { id: '1004', name: 'European Plant', type: 'Plant', region: 'Europe', country: 'Germany', status: 'Active' },
];

const columns = [
  { accessorKey: 'id', header: 'Location ID' },
  { accessorKey: 'name', header: 'Description' },
  { accessorKey: 'type', header: 'Location Type' },
  { accessorKey: 'region', header: 'Region' },
  { accessorKey: 'country', header: 'Country' },
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

export default function LocationMasterPage() {
  return (
    <MdmPageTemplate
      title="Location Master"
      description="Manage plants, MRP areas, storage locations, and other location data. Define and maintain geographical and organizational structures for your supply chain."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Location
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
                placeholder="Search locations..."
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
          <h3 className="font-medium text-gray-700">Location List</h3>
        </div>
        <DataTable columns={columns} data={locations} />
      </div>
    </MdmPageTemplate>
  );
} 