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
import { ColumnDef } from '@tanstack/react-table';

// Add interface for data type
interface Customer {
  id: string;
  name: string;
  type: string;
  region: string;
  country: string;
  status: string;
}

// Update sample data with proper type
const customers: Customer[] = [
  { id: 'C1001', name: 'Acme Corporation', type: 'Corporate', region: 'North America', country: 'USA', status: 'Active' },
  { id: 'C1002', name: 'TechGiant Inc.', type: 'Corporate', region: 'North America', country: 'USA', status: 'Active' },
  { id: 'C1003', name: 'Global Retail Ltd', type: 'Retail', region: 'Europe', country: 'UK', status: 'Active' },
  { id: 'C1004', name: 'Eastern Distributors', type: 'Distributor', region: 'Asia', country: 'Japan', status: 'Active' },
  { id: 'C1005', name: 'Southern Markets', type: 'Retail', region: 'South America', country: 'Brazil', status: 'Inactive' },
];

// Update columns with proper type
const columns: ColumnDef<Customer, unknown>[] = [
  { accessorKey: 'id', header: 'Customer ID' },
  { accessorKey: 'name', header: 'Customer Name' },
  { accessorKey: 'type', header: 'Customer Type' },
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
      </div>
    ),
  },
];

export default function CustomerMasterPage() {
  return (
    <MdmPageTemplate
      title="Customer Master"
      description="Manage customer master data including basic information, sales areas, and partner functions. Maintain customer relationships and hierarchies in a centralized system."
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              New Customer
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
                placeholder="Search customers..."
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
          <h3 className="font-medium text-gray-700">Customer List</h3>
        </div>
        <DataTable columns={columns} data={customers} />
      </div>
    </MdmPageTemplate>
  );
} 