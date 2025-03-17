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
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { ColumnDef } from '@tanstack/react-table';

// Add interface for vendor data type
interface Vendor {
  id: string;
  name: string;
  type: string;
  region: string;
  country: string;
  status: string;
}

// Sample data with proper type
const vendors: Vendor[] = [
  { id: 'V1001', name: 'Supplier A', type: 'Raw Material', region: 'North America', country: 'USA', status: 'Active' },
  { id: 'V1002', name: 'Supplier B', type: 'Component', region: 'Europe', country: 'Germany', status: 'Active' },
  { id: 'V1003', name: 'Supplier C', type: 'Service', region: 'Asia', country: 'China', status: 'Active' },
  { id: 'V1004', name: 'Supplier D', type: 'Raw Material', region: 'South America', country: 'Brazil', status: 'Inactive' },
  { id: 'V1005', name: 'Supplier E', type: 'Component', region: 'Europe', country: 'France', status: 'Active' },
];

// Define columns with proper type
const columns: ColumnDef<Vendor, unknown>[] = [
  { accessorKey: 'id', header: 'Vendor ID' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'region', header: 'Region' },
  { accessorKey: 'country', header: 'Country' },
  { accessorKey: 'status', header: 'Status' },
  { 
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">Edit</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">View</Button>
        <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-300 hover:bg-indigo-50">
          <BuildingOfficeIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function VendorMasterPage() {
  return (
    <MdmPageTemplate
      title="Vendor Master"
      description="Manage vendor information. Define supplier types, regions, and status for procurement and supplier relationship management."
      outboundApoEnabled={false}
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Vendor
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
                placeholder="Search vendors..."
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
          <h3 className="font-medium text-gray-700">Vendor List</h3>
        </div>
        <DataTable columns={columns} data={vendors} />
      </div>
    </MdmPageTemplate>
  );
} 